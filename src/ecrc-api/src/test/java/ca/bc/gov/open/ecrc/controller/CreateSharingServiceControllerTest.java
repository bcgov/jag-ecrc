package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

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
import ca.bc.gov.open.ecrc.model.RequestCreateSharingService;

/**
 * Tests for create sharing service controller
 * 
 * @author sivakaruna
 *
 */
class CreateSharingServiceControllerTest {

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	CreateSharingServiceController createSharingServiceController = new CreateSharingServiceController();

	@DisplayName("Success - createSharingService controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		RequestCreateSharingService request = new RequestCreateSharingService();
		when(ecrcServices.createSharingService(request)).thenReturn(new ResponseEntity<String>(
				"{\"message\":\"Success\",\"serviceId\":49060,\"responseCode\":0}", HttpStatus.OK));
		ResponseEntity<String> response = createSharingServiceController.createSharingService(request);
		Assert.assertEquals("{\"message\":\"Success\",\"serviceId\":49060,\"responseCode\":0}", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - createSharingService controller")
	@Test
	void testFailure() throws EcrcServiceException {
		RequestCreateSharingService request = new RequestCreateSharingService();
		when(ecrcServices.createSharingService(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = createSharingServiceController.createSharingService(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - createSharingService controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestCreateSharingService request = new RequestCreateSharingService();
		when(ecrcServices.createSharingService(request)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = createSharingServiceController.createSharingService(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@DisplayName("Exception - createSharingService controller")
	@Test
	void testException() throws EcrcServiceException {
		RequestCreateSharingService request = new RequestCreateSharingService();
		when(ecrcServices.createSharingService(request)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response = createSharingServiceController.createSharingService(request);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
