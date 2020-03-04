package ca.bc.gov.open.ecrc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

/**
 * Tests the getJwtSecret service.
 * 
 * @author BrendanBeachBCJ
 *
 */
public class EcrcServicesImplGetJwtSecretTest {
	
	@InjectMocks
	EcrcServicesImpl ecrcServices;
	
	@Mock
	EcrcProperties ecrcProperties;
	
	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@DisplayName("Success - ecrcService getJwtSecret")
	@Test
	public void testGetJwtSecretSuccess() throws EcrcServiceException {
		when(ecrcProperties.getJwtSecret()).thenReturn("secret");
		assertEquals("secret", ecrcServices.getJwtSecret());
	}
	
}
