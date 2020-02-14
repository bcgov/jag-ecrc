package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;

import ca.bc.gov.open.ecrc.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestLogPaymentFailure;

/**
 * Tests for log payment failure controller
 * 
 * @author sivakaruna
 *
 */
@ContextConfiguration
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
				"{\"message\":\"Requested data not found\", \"responseCode\":1}", HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = logPaymentFailureController.logPaymentFailure(request);
		Assert.assertEquals("{\"message\":\"Requested data not found\", \"responseCode\":1}", response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - logPaymentFailure controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestLogPaymentFailure request = new RequestLogPaymentFailure();
		when(ecrcServices.logPaymentFailure(request)).thenReturn(new ResponseEntity<>(
				"{\"message\":\"Requested data not found\", \"responseCode\":1}", HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = logPaymentFailureController.logPaymentFailure(request);
		Assert.assertEquals("{\"message\":\"Requested data not found\", \"responseCode\":1}", response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

}