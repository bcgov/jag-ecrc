package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

import net.minidev.json.JSONObject;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.OauthServiceException;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;
import ca.bc.gov.open.ecrc.service.OauthServicesImpl;

import static org.mockito.ArgumentMatchers.any;

/**
 * Tests for oauth controller
 * 
 * @author sivakaruna
 *
 */
class OauthControllerTest {

	@Mock
	OauthServicesImpl oauthServices;

	@Mock
	ECRCJWTValidationServiceImpl tokenServices;

	@Mock
	EcrcProperties ecrcProperties;

	@InjectMocks
	OauthController oauthController = new OauthController();

	JSONObject userInfo;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getJwtSecret()).thenReturn("secret");
		Mockito.when(ecrcProperties.getJwtAuthorizedRole()).thenReturn("role");
		userInfo = new JSONObject();
		userInfo.put("sub", "test");
	}

	@DisplayName("Success - getBCSCUrl oauth controller")
	@Test
	void testGetBCSCUrlSuccess() throws OauthServiceException {
		when(oauthServices.getIDPRedirect()).thenReturn(new ResponseEntity<String>("test", HttpStatus.OK));
		ResponseEntity<String> response = oauthController.getBCSCUrl("SOMEUUID");
		Assert.assertEquals("test", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - getBCSCUrl oauth controller")
	@Test
	void testGetBCSCUrlError() throws OauthServiceException {
		when(oauthServices.getIDPRedirect()).thenThrow(new OauthServiceException("error"));
		ResponseEntity<String> response = oauthController.getBCSCUrl("SOMEUUID");
		Assert.assertEquals(EcrcExceptionConstants.SERVICE_UNAVAILABLE, response.getBody());
		Assert.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}

	@DisplayName("Success - login oauth controller")
	@Test
	void testLoginSuccess() throws OauthServiceException {
		when(oauthServices.getToken(any())).thenReturn(new ResponseEntity<String>("test", HttpStatus.OK));
		ResponseEntity<String> response = oauthController.login("test", "SOMEUUID");
		Assert.assertEquals("test", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - login oauth controller (getToken)")
	@Test
	void testLoginError1() throws OauthServiceException {
		when(oauthServices.getToken(any())).thenThrow(new OauthServiceException("error"));
		ResponseEntity<String> response = oauthController.login("code", "SOMEUUID");
		Assert.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
}
