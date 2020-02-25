package ca.bc.gov.open.ecrc.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.constants.PaymentServiceConstants;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestPaymentService;

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

	private final Logger logger = LoggerFactory.getLogger(EcrcPaymentServiceImpl.class);

	public ResponseEntity<String> createPaymentUrl(RequestPaymentService paymentInfo) throws EcrcServiceException {

		try {
			
			paymentInfo.setMerchantId(ecrcProps.getPaymentMerchantId());
			paymentInfo.setReturnUri(ecrcProps.getPaymentReturnUri());
			
			String paramString = paymentInfo.toQueryString();

			// Replace spaces with escaped equivalent
			paramString = paramString.replace(" ", "%20");

			// Add hash key at end of params
			paramString = paramString + ecrcProps.getPaymentHashkey();

			String hashed = getHash(paramString);

			String expiry = getExpiry();

			// Add hash and expiry to the redirect
			paramString = paramString.replace(ecrcProps.getPaymentHashkey(),
					"&" + PaymentServiceConstants.BAMBORA_PARAM_HASH_VALUE + "=" + hashed + 
					"&"	+ PaymentServiceConstants.BAMBORA_PARAM_HASH_EXPIRY + "=" + expiry);

			String redirectUrl = ecrcProps.getPaymentUrl() + "?" + paramString;
			
			return new ResponseEntity<>(String.format(PaymentServiceConstants.PAYMENT_SERVICE_JSON_RESPONSE,
					PaymentServiceConstants.PAYMENT_SERVICE_RESP_MSG_OK, WebServiceStatusCodes.SUCCESS.getErrorCode(),
					redirectUrl), HttpStatus.OK);

		} catch (Exception e) {
			logger.error("Error in creating payment url");
			logger.debug("DEBUG Stack: {}", e);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					PaymentServiceConstants.PAYMENT_URL_CREATION_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.BAD_REQUEST);
		}
	}

	private String getHash(String message) {
		// Calculates an MD5 hash on a message with a given key
		String digest = DigestUtils.md5Hex(message);
		return digest.toUpperCase();
	}

	private String getExpiry() {
		// Calculate the expiry based on the minutesToExpire value.
		SimpleDateFormat sdfDate = new SimpleDateFormat(PaymentServiceConstants.BAMBORA_PARAM_HASH_EXPIRY_FORMAT);
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.MINUTE, PaymentServiceConstants.PAYMENT_MINUTES_TO_EXPIRE);
		return sdfDate.format(cal.getTime());
	}

}
