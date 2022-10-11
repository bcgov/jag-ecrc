package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServicesImpl;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.when;


public class DoAuthenticateUserControllerTest {
	private static final String GUID = "GUID";
	@InjectMocks
	DoAuthenticateUserController doAuthenticateUserController;

	@Mock
	EcrcServicesImpl ecrcServices;


	@BeforeEach
	public void initMocks(){
		MockitoAnnotations.initMocks(this);
	}
	@DisplayName("Success - doAuthenticateUser controller")
	@Test
	public void testFoundValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA", GUID)).thenReturn(new ResponseEntity<>("SOMESTRING", HttpStatus.OK));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA", GUID);
		Assertions.assertEquals("SOMESTRING", result.getBody());
	}

	@DisplayName("Failure - doAuthenticateUser controller")
	@Test
	public void testNotFoundValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA", GUID)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.NOT_FOUND));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA", GUID);
		Assertions.assertEquals(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), result.getBody());
		Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
	}

	@DisplayName("Error - doAuthenticateUser controller")
	@Test
	public void testServiceExceptionValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA", GUID)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.BAD_REQUEST));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA", GUID);
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
	}
	@DisplayName("Exception - doAuthenticateUser controller")
	@Test
	void testException() throws EcrcServiceException {
		when(ecrcServices.doAuthenticateUser("SOMEDATA", GUID)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response = doAuthenticateUserController.doAuthenticateUser("SOMEDATA", GUID);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
