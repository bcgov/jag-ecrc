package ca.bc.gov.open.ecrc.service;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

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
import org.mockito.Spy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

	@InjectMocks
	@Spy
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
		Mockito.when(ecrcProperties.getOauthIdp()).thenReturn("test.ca");
		Mockito.when(ecrcProperties.getOauthGetBCSCRedirectUri()).thenReturn("/getIdp");
		Mockito.when(ecrcProperties.getOauthUrl()).thenReturn(baseUrl);
		Mockito.when(ecrcProperties.getOauthUsername()).thenReturn("user");
		Mockito.when(ecrcProperties.getOauthPassword()).thenReturn("password");
		Mockito.when(ecrcProperties.getOauthLoginUri()).thenReturn("/login%s");
		Method postConstruct = OauthServicesImpl.class.getDeclaredMethod("InitService"); // methodName
		postConstruct.setAccessible(true);
		postConstruct.invoke(oauthServices);
	}

	@DisplayName("Success - getIDPRedirect oauth service")
	@Test
	void testIdpRedirect() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody("localhost");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> response = oauthServices.getIDPRedirect();
		Assertions.assertEquals("localhost", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Success - getToken oauth service")
	@Test
	void testGetToken() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody("localhost");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> response = oauthServices.getToken("code");
		Assertions.assertEquals("localhost", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - getIDPRedirect oauth service")
	@Test
	void testIdpRedirectError() throws OauthServiceException, IOException {
		mockBackEnd.shutdown();
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getIDPRedirect();
		});
	}

	@DisplayName("Error - getToken oauth service")
	@Test
	void testGetTokenError() throws OauthServiceException, IOException {
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getToken("code");
		});
	}

}
