package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.util.EcrcConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author sivakaruna
 *
 */
@RestController
public class LogPaymentFailureController {

	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(LogPaymentFailureController.class);

	@PostMapping(value = "/private/logPaymentFailure", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> logPaymentFailure(@RequestBody(required=true) RequestLogPaymentFailure paymentFailure)
			throws EcrcServiceException {
		MDC.put(EcrcConstants.REQUEST_GUID, paymentFailure.getRequestGuid());
		MDC.put(EcrcConstants.REQUEST_ENDPOINT,  "logPaymentFailure");
		logger.info("Log payment failure request received [{}]", paymentFailure.getRequestGuid());
		try {
			return ecrcServices.logPaymentFailure(paymentFailure);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}
	}
}
