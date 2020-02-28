package ca.bc.gov.open.ecrc.controller;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
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

	@PostMapping(value = "/createPaymentUrl", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createPaymentUrl(@RequestBody RequestPaymentService paymentInfo) throws EcrcServiceException {
		//TODO: Extract guid generated from front end
		logger.info("Payment request received {}", UUID.randomUUID().toString());
		return paymentService.createPaymentUrl(paymentInfo);
		
	}
}
