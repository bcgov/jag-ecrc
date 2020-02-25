package ca.bc.gov.open.ecrc.service;

import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestPaymentService;

/**
*
* Interface for ECRC Payment service
*
* @author sivakaruna
*
*/
public interface EcrcPaymentService {
	
	public ResponseEntity<String> initiatePayment(RequestPaymentService paymentInfo) throws EcrcServiceException;

}
