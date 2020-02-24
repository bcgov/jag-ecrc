package ca.bc.gov.open.ecrc.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestPayment;
import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * Controller to retrieve payment url
 * 
 * @author sivakaruna
 *
 */
@RestController
public class PaymentController {

	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(PaymentController.class);

	@GetMapping(value = "/payment", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> initiatePayment(@RequestBody RequestPayment paymentInfo) throws EcrcServiceException {
		//TODO: Extract guid generated from front end
		logger.info("Payment request received {}", UUID.randomUUID().toString());
		return ecrcServices.initiatePayment(paymentInfo);
		
	}
}
