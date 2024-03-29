package ca.bc.gov.open.ecrc.service;


import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.*;
import ca.bc.gov.open.ecrc.objects.*;
import com.google.gson.Gson;
import org.apache.cxf.common.util.StringUtils;
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
	private static final String ONETIME = "O";
	private static final String EMPLOYEE = "A";
	private static final String EMPLOYEE_TYPE = "EMPLOYEE";
	private static final String ONETIME_TYPE = "ONETIME";
	@Autowired
	private EcrcProperties ecrcProps;

	@Autowired
	private EcrcWebMethodsService ecrcWebMethodsService;

	@Autowired
	private EcrcPaymentService ecrcPaymentService;

	private final Logger logger = LoggerFactory.getLogger(EcrcServicesImpl.class);

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber, String requestGuid) throws EcrcServiceException {
		logger.info("For request guid: [{}] Authenticating using org ticket number", requestGuid);
        String doAuthenticateUserUri = String.format(ecrcProps.getDoAuthenticateUserUri(), trimString(orgTicketNumber));
        return ecrcWebMethodsService.callWebMethodsService(doAuthenticateUserUri, new DoAuthenticateUser(), requestGuid);
	}

	public Map<String, String> getLinks() {
		return ecrcProps.getLinks();
	}

	public ResponseEntity<String> getProvinceList(String requestGuid) throws EcrcServiceException {
		return ecrcWebMethodsService.callWebMethodsService(ecrcProps.getGetProvincesListUri(), new GetProvinceList(), requestGuid);
	}

	public ResponseEntity<String> getNextSessionId(String orgTicketNumber, String requestGuid) throws EcrcServiceException {
		String nextSessionIdUri = String.format(ecrcProps.getGetNextSessionIdUri(), trimString(orgTicketNumber));
		return ecrcWebMethodsService.callWebMethodsService(nextSessionIdUri, new GetNextSessionId(), requestGuid);
	}
	
	public ResponseEntity<String> createApplicant(RequestCreateApplicant applicantInfo) throws EcrcServiceException {

		return ecrcWebMethodsService.callWebMethodsService(ecrcProps.getCreateApplicantUri(), applicantInfo.buildQuery(), new CreateApplicant(), applicantInfo.getRequestGuid());

	}

	public ResponseEntity<String> createNewCRCService(RequestNewCRCService crcService) throws EcrcServiceException {
		String createNewCRCServiceUri = String.format(ecrcProps.getCreateNewCRCServiceUri(),crcService.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(createNewCRCServiceUri, new CreateNewCRCService(), crcService.getRequestGuid());
	}

	public ResponseEntity<String> updateServiceFinancialTxn(RequestUpdateServiceFinancialTxn updateServiceFinancialTxn) throws EcrcServiceException {
		String updateServiceFinancialTxnUri = String.format(ecrcProps.getUpdateServiceFinancialTxnUri(),updateServiceFinancialTxn.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(updateServiceFinancialTxnUri, new UpdateServiceFinancialTxn(), updateServiceFinancialTxn.getRequestGuid());
    }
  
	public ResponseEntity<String> getServiceFeeAmount(String orgTicketNumber, String scheduleTypeCd, String scopeLevelCd, String requestGuid) throws EcrcServiceException {
		String serviceFeeAmountUri = String.format(ecrcProps.getGetServiceFeeAmountUri(), trimString(orgTicketNumber), scheduleTypeCd, scopeLevelCd);
		return ecrcWebMethodsService.callWebMethodsService(serviceFeeAmountUri, new GetServiceFeeAmount(), requestGuid);
	}
	
	public ResponseEntity<String> logPaymentFailure(RequestLogPaymentFailure paymentFailure)
			throws EcrcServiceException {
		String logPaymentFailureUri = String.format(ecrcProps.getLogPaymentFailureUri(), paymentFailure.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(logPaymentFailureUri, new LogPaymentFailure(), paymentFailure.getRequestGuid());
	}

	public ResponseEntity<String> getNextInvoiceId(String orgTicketNumber, String requestGuid) throws EcrcServiceException {
		String nextInvoiceIdUri = String.format(ecrcProps.getGetNextInvoiceIdUri(), trimString(orgTicketNumber));
		return ecrcWebMethodsService.callWebMethodsService(nextInvoiceIdUri, new GetNextInvoiceId(), requestGuid);
	}

	public JSONObject getJwtDetails() {
		JSONObject obj = new JSONObject();
		obj.put("secret", ecrcProps.getJwtSecret());
		obj.put("clientId", ecrcProps.getOauthClientId());
		return obj;
	}

	public ResponseEntity<String> checkApplicantForPrevCrc(RequestCheckApplicantForPrevCrc applicantInfo)
			throws EcrcServiceException {
		String checkApplicantForPrevCrcUri = String.format(ecrcProps.getCheckApplicantForPrevCrcUri(), applicantInfo.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(checkApplicantForPrevCrcUri, new CheckApplicantForPrevCRC(), applicantInfo.getRequestGuid());
	}

	public ResponseEntity<String> createSharingService(RequestCreateSharingService serviceInfo)
			throws EcrcServiceException {
		String createSharingServiceUri = String.format(ecrcProps.getCreateSharingServiceUri(), serviceInfo.toQueryString());
		return ecrcWebMethodsService.callWebMethodsService(createSharingServiceUri, new CreateSharingService(), serviceInfo.getRequestGuid());
	}

	public ResponseEntity<String> createNewCRCApplicant(RequestNewCRCApplicant requestNewCRCApplicant) {
		ResponseServiceDetails serviceDetails = new ResponseServiceDetails();
		ResponseEntity<String> errorResponse;
		Gson gson = new Gson();
		JSONObject obj;
		logger.info("Beginning CRC creation process for [{}]", requestNewCRCApplicant.getRequestGuid());
		try {
			errorResponse = saveServiceInfo(requestNewCRCApplicant, serviceDetails);
			if (null != errorResponse) {
				return errorResponse;
			}
			requestNewCRCApplicant.getRequestNewCRCService().setApplPartyId(serviceDetails.getPartyId());
			requestNewCRCApplicant.getRequestNewCRCService().setSessionId(serviceDetails.getSessionId());
			requestNewCRCApplicant.getRequestNewCRCService().setInvoiceId(serviceDetails.getInvoiceId());
			if (requestNewCRCApplicant.getApplType().equalsIgnoreCase(EMPLOYEE_TYPE)) {
				requestNewCRCApplicant.getRequestNewCRCService().setOrgApplToPay(EMPLOYEE);
			} else if (requestNewCRCApplicant.getApplType().equalsIgnoreCase(ONETIME_TYPE)) {
				requestNewCRCApplicant.getRequestNewCRCService().setOrgApplToPay(ONETIME);
			} else {
				requestNewCRCApplicant.getRequestNewCRCService().setOrgApplToPay("");
			}
			ResponseEntity<String> createCRC = createNewCRCService(requestNewCRCApplicant.getRequestNewCRCService());
			if (createCRC.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(createCRC.getBody());
				serviceDetails.setServiceId(String.valueOf(obj.getInt("serviceId")));
				logger.info("CRC Created [{}]", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("CRC Failed [{}]", requestNewCRCApplicant.getRequestGuid());
				return createCRC;
			}
			errorResponse = handlePayment(requestNewCRCApplicant, serviceDetails);
			if (null != errorResponse) {
				return errorResponse;
			}
			logger.info("Applicant and CRC Created [{}]", requestNewCRCApplicant.getRequestGuid());
			return new ResponseEntity<>(gson.toJson(serviceDetails),HttpStatus.OK);
		} catch (Exception e) {
			logger.info("Failed to create New CRC Applicant", e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<String> createCRCShare(RequestCRCShare requestCRCShare) throws EcrcServiceException {
		JSONObject obj;
		logger.info("Beginning CRC creation process for {}", requestCRCShare.getRequestCreateApplicant().getRequestGuid());
		try {
			ResponseEntity<String> clientResp = createApplicant(requestCRCShare.getRequestCreateApplicant());

			if (clientResp.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(clientResp.getBody());
				requestCRCShare.getRequestCreateSharingService().setApplPartyId(String.valueOf(obj.getInt("partyId")));
				logger.info("Applicant Created [{}]", requestCRCShare.getRequestCreateApplicant().getRequestGuid());
			} else {
				logger.info("Applicant Failed [{}]", requestCRCShare.getRequestCreateApplicant().getRequestGuid());
				return clientResp;
			}
			ResponseEntity<String> shareResp = createSharingService(requestCRCShare.getRequestCreateSharingService());
			if (clientResp.getStatusCode() == HttpStatus.OK) {
				logger.info("Share Created [{}]", requestCRCShare.getRequestCreateApplicant().getRequestGuid());
				return shareResp;
			} else {
				logger.info("Share Failed [{}]", requestCRCShare.getRequestCreateApplicant().getRequestGuid());
				return shareResp;
			}
		} catch (Exception e) {
			logger.info("Failed to create New CRC Applicant", e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Private method to create applicant id, session id and invoice id
	 */
	private ResponseEntity<String> saveServiceInfo(RequestNewCRCApplicant requestNewCRCApplicant,
			ResponseServiceDetails serviceDetails) throws EcrcServiceException {
		ResponseEntity<String> clientResp = createApplicant(requestNewCRCApplicant.getRequestCreateApplicant());
		JSONObject obj;
		if (clientResp.getStatusCode() == HttpStatus.OK) {
			obj = new JSONObject(clientResp.getBody());
			serviceDetails.setPartyId(String.valueOf(obj.getInt("partyId")));
			logger.info("Applicant Created [{}]", requestNewCRCApplicant.getRequestGuid());
		} else {
			logger.info("Applicant Failed [{}]", requestNewCRCApplicant.getRequestGuid());
			return clientResp;
		}
		ResponseEntity<String> getNextSession = getNextSessionId(
				requestNewCRCApplicant.getRequestCreateApplicant().getOrgTicketNumber(),
				requestNewCRCApplicant.getRequestGuid());
		if (getNextSession.getStatusCode() == HttpStatus.OK) {
			obj = new JSONObject(getNextSession.getBody());
			serviceDetails.setSessionId(String.valueOf(obj.getInt("sessionId")));
			logger.info("Session Created [{}]", requestNewCRCApplicant.getRequestGuid());
		} else {
			logger.info("Session Failed [{}]", requestNewCRCApplicant.getRequestGuid());
			return getNextSession;
		}
		if (requestNewCRCApplicant.getApplType().equalsIgnoreCase(EMPLOYEE_TYPE)
				|| requestNewCRCApplicant.getApplType().equalsIgnoreCase(ONETIME_TYPE)) {
			ResponseEntity<String> getNextInvoice = getNextInvoiceId(
					requestNewCRCApplicant.getRequestCreateApplicant().getOrgTicketNumber(),
					requestNewCRCApplicant.getRequestGuid());
			if (getNextInvoice.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(getNextInvoice.getBody());
				serviceDetails.setInvoiceId(String.valueOf(obj.getInt("invoiceId")));
				logger.info("Invoice Created [{}]", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("Invoice Failed [{}]", requestNewCRCApplicant.getRequestGuid());
				return getNextInvoice;
			}
		}
		return null;
	}
	
	/**
	 * Private method to identify if payment is required for a given applicant and
	 * create payment url if needed
	 */
	private ResponseEntity<String> handlePayment(RequestNewCRCApplicant requestNewCRCApplicant,
			ResponseServiceDetails serviceDetails) throws EcrcServiceException {
		if (requestNewCRCApplicant.getApplType().equalsIgnoreCase(EMPLOYEE_TYPE)) {
			JSONObject obj;
			ResponseEntity<String> getServiceFeeAmount = getServiceFeeAmount(
					requestNewCRCApplicant.getRequestCreateApplicant().getOrgTicketNumber(),
					requestNewCRCApplicant.getRequestNewCRCService().getScheduleTypeCd(),
					requestNewCRCApplicant.getRequestNewCRCService().getScopeLevelCd(),
					requestNewCRCApplicant.getRequestGuid());
			if (getServiceFeeAmount.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(getServiceFeeAmount.getBody());
				serviceDetails.setServiceFeeAmount(String.valueOf(obj.getDouble("serviceFeeAmount")));
				logger.info("Fee retrieved [{}]", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("fee failed [{}]", requestNewCRCApplicant.getRequestGuid());
				return getServiceFeeAmount;
			}
			RequestPaymentService requestPaymentService = new RequestPaymentService("P", serviceDetails.getInvoiceId(),
					requestNewCRCApplicant.getReturnPage(), requestNewCRCApplicant.getReturnPage(),
					requestNewCRCApplicant.getReturnPage(), serviceDetails.getServiceFeeAmount(), "30",
					serviceDetails.getServiceId(), serviceDetails.getPartyId(),
					requestNewCRCApplicant.getRequestGuid());
			ResponseEntity<String> paymentURl = ecrcPaymentService.createPaymentUrl(requestPaymentService);
			if (paymentURl.getStatusCode() == HttpStatus.OK) {
				obj = new JSONObject(paymentURl.getBody());
				serviceDetails.setPaymentUrl(obj.getString("paymentUrl"));
				logger.info("Payment URL Created [{}]", requestNewCRCApplicant.getRequestGuid());
			} else {
				logger.info("Payment URL Failed [{}]", requestNewCRCApplicant.getRequestGuid());
				return paymentURl;
			}
		}
		return null;
	}

	private String trimString(String input) {

		if (StringUtils.isEmpty(input)) {
			return "";
		}

		return input.trim();

	}

}
