package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestPaymentService;
import ca.bc.gov.open.ecrc.model.ResponsePaymentService;
import ca.bc.gov.open.ecrc.util.EcrcUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import jakarta.annotation.PostConstruct;

/**
 *
 * Payment Service Implementation class.
 *
 * @author sivakaruna
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class EcrcPaymentServiceImpl implements EcrcPaymentService {

	public static final String PAYMENT_MINUTES_TO_EXPIRE = "30";

	// Bambora Transaction type (Purchase)
	public static final String PAYMENT_BAMBORA_TRANSACTION_TYPE = "P";

	public static final String PAYMENT_REF1_PREFIX = "Service Id: ";

	public static final String PAYMENT_REF2_PREFIX = "CRRP - Org Party Id: ";

	public static final String PAYMENT_SUCCESS_RESPONSE = "{\"paymentUrl\":\"%s\", \"message\":\"%s\", \"responseCode\":%d}";

	@Autowired
	private EcrcProperties ecrcProps;

	@Autowired
	ObjectMapper objectMapper;

	private WebClient webClient = null;

	private final Logger logger = LoggerFactory.getLogger(EcrcPaymentServiceImpl.class);

	@PostConstruct
	public void InitService() {

		this.webClient = WebClient.builder().baseUrl(ecrcProps.getPaymentUrl())
				.defaultHeaders(
						header -> header.setBasicAuth(ecrcProps.getPaymentUsername(), ecrcProps.getPaymentPassword()))
				.build();
	}

	public ResponseEntity<String> createPaymentUrl(RequestPaymentService paymentInfo) throws EcrcServiceException {

		paymentInfo.setMinutesToExpire(PAYMENT_MINUTES_TO_EXPIRE);
		paymentInfo.setTransType(PAYMENT_BAMBORA_TRANSACTION_TYPE);
		paymentInfo.setServiceIdRef1(PAYMENT_REF1_PREFIX + paymentInfo.getServiceIdRef1());
		paymentInfo.setPartyIdRef2(PAYMENT_REF2_PREFIX + paymentInfo.getPartyIdRef2());

		String paymentServiceUri = String.format(ecrcProps.getGetSinglePaymentUri(), paymentInfo.toQueryString());

		paymentServiceUri = EcrcUtil.encodeUriSpaces(paymentServiceUri);

		Mono<?> responseBody = this.webClient.get().uri(paymentServiceUri).retrieve()
				.bodyToMono(ResponsePaymentService.class);

		try {
			JSONObject obj = new JSONObject(objectMapper.writeValueAsString(responseBody.block()));
			int respCode = obj.getInt("respCode");
			String respMsg = obj.getString("respMsg");
			logger.info("For request guid: [{}] Response code {} recieved for payment url request", paymentInfo.getRequestGuid(), respCode);
			if (respCode == WebServiceStatusCodes.SUCCESS.getErrorCode()) {
				return new ResponseEntity<>(
						String.format(PAYMENT_SUCCESS_RESPONSE, obj.getString("respValue"), respMsg, respCode),
						HttpStatus.OK);
			} else if (respCode == WebServiceStatusCodes.NOTFOUND.getErrorCode()) {
				return new ResponseEntity<>(
						String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE, respMsg, respCode),
						HttpStatus.NOT_FOUND);
			} else if (respCode == WebServiceStatusCodes.ERROR.getErrorCode()) {
				return new ResponseEntity<>(
						String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE, respMsg, respCode),
						HttpStatus.SERVICE_UNAVAILABLE);
			} else {
				return new ResponseEntity<>(
						String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE, respMsg, respCode),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			logger.error("For request guid: [{}] Error in retrieving payment url ", paymentInfo.getRequestGuid());
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.BAD_REQUEST);
		}
	}

}
