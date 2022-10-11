package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestPaymentService;
import org.springframework.http.ResponseEntity;

/**
*
* Interface for ECRC Payment service
*
* @author sivakaruna
*
*/
public interface EcrcPaymentService {
	
	public ResponseEntity<String> createPaymentUrl(RequestPaymentService paymentInfo) throws EcrcServiceException;

}
