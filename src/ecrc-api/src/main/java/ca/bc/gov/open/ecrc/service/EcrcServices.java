package ca.bc.gov.open.ecrc.service;

import java.util.ArrayList;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import ca.bc.gov.open.ecrc.model.Link;
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

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber) throws EcrcServiceException, NotFoundException;

	public ArrayList<Link> getLinks() throws EcrcServiceException;

	public ResponseEntity<String> getProvinceList() throws EcrcServiceException;

	public ResponseEntity<String> getNextSessionId(String orgTicketNumber) throws EcrcServiceException;

	public ResponseEntity<String> createApplicant(RequestCreateApplicant applicantInfo) throws EcrcServiceException;

	public ResponseEntity<String> createNewCRCService(RequestNewCRCService crcService) throws EcrcServiceException;

	public ResponseEntity<String> updateServiceFinancialTxn(RequestUpdateServiceFinancialTxn updateServiceFinancialTxn) throws EcrcServiceException;

	public ResponseEntity<String> getServiceFeeAmount(String orgTicketNumber, String scheduleTypeCd, String scopeLevelCd) throws EcrcServiceException;

	public ResponseEntity<String> logPaymentFailure(RequestLogPaymentFailure paymentFailure) throws EcrcServiceException;

	//TODO - fill in other service method signatures here.

}
