package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;

/**
 * @author sivakaruna
 *
 */
@RestController
public class LogPaymentFailureController {

	@Autowired
	EcrcServices ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping("/logPaymentFailure")
	public ResponseEntity<String> logPaymentFailure(@RequestBody(required=true) RequestLogPaymentFailure paymentFailure)
			throws EcrcServiceException {

		return ecrcServices.logPaymentFailure(paymentFailure);

	}
}
