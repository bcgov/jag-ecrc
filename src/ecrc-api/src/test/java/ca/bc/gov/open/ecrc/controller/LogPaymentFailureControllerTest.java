package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
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

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;

/**
 * Tests for log payment failure controller
 * 
 * @author sivakaruna
 *
 */
class LogPaymentFailureControllerTest {

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	LogPaymentFailureController logPaymentFailureController = new LogPaymentFailureController();

	@DisplayName("Success - logPaymentFailure controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		RequestLogPaymentFailure request = new RequestLogPaymentFailure();
		when(ecrcServices.logPaymentFailure(request)).thenReturn(new ResponseEntity<String>("success", HttpStatus.OK));
		ResponseEntity<String> response = logPaymentFailureController.logPaymentFailure(request);
		Assert.assertEquals("success", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - logPaymentFailure controller")
	@Test
	void testFailure() throws EcrcServiceException {
		RequestLogPaymentFailure request = new RequestLogPaymentFailure();
		when(ecrcServices.logPaymentFailure(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = logPaymentFailureController.logPaymentFailure(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - logPaymentFailure controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestLogPaymentFailure request = new RequestLogPaymentFailure();
		when(ecrcServices.logPaymentFailure(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = logPaymentFailureController.logPaymentFailure(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@DisplayName("Exception - logPaymentFailure controller")
	@Test
	void testException() throws EcrcServiceException {
		RequestLogPaymentFailure request = new RequestLogPaymentFailure();
		when(ecrcServices.logPaymentFailure(request)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response =  logPaymentFailureController.logPaymentFailure(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
