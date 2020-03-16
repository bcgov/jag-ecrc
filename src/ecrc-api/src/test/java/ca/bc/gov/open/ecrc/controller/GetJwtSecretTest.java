package ca.bc.gov.open.ecrc.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * 
 * @author BrendanBeachBCJ
 *
 */
@ContextConfiguration
public class GetJwtSecretTest {
	
	@InjectMocks
	private GetJwtSecretController getJwtSecretController;
	
	@Mock
	private EcrcServices ecrcServices;
	
	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@DisplayName("Success - getJwtSecretController")
	@Test
	public void testSuccess() throws EcrcServiceException {
		when(ecrcServices.getJwtSecret()).thenReturn("testSecret");
		ResponseEntity<String> response = getJwtSecretController.getJwtSecret("SOMEUUID");
		assertEquals("testSecret", response.getBody());
	}
	
	
	@DisplayName("Error - getJwtSecretController")
	@Test
	public void testError() throws EcrcServiceException {
		when(ecrcServices.getJwtSecret()).thenThrow(new EcrcServiceException(EcrcExceptionConstants.DATA_NOT_FOUND_ERROR));
		ResponseEntity<String> response = getJwtSecretController.getJwtSecret("SOMEUUID");
		assertEquals(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}
}
