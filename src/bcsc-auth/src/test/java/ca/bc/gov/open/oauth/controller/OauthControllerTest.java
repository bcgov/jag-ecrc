package ca.bc.gov.open.oauth.controller;

import static org.mockito.Mockito.when;

import java.net.URI;
import java.net.URISyntaxException;


import net.minidev.json.JSONObject;
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

import com.nimbusds.oauth2.sdk.AccessTokenResponse;

import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.oauth2.sdk.token.RefreshToken;
import com.nimbusds.oauth2.sdk.token.Tokens;

import ca.bc.gov.open.oauth.configuration.OauthProperties;
import ca.bc.gov.open.oauth.exception.OauthServiceException;
import ca.bc.gov.open.oauth.model.ValidationResponse;
import ca.bc.gov.open.oauth.service.ECRCJWTValidationServiceImpl;
import ca.bc.gov.open.oauth.service.OauthServicesImpl;

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
	OauthProperties ecrcProperties;

	@InjectMocks
	OauthController oauthController = new OauthController();
	
	JSONObject userInfo;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getJwtSecret()).thenReturn("secret");
		Mockito.when(ecrcProperties.getJwtExpiry()).thenReturn(300);
		Mockito.when(ecrcProperties.getJwtAuthorizedRole()).thenReturn("role");
		userInfo = new JSONObject();
		userInfo.put("sub", "test");
	}


	@DisplayName("Success - getBCSCUrl oauth controller")
	@Test
	void testGetBCSCUrlSuccess() throws OauthServiceException, URISyntaxException {
		when(oauthServices.getIDPRedirect()).thenReturn(new URI("test"));
		ResponseEntity<String> response = oauthController.getBCSCUrl();
		Assertions.assertEquals("test", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - getBCSCUrl oauth controller")
	@Test
	void testGetBCSCUrlError() throws OauthServiceException, URISyntaxException {
		when(oauthServices.getIDPRedirect()).thenReturn(null);
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthController.getBCSCUrl();
		});
	}

	@DisplayName("Success - login oauth controller")
	@Test
	void testLoginSuccess() throws OauthServiceException, URISyntaxException {
		
		when(oauthServices.getUserInfo(any())).thenReturn(userInfo);
		when(oauthServices.getToken(any()))
				.thenReturn(new AccessTokenResponse(new Tokens(new BearerAccessToken(), new RefreshToken())));
		when(tokenServices.validateBCSCIDToken(any()))
				.thenReturn(new ValidationResponse(true, "success"));
	
		ResponseEntity<String> response = oauthController.login("test");
		Assertions.assertNotNull(response);
	}

	@DisplayName("Error - login oauth controller (getToken)")
	@Test
	void testLoginError1() throws OauthServiceException, URISyntaxException {
		when(oauthServices.getToken(any())).thenThrow(new OauthServiceException("error"));
		ResponseEntity<String> response = oauthController.login("code");
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}

	@DisplayName("Error - login oauth controller (getUserInfo)")
	@Test
	void testLoginError2() throws OauthServiceException, URISyntaxException {
		when(oauthServices.getToken(any()))
				.thenReturn(new AccessTokenResponse(new Tokens(new BearerAccessToken(), new RefreshToken())));
		when(tokenServices.validateBCSCIDToken(any())).
			thenReturn(new ValidationResponse(true, "success"));
		when(oauthServices.getUserInfo(any())).thenThrow(new OauthServiceException("error"));
		ResponseEntity<String> response = oauthController.login("code");
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
}
