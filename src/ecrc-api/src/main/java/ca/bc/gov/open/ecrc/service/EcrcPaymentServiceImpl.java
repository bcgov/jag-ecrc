package ca.bc.gov.open.ecrc.service;

import javax.annotation.PostConstruct;

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

import com.fasterxml.jackson.databind.ObjectMapper;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestPaymentService;
import ca.bc.gov.open.ecrc.model.ResponsePaymentService;
import reactor.core.publisher.Mono;

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

	@Autowired
	private EcrcProperties ecrcProps;

	@Autowired
	ObjectMapper objectMapper;

	private WebClient webClient = null;

	private final Logger logger = LoggerFactory.getLogger(EcrcPaymentServiceImpl.class);

	@PostConstruct
	public void InitService() {

		this.webClient = WebClient.create(ecrcProps.getPaymentUrl());
	}

	public ResponseEntity<String> initiatePayment(RequestPaymentService paymentInfo) throws EcrcServiceException {

		String _getPaymentServiceUri = String.format(ecrcProps.getGetSinglePaymentUri(), paymentInfo.toQueryString());

		Mono<?> responseBody = this.webClient.get().uri(_getPaymentServiceUri).retrieve()
				.bodyToMono(ResponsePaymentService.class);

		try {
			JSONObject obj = new JSONObject(objectMapper.writeValueAsString(responseBody.block()));
			int respCode = obj.getInt("respCode");
			String respMsg = obj.getString("respMsg");
			if (respCode == WebServiceStatusCodes.SUCCESS.getErrorCode()) {
				return new ResponseEntity<>(obj.toString(), HttpStatus.OK);
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
			logger.error("Error in retrieving payment url");
			logger.debug("DEBUG Stack: {}", e);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.BAD_REQUEST);
		}
	}

}
