package ca.bc.gov.open.ecrc.service;


import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.*;
import ca.bc.gov.open.ecrc.objects.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

import static ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE;

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

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber, String requestGuid) {
	    if (ecrcProps.getWhiteList().contains(orgTicketNumber.toLowerCase())) {
			logger.info("For request guid: [{}] Provided org ticket number white listed", requestGuid);
            String _doAuthenticateUserUri = String.format(ecrcProps.getDoAuthenticateUserUri(), orgTicketNumber);
            return ecrcWebMethodsService.callWebMethodsService(_doAuthenticateUserUri, new DoAuthenticateUser(), requestGuid);
        } else {
			logger.info("For request guid: [{}] Provided org ticket number not white listed", requestGuid);
	        return new ResponseEntity<>(String.format(WEBSERVICE_ERROR_JSON_RESPONSE,"Org not on whitelist", WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.UNAUTHORIZED);
        }
	}

	public Map<String, String> getLinks() {
		return ecrcProps.getLinks();
	}

	public ResponseEntity<String> getProvinceList(String requestGuid) throws EcrcServiceException {
		return ecrcWebMethodsService.callWebMethodsService(ecrcProps.getGetProvincesListUri(), new GetProvinceList(), requestGuid);
	}

	public ResponseEntity<String> getNextSessionId(String orgTicketNumber, String requestGuid) throws EcrcServiceException {
		String _getNextSessionIdUri = String.format(ecrcProps.getGetNextSessionIdUri(), orgTicketNumber);
		return ecrcWebMethodsService.callWebMethodsService(_getNextSessionIdUri, new GetNextSessionId(), requestGuid);
	}
	
	public ResponseEntity<String> createApplicant(RequestCreateApplicant applicantInfo) throws EcrcServiceException {
		String _createApplicantUri = String.format(ecrcProps.getCreateApplicantUri(), applicantInfo.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_createApplicantUri, new CreateApplicant(), applicantInfo.getRequestGuid());
	}

	public ResponseEntity<String> createNewCRCService(RequestNewCRCService crcService) throws EcrcServiceException {
		String _createNewCRCServiceUri = String.format(ecrcProps.getCreateNewCRCServiceUri(),crcService.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_createNewCRCServiceUri, new CreateNewCrcService(), crcService.getRequestGuid());
	}

	public ResponseEntity<String> updateServiceFinancialTxn(RequestUpdateServiceFinancialTxn updateServiceFinancialTxn) throws EcrcServiceException {
		String _updateServiceFinancialTxnUri = String.format(ecrcProps.getUpdateServiceFinancialTxnUri(),updateServiceFinancialTxn.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_updateServiceFinancialTxnUri, new UpdateServiceFinancialTxn(), updateServiceFinancialTxn.getRequestGuid());
    }
  
	public ResponseEntity<String> getServiceFeeAmount(String orgTicketNumber, String scheduleTypeCd, String scopeLevelCd, String requestGuid) throws EcrcServiceException {
		String _getServiceFeeAmountUri = String.format(ecrcProps.getGetServiceFeeAmountUri(), orgTicketNumber, scheduleTypeCd, scopeLevelCd);
		return ecrcWebMethodsService.callWebMethodsService(_getServiceFeeAmountUri, new GetServiceFeeAmount(), requestGuid);
	}
	
	public ResponseEntity<String> logPaymentFailure(RequestLogPaymentFailure paymentFailure)
			throws EcrcServiceException {
		String _logPaymentFailureUri = String.format(ecrcProps.getLogPaymentFailureUri(), paymentFailure.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_logPaymentFailureUri, new LogPaymentFailure(), paymentFailure.getRequestGuid());
	}

	public ResponseEntity<String> getNextInvoiceId(String orgTicketNumber, String requestGuid) throws EcrcServiceException {
		String _getNextInvoiceIdUri = String.format(ecrcProps.getGetNextInvoiceIdUri(), orgTicketNumber);
		return ecrcWebMethodsService.callWebMethodsService(_getNextInvoiceIdUri, new GetNextInvoiceId(), requestGuid);
	}

	public String getJwtSecret() {
		return ecrcProps.getJwtSecret();
	}

	public ResponseEntity<String> checkApplicantForPrevCrc(RequestCheckApplicantForPrevCrc applicantInfo)
			throws EcrcServiceException {
		String _checkApplicantForPrevCrcUri = String.format(ecrcProps.getCheckApplicantForPrevCrcUri(), applicantInfo.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_checkApplicantForPrevCrcUri, new CheckApplicantForPrevCrc(), applicantInfo.getRequestGuid());
	}

	public ResponseEntity<String> createSharingService(RequestCreateSharingService serviceInfo)
			throws EcrcServiceException {
		String _createSharingServiceUri = String.format(ecrcProps.getCreateSharingServiceUri(), serviceInfo.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(_createSharingServiceUri, new CreateSharingService(), serviceInfo.getRequestGuid());
	}
}
