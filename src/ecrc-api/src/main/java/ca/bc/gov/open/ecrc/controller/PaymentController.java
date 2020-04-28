package ca.bc.gov.open.ecrc.controller;


import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
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

import ca.bc.gov.open.ecrc.model.RequestPaymentService;
import ca.bc.gov.open.ecrc.service.EcrcPaymentService;

/**
 * Controller to retrieve payment url
 * 
 * @author sivakaruna
 *
 */
@RestController
public class PaymentController {

	@Autowired
	EcrcPaymentService paymentService;

	Logger logger = LoggerFactory.getLogger(PaymentController.class);

	@PostMapping(value = "/private/createPaymentUrl", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createPaymentUrl(@RequestBody RequestPaymentService paymentInfo) {
		MDC.put("request.guid", paymentInfo.getRequestGuid());
		MDC.put("request.endpoint",  "createPaymentUrl");
		logger.info("Payment request received [{}]", paymentInfo.getRequestGuid());
		try {
			return paymentService.createPaymentUrl(paymentInfo);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
		}
	}
}
