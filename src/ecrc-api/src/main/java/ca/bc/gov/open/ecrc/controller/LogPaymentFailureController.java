package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;

import java.util.UUID;

/**
 * @author sivakaruna
 *
 */
@RestController
public class LogPaymentFailureController {

	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(LogPaymentFailureController.class);

	@GetMapping(value = "/logPaymentFailure", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> logPaymentFailure(@RequestBody(required=true) RequestLogPaymentFailure paymentFailure)
			throws EcrcServiceException {
		//TODO: Extract guid generated from front end
		logger.info("Log payment failure request received {}", UUID.randomUUID().toString());
		return ecrcServices.logPaymentFailure(paymentFailure);

	}
}
