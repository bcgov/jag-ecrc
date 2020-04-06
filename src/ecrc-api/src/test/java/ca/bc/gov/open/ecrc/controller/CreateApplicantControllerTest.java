package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

import ca.bc.gov.open.ecrc.model.RequestNewCRCApplicant;
import ca.bc.gov.open.ecrc.model.ResponseServiceDetails;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;

/**
 * Tests for create applicant controller
 * 
 * @author sivakaruna
 *
 */
class CreateApplicantControllerTest {

	private static final String TESTPARTY = "TESTPARTY";
	private static final String TESTINVOICE = "TESTINVOICE";
	private static final String TESTSERVICE = "TESTSERVICE";
	private static final String DOLLARS = "DOLLARS";
	private static final String TESTSESSION = "TESTSESSION";
	private static final String TESTURL = "TESTURL";

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	CreateApplicantController createApplicantController = new CreateApplicantController();

	//Single Call
	@DisplayName("Success - createApplicant controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenReturn(new ResponseEntity<>(
				"{\"message\":\"Success\",\"partyId\":49060,\"responseCode\":0}", HttpStatus.OK));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assert.assertEquals("{\"message\":\"Success\",\"partyId\":49060,\"responseCode\":0}", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - createApplicant controller")
	@Test
	void testFailure() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - createApplicant controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@DisplayName("Exception - createApplicant controller")
	@Test
	void testException() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}


	//Consolidated Call
	@DisplayName("Success - createNewCRCApplicant controller")
	@Test
	void testConsolidatedSuccess() throws EcrcServiceException, JSONException {
		Gson gson = new Gson();
		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		ResponseServiceDetails responseServiceDetails = new ResponseServiceDetails();
		responseServiceDetails.setPartyId(TESTPARTY);
		responseServiceDetails.setInvoiceId(TESTINVOICE);
		responseServiceDetails.setServiceId(TESTSERVICE);
		responseServiceDetails.setServiceFeeAmount(DOLLARS);
		responseServiceDetails.setSessionId(TESTSESSION);
		responseServiceDetails.setPaymentUrl(TESTURL);
		when(ecrcServices.createNewCRCApplicant(request)).thenReturn(new ResponseEntity<>(
				gson.toJson(responseServiceDetails), HttpStatus.OK));
		ResponseEntity<String> response = createApplicantController.createNewApplicant(request);

		ResponseServiceDetails res = gson.fromJson(response.getBody(), ResponseServiceDetails.class);
		Assert.assertEquals(TESTPARTY, res.getPartyId());
		Assert.assertEquals(TESTINVOICE, res.getInvoiceId());
		Assert.assertEquals(TESTSERVICE, res.getServiceId());
		Assert.assertEquals(DOLLARS, res.getServiceFeeAmount());
		Assert.assertEquals(TESTSESSION, res.getSessionId());
		Assert.assertEquals(TESTURL, res.getPaymentUrl());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - createNewCRCApplicant controller")
	@Test
	void testConsolidatedFailure() throws EcrcServiceException {
		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		when(ecrcServices.createNewCRCApplicant(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = createApplicantController.createNewApplicant(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - createNewCRCApplicant controller")
	@Test
	void testConsolidatedError() throws EcrcServiceException {
		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		when(ecrcServices.createNewCRCApplicant(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = createApplicantController.createNewApplicant(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@DisplayName("Exception - createNewCRCApplicant controller")
	@Test
	void testConsolidatedException() throws EcrcServiceException {
		RequestNewCRCApplicant request = new RequestNewCRCApplicant();
		when(ecrcServices.createNewCRCApplicant(request)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response = createApplicantController.createNewApplicant(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
