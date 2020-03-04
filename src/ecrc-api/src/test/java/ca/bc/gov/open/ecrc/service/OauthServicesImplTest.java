package ca.bc.gov.open.ecrc.service;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URI;
import java.net.URISyntaxException;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.OauthServiceException;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;

/**
 * Tests for oauth service
 * 
 * @author sivakaruna
 *
 */
class OauthServicesImplTest {

	private final String jsonTokenSuccessResp = "{\"access_token\":\"abc.abc.abc\","
			+ "\"refresh_token\":\"def.def.def\"," + "\"scope\":\"scope\"," + "\"id_token\":\"ghi.ghi.ghi\","
			+ "\"token_type\":\"Bearer\"}";
	private final String jsonTokenErrorResp = "{\"refresh_token\":\"def.def.def\"," + "\"scope\":\"scope\","
			+ "\"id_token\":\"ghi.ghi.ghi\"," + "\"token_type\":\"Bearer\"}";

	private final String jsonUserSuccessResp = "{ \"sub\": \"123\", \"name\": \"Test Test\", \"email\": \"test@test.com\" }";
	private final String jsonUserErrorResp = "{}";

	@InjectMocks
	OauthServicesImpl oauthServices;

	@Mock
	EcrcProperties ecrcProperties;

	public static MockWebServer mockBackEnd;

	@BeforeAll
	static void setUp() throws IOException {
		mockBackEnd = new MockWebServer();
		mockBackEnd.start();
	}

	@AfterAll
	static void tearDown() throws IOException {
		mockBackEnd.shutdown();
	}

	@BeforeEach
	void initialize() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		MockitoAnnotations.initMocks(this);
		String baseUrl = String.format("http://localhost:%s", mockBackEnd.getPort());
		Mockito.when(ecrcProperties.getOauthIdp()).thenReturn(baseUrl);
		Mockito.when(ecrcProperties.getOauthClientId()).thenReturn("123");
		Mockito.when(ecrcProperties.getOauthScope()).thenReturn("scope");
		Mockito.when(ecrcProperties.getOauthReturnUri()).thenReturn("test.com");
		Mockito.when(ecrcProperties.getOauthSecret()).thenReturn("secret");
	}

	@DisplayName("Success - getIDPRedirect oauth service")
	@Test
	void testIdpRedirect() throws URISyntaxException {
		URI response = oauthServices.getIDPRedirect();
		Assertions.assertEquals("localhost", response.getHost());
	}

	@DisplayName("Success - getToken oauth service")
	@Test
	void testGetTokenSuccess() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(jsonTokenSuccessResp);
		mockResponse.addHeader("content-type: application/json;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		AccessTokenResponse response = oauthServices.getToken("test");
		Assertions.assertEquals("abc.abc.abc", response.getTokens().getBearerAccessToken().getValue());
	}

	@DisplayName("Failure - getToken oauth service")
	@Test
	void testGetTokenFailure1() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(jsonTokenErrorResp);
		mockResponse.addHeader("content-type: application/json;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getToken("test");
		});
	}

	@DisplayName("Failure - getToken oauth service")
	@Test
	void testGetTokenFailure2() throws OauthServiceException, IOException {
		tearDown();
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getToken("test");
		});
		setUp();
	}

	@DisplayName("Failure - getToken oauth service")
	@Test
	void testGetTokenFailure3() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(jsonTokenErrorResp);
		mockResponse.addHeader("content-type: application/json;");
		mockResponse.setResponseCode(400);
		mockBackEnd.enqueue(mockResponse);
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getToken("test");
		});
	}

	@DisplayName("Failure - getToken oauth service")
	@Test
	void testGetTokenFailure4() throws OauthServiceException {
		Mockito.when(ecrcProperties.getOauthReturnUri()).thenReturn("\"");
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getToken("test");
		});
	}

	@DisplayName("Success - getUserInfo oauth service")
	@Test
	void testGetUserInfoSuccess() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(jsonUserSuccessResp);
		mockResponse.addHeader("content-type: application/json;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		UserInfo response = oauthServices.getUserInfo(new BearerAccessToken());
		Assertions.assertEquals("123", response.getClaim("sub"));
	}

	@DisplayName("Failure - getUserInfo oauth service")
	@Test
	void testGetUserInfoFailure1() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(jsonUserErrorResp);
		mockResponse.addHeader("content-type: application/json;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getUserInfo(new BearerAccessToken());
		});
	}

	@DisplayName("Failure - getUserInfo oauth service")
	@Test
	void testGetUserInfoFailure2() throws OauthServiceException, IOException {
		tearDown();
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getUserInfo(new BearerAccessToken());
		});
		setUp();
	}

	@DisplayName("Failure - getUserInfo oauth service")
	@Test
	void testGetUserInfoFailure3() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(jsonUserErrorResp);
		mockResponse.addHeader("content-type: application/json;");
		mockResponse.setResponseCode(400);
		mockBackEnd.enqueue(mockResponse);
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getUserInfo(new BearerAccessToken());
		});
	}
}
