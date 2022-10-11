package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

/**
 * Tests the getJwtDetails service.
 * 
 * @author BrendanBeachBCJ
 * @author sdevalapurkar-bcgov
 *
 */
public class EcrcServicesImplGetJwtDetailsTest {
	
	@InjectMocks
	EcrcServicesImpl ecrcServices;
	
	@Mock
	EcrcProperties ecrcProperties;
	
	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@DisplayName("Success - ecrcService getJwtDetails")
	@Test
	public void testGetJwtSecretSuccess() throws EcrcServiceException {
		when(ecrcProperties.getJwtSecret()).thenReturn("secret");
		when(ecrcProperties.getOauthClientId()).thenReturn(("123"));
		assertEquals("secret", ecrcServices.getJwtDetails().getString("secret"));
		assertEquals("123", ecrcServices.getJwtDetails().getString("clientId"));
	}

}
