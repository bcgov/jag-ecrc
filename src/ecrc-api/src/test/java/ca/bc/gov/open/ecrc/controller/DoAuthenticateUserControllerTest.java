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
	public void testOddValidOrg() throws EcrcServiceException {
		Mockito.when(ecrcServices.doAuthenticateUser("SOMEDATA")).thenReturn("SOMESTRING");
		ResponseEntity<String> result = doAuthenticateUserController.doAuthenticateUser("SOMEDATA");
		Assertions.assertEquals("SOMESTRING", result.getBody());
	}

}
