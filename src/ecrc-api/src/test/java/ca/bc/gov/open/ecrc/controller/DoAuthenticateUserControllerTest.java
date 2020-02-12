package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
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


public class DoAuthenticateUserControllerTest {
	@InjectMocks
	DoAuthenticateUserController doAuthenticateUserController;

	@Mock
	EcrcServicesImpl ecrcServices;

	@Mock
	ObjectMapper objectMapper;

	@BeforeEach
	public void initMocks(){
		MockitoAnnotations.initMocks(this);
	}
	@DisplayName("Success - doAuthenticateUser controller")
	@Test
	public void testFoundValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenReturn(new ResponseEntity<>("SOMESTRING", HttpStatus.OK));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals("SOMESTRING", result.getBody());
	}

	@DisplayName("Failure - doAuthenticateUser controller")
	@Test
	public void testNotFoundValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR), HttpStatus.NOT_FOUND));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR), result.getBody());
		Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
	}

	@DisplayName("Error - doAuthenticateUser controller")
	@Test
	public void testServiceExceptionValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR), HttpStatus.BAD_REQUEST));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
	}
}
