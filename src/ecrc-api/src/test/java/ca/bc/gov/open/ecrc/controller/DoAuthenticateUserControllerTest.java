package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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

	@Test
	public void testFoundValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenReturn("SOMESTRING");
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals("SOMESTRING", result.getBody());
	}

	@Test
	public void testNotFoundValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenReturn(null);
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals("{\"accessCode\":\"SOMEDATA\"}", result.getBody());
		Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
	}

	@Test
	public void testServiceExceptionValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenThrow(new EcrcServiceException("ATHINGHAPPENED"));
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
	}
}
