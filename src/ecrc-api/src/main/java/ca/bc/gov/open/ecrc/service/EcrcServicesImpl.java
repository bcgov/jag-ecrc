package ca.bc.gov.open.ecrc.service;


import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.*;
import ca.bc.gov.open.ecrc.objects.*;
import com.google.gson.Gson;
import org.json.JSONObject;
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

	@Autowired
	private EcrcPaymentService ecrcPaymentService;

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

	public ResponseEntity<String> createNewCRCApplicant(RequestNewCRCApplicant requestNewCRCApplicant) {
		ResponseServiceDetails serviceDetails = new ResponseServiceDetails();
		JSONObject obj;
		logger.info("Beginning CRC creation process for {}", requestNewCRCApplicant.getRequestGuid());
		try {
			ResponseEntity<String> clientResp = createApplicant(requestNewCRCApplicant.getRequestCreateApplicant());
			if (clientResp.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(clientResp.getBody());
				serviceDetails.setPartyId(obj.getString("partyId"));
				logger.info("Applicant Created {}", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("Applicant Failed {}", requestNewCRCApplicant.getRequestGuid());
				return clientResp;
			}
			ResponseEntity<String> getNextSession = getNextSessionId(requestNewCRCApplicant.getRequestCreateApplicant().getOrgTicketNumber(), requestNewCRCApplicant.getRequestGuid());
			if (getNextSession.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(getNextSession.getBody());
				serviceDetails.setSessionId(obj.getString("sessionId"));
				logger.info("Session Created {}", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("Session Failed {}", requestNewCRCApplicant.getRequestGuid());
				return getNextSession;
			}
			ResponseEntity<String> getNextInvoice = getNextInvoiceId(requestNewCRCApplicant.getRequestCreateApplicant().getOrgTicketNumber(), requestNewCRCApplicant.getRequestGuid());
			if (getNextInvoice.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(getNextInvoice.getBody());
				serviceDetails.setInvoiceId(obj.getString("invoiceId"));
				logger.info("Invoice Created {}", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("Invoice Failed {}", requestNewCRCApplicant.getRequestGuid());
				return getNextInvoice;
			}
			ResponseEntity<String> getServiceFeeAmount = getServiceFeeAmount(requestNewCRCApplicant.getRequestCreateApplicant().getOrgTicketNumber(),requestNewCRCApplicant.getRequestNewCRCService().getSchedule_Type_Cd(),requestNewCRCApplicant.getRequestNewCRCService().getScope_Level_Cd(), requestNewCRCApplicant.getRequestGuid());
			if (getServiceFeeAmount.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(getServiceFeeAmount.getBody());
				serviceDetails.setServiceFeeAmount(obj.getString("serviceFeeAmount"));
				logger.info("Fee retrieved {}", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("fee failed {}", requestNewCRCApplicant.getRequestGuid());
				return getServiceFeeAmount;
			}
			requestNewCRCApplicant.getRequestNewCRCService().setAppl_Party_Id(serviceDetails.getPartyId());
			requestNewCRCApplicant.getRequestNewCRCService().setSession_Id(serviceDetails.getSessionId());
			requestNewCRCApplicant.getRequestNewCRCService().setInvoice_Id(serviceDetails.getInvoiceId());
			ResponseEntity<String> createCRC = createNewCRCService(requestNewCRCApplicant.getRequestNewCRCService());
			if (createCRC.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(createCRC.getBody());
				serviceDetails.setServiceId(obj.getString("serviceId"));
				logger.info("CRC Created {}", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("CRC Failed {}", requestNewCRCApplicant.getRequestGuid());
				return createCRC;
			}
			RequestPaymentService requestPaymentService = new RequestPaymentService("P",serviceDetails.getInvoiceId(),requestNewCRCApplicant.getApprovedPage(),requestNewCRCApplicant.getDeclinedPage(),requestNewCRCApplicant.getErrorPage(),serviceDetails.getServiceFeeAmount(),"30",serviceDetails.getServiceId(),serviceDetails.getPartyId(),requestNewCRCApplicant.getRequestGuid());
			ResponseEntity<String> paymentURl = ecrcPaymentService.createPaymentUrl(requestPaymentService);
			if (paymentURl.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(paymentURl.getBody());
				serviceDetails.setPaymentUrl(obj.getString("respValue"));
				logger.info("Payment URL Created {}", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("Payment URL Failed {}", requestNewCRCApplicant.getRequestGuid());
				return paymentURl;
			}
			logger.info("Applicant and CRC Created {}", requestNewCRCApplicant.getRequestGuid());
			return new ResponseEntity<>(serviceDetails.toString(),HttpStatus.OK);
		} catch (Exception e) {
			logger.info("Failed to create New CRC Applicant", e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}

}
