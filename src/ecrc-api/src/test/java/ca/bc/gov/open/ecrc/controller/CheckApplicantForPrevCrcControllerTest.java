package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCheckApplicantForPrevCrc;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.when;

/**
 * Tests for check applicant for previous crc controller
 * 
 * @author sivakaruna
 *
 */
class CheckApplicantForPrevCrcControllerTest {

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	CheckApplicantForPrevCrcController checkApplicantForPrevCrcController = new CheckApplicantForPrevCrcController();

	@DisplayName("Success - checkApplicantForPrevCrc controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		RequestCheckApplicantForPrevCrc request = new RequestCheckApplicantForPrevCrc();
		when(ecrcServices.checkApplicantForPrevCrc(request)).thenReturn(new ResponseEntity<String>(
				"{\"message\":\"Success\",\"responseCode\":0}", HttpStatus.OK));
		ResponseEntity<String> response = checkApplicantForPrevCrcController.checkApplicantForPrevCrc(request);
		Assert.assertEquals("{\"message\":\"Success\",\"responseCode\":0}", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - checkApplicantForPrevCrc controller")
	@Test
	void testFailure() throws EcrcServiceException {
		RequestCheckApplicantForPrevCrc request = new RequestCheckApplicantForPrevCrc();
		when(ecrcServices.checkApplicantForPrevCrc(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = checkApplicantForPrevCrcController.checkApplicantForPrevCrc(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - checkApplicantForPrevCrc controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestCheckApplicantForPrevCrc request = new RequestCheckApplicantForPrevCrc();
		when(ecrcServices.checkApplicantForPrevCrc(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = checkApplicantForPrevCrcController.checkApplicantForPrevCrc(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@DisplayName("Exception - checkApplicantForPrevCrc controller")
	@Test
	void testException() throws EcrcServiceException {
		RequestCheckApplicantForPrevCrc request = new RequestCheckApplicantForPrevCrc();
		when(ecrcServices.checkApplicantForPrevCrc(request)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response = checkApplicantForPrevCrcController.checkApplicantForPrevCrc(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
