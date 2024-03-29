package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.OauthServiceException;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Tests for oauth service
 * 
 * @author sivakaruna
 *
 */
class OauthServicesImplTest {

	private final String jwtSuccess = "eyJhbGciOiJIUzI1NiJ9."
			+ "eyJoZWFkZXIiOiJwcmVmaXgiLCJhdXRob3JpdGllcyI6WyJyb2xlIl19."
			+ "hRTr1-4SQQDyru3SQp1DHbLLJnb3UQqyg_v-PgDEd5Y";

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

	@DisplayName("Success - getIDPRedirect oauth service specified return")
	@Test
	void testIdpRedirect() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody("localhost");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> response = oauthServices.getIDPRedirect(jwtSuccess, "TEST");
		Assertions.assertEquals("localhost", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Success - getToken oauth service default")
	@Test
	void testDefaultGetTokenSuccess() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody("localhost");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> response = oauthServices.getToken(jwtSuccess, "code", null);
		Assertions.assertEquals("localhost", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Success - getToken oauth service other")
	@Test
	void testOtherGetTokenSuccess() throws OauthServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody("localhost");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> response = oauthServices.getToken(jwtSuccess, "code", "TEST");
		Assertions.assertEquals("localhost", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Error - getIDPRedirect oauth service")
	@Test
	void testIdpRedirectError() throws OauthServiceException, IOException {
		mockBackEnd.shutdown();
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getIDPRedirect(jwtSuccess, null);
		});
	}

	@DisplayName("Error - getToken oauth service")
	@Test
	void testGetTokenError() throws OauthServiceException, IOException {
		Assertions.assertThrows(OauthServiceException.class, () -> {
			oauthServices.getToken(jwtSuccess, "code", null);
		});
	}

}