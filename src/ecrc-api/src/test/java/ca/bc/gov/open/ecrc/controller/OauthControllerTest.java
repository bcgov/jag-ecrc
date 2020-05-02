package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

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
 * @author sdevalapurkar-bcgov
 *
 */
class OauthControllerTest {

	private final String jwtSuccess = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6WyJyb2xlIl19."
			+ "hRTr1-4SQQDyru3SQp1DHbLLJnb3UQqyg_v-PgDEd5Y";

	@Mock
	OauthServicesImpl oauthServices;

	@Mock
	ECRCJWTValidationServiceImpl tokenServices;

	@Mock
	EcrcProperties ecrcProperties;

	@InjectMocks
	OauthController oauthController = new OauthController();

	JSONObject userInfo;

	HttpServletRequest request;
	HttpServletRequestWrapper wrapper;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getJwtSecret()).thenReturn("secret");
		Mockito.when(ecrcProperties.getJwtAuthorizedRole()).thenReturn("role");
		userInfo = new JSONObject();
		userInfo.put("sub", "test");

		request = mock(HttpServletRequest.class);
		wrapper = new HttpServletRequestWrapper(request) {
			@Override
			public String getHeader(String name) {
				return "prefix" + jwtSuccess;
			}
		};
	}


	@DisplayName("Success - getBCSCUrl oauth controller default")
	@Test
	void testDefaultGetBCSCUrlSuccess() throws OauthServiceException {
		

		when(oauthServices.getIDPRedirect(jwtSuccess, null)).thenReturn(new ResponseEntity<String>("test", HttpStatus.OK));
		ResponseEntity<String> response = oauthController.getBCSCUrl(wrapper, "SOMEUUID", null);
		Assert.assertEquals("test", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Success - getBCSCUrl oauth controller")
	@Test
	void testGetBCSCUrlSuccess() throws OauthServiceException {
		when(oauthServices.getIDPRedirect(jwtSuccess, "TEST")).thenReturn(new ResponseEntity<String>("test", HttpStatus.OK));
		ResponseEntity<String> response = oauthController.getBCSCUrl(wrapper, "SOMEUUID", "TEST");
		Assert.assertEquals("test", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - getBCSCUrl oauth controller")
	@Test
	void testGetBCSCUrlError() throws OauthServiceException {
		when(oauthServices.getIDPRedirect(jwtSuccess, null)).thenThrow(new OauthServiceException("error"));
		ResponseEntity<String> response = oauthController.getBCSCUrl(wrapper, "SOMEUUID", null);
		Assert.assertEquals(EcrcExceptionConstants.SERVICE_UNAVAILABLE, response.getBody());
		Assert.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}

	@DisplayName("Success - login oauth controller other")
	@Test
	void testLoginSuccess() throws OauthServiceException {
		when(oauthServices.getToken(jwtSuccess, any(), any())).thenReturn(new ResponseEntity<String>("test", HttpStatus.OK));
		ResponseEntity<String> response = oauthController.login(wrapper, "test", "SOMEUUID", "TEST");
		Assert.assertEquals("test", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - login oauth controller (getToken)")
	@Test
	void testLoginError1() throws OauthServiceException {
		when(oauthServices.getToken(jwtSuccess, any(), any())).thenThrow(new OauthServiceException("error"));
		ResponseEntity<String> response = oauthController.login(wrapper, "code", "SOMEUUID", null);
		Assert.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
}