package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.*;
import javassist.NotFoundException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.util.Map;


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
	
	public JSONObject getJwtDetails() throws EcrcServiceException;

	public ResponseEntity<String> checkApplicantForPrevCrc(RequestCheckApplicantForPrevCrc applicantInfo) throws EcrcServiceException;

	public ResponseEntity<String> createSharingService(RequestCreateSharingService serviceInfo) throws EcrcServiceException;

	public ResponseEntity<String> createNewCRCApplicant(RequestNewCRCApplicant requestNewCRCApplicant) throws EcrcServiceException;

	public ResponseEntity<String> createCRCShare(RequestCRCShare requestCRCShare) throws EcrcServiceException;

}
