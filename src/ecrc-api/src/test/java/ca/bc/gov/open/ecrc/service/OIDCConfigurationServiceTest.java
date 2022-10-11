package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.lang.reflect.InvocationTargetException;

/**
 * Tests for oidc Configuration Service
 * 
 * @author sivakaruna
 *
 */
class OIDCConfigurationServiceTest {

	@InjectMocks
	OIDCConfigurationService oidcConfigurationService = new OIDCConfigurationService();

	@Mock
	EcrcProperties ecrcProperties;

	@BeforeEach
	void initialize() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getOauthWellKnown()).thenReturn("${uri}");
		Mockito.when(ecrcProperties.getOauthBCSCTimeout()).thenReturn(60000);
	}

	//Cannot test success without using the real well-known url
	@DisplayName("Failure - getConfig oidcConfiguration service")
	@Test
	void testGetConfig() throws EcrcServiceException {
		Assertions.assertNull(oidcConfigurationService.getConfig());
	}
}
