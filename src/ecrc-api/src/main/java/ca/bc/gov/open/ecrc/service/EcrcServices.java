package ca.bc.gov.open.ecrc.service;

import java.util.Map;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCheckApplicantForPrevCrc;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;


/**
 *
 * Interface for ECRC Service
 *
 * @author shaunmillargov
 *
 */
public interface EcrcServices {

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber, String requestGuid) throws EcrcServiceException, NotFoundException;

	public Map<String, String> getLinks() throws EcrcServiceException;

	public ResponseEntity<String> getProvinceList(String requestGuid) throws EcrcServiceException;

	public ResponseEntity<String> getNextSessionId(String orgTicketNumber, String requestGuid) throws EcrcServiceException;

	public ResponseEntity<String> createApplicant(RequestCreateApplicant applicantInfo) throws EcrcServiceException;

	public ResponseEntity<String> createNewCRCService(RequestNewCRCService crcService) throws EcrcServiceException;

	public ResponseEntity<String> updateServiceFinancialTxn(RequestUpdateServiceFinancialTxn updateServiceFinancialTxn) throws EcrcServiceException;

	public ResponseEntity<String> getServiceFeeAmount(String orgTicketNumber, String scheduleTypeCd, String scopeLevelCd, String requestGuid) throws EcrcServiceException;

	public ResponseEntity<String> logPaymentFailure(RequestLogPaymentFailure paymentFailure) throws EcrcServiceException;

	public ResponseEntity<String> getNextInvoiceId(String orgTicketNumber, String requestGuid) throws EcrcServiceException;
	
	public String getJwtSecret() throws EcrcServiceException;

	public ResponseEntity<String> checkApplicantForPrevCrc(RequestCheckApplicantForPrevCrc applicantInfo) throws EcrcServiceException;

}
