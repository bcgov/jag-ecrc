package ca.bc.gov.open.ecrc.service;


import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
import ca.bc.gov.open.ecrc.objects.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;
import ca.bc.gov.open.ecrc.model.Link;

/**
 *
 * Service Implementation class.
 *
 * @author shaunmillargov
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class EcrcServicesImpl implements EcrcServices {

	@Autowired
	private EcrcProperties ecrcProps;

	@Autowired
	private EcrcWebMethodsService ecrcWebMethodsService;

	private final Logger logger = LoggerFactory.getLogger(EcrcServicesImpl.class);

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber) {
		String _doAuthenticateUserUri = String.format(ecrcProps.getDoAuthenticateUserUri(), orgTicketNumber);
		return ecrcWebMethodsService.callWebMethodsService(_doAuthenticateUserUri, new DoAuthenticateUser());
	}

	public ArrayList<Link> getLinks() {
		//TODO: replace hard coded links with actual links
		ArrayList<Link> linkList = new ArrayList<Link>();
		Link link1 = new Link("test1", "www.google.com");
		Link link2 = new Link("test2", "www.google.ca");
		linkList.add(link1);
		linkList.add(link2);

		return linkList;
	}

	public ResponseEntity<String> getProvinceList() throws EcrcServiceException {
		return ecrcWebMethodsService.callWebMethodsService(ecrcProps.getGetProvincesListUri(), new GetProvinceList());
	}

	public ResponseEntity<String> getNextSessionId(String orgTicketNumber) throws EcrcServiceException {
		String _getNextSessionIdUri = String.format(ecrcProps.getGetNextSessionIdUri(), orgTicketNumber);
		return ecrcWebMethodsService.callWebMethodsService(_getNextSessionIdUri, new GetNextSessionId());
	}
	
	public ResponseEntity<String> createApplicant(RequestCreateApplicant applicantInfo) throws EcrcServiceException {
		String _createApplicantUri = String.format(ecrcProps.getCreateApplicantUri(), applicantInfo.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_createApplicantUri, new CreateApplicant());
	}

	public ResponseEntity<String> createNewCRCService(RequestNewCRCService crcService) throws EcrcServiceException {
		String _createNewCRCServiceUri = String.format(ecrcProps.getCreateNewCRCServiceUri(),crcService.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_createNewCRCServiceUri, new CreateNewCrcService());
	}

	public ResponseEntity<String> updateServiceFinancialTxn(RequestUpdateServiceFinancialTxn updateServiceFinancialTxn) throws EcrcServiceException {
		String _updateServiceFinancialTxnUri = String.format(ecrcProps.getUpdateServiceFinancialTxnUri(),updateServiceFinancialTxn.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_updateServiceFinancialTxnUri, new UpdateServiceFinancialTxn());
    }
  
	public ResponseEntity<String> getServiceFeeAmount(String orgTicketNumber, String scheduleTypeCd, String scopeLevelCd) throws EcrcServiceException {
		String _getServiceFeeAmountUri = String.format(ecrcProps.getGetServiceFeeAmountUri(), orgTicketNumber, scheduleTypeCd, scopeLevelCd);
		return ecrcWebMethodsService.callWebMethodsService(_getServiceFeeAmountUri, new GetServiceFeeAmount());
	}
	
	public ResponseEntity<String> logPaymentFailure(RequestLogPaymentFailure paymentFailure)
			throws EcrcServiceException {
		String _logPaymentFailureUri = String.format(ecrcProps.getLogPaymentFailureUri(), paymentFailure.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_logPaymentFailureUri, new LogPaymentFailure());
	}

	public ResponseEntity<String> getNextInvoiceId(String orgTicketNumber) throws EcrcServiceException {
		String _getNextInvoiceIdUri = String.format(ecrcProps.getGetNextInvoiceIdUri(), orgTicketNumber);
		return ecrcWebMethodsService.callWebMethodsService(_getNextInvoiceIdUri, new GetNextInvoiceId());
	}

}
