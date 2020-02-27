package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestPaymentService;
import ca.bc.gov.open.ecrc.model.ResponsePaymentService;
import ca.bc.gov.open.ecrc.testutil.XMLStringUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import static org.mockito.ArgumentMatchers.any;

public class EcrcPaymentServiceImplTest {
	
	
	private final String jsonResp = "{\"respValue\":\"test.com\",\"respMsg\":\"success\",\"respCode\":0}";
	private final String jsonNotFoundResp = "{\"respMsg\":\"Requested data not found\", \"respCode\":1}";
	private final String jsonServiceUnavailableResp = "{\"respMsg\":\"Service unavailable returned\", \"respCode\":-1}";
	private final String jsonUnknownResp = "{\"respMsg\":\"Unknown response code return\", \"respCode\":6}";

	private final String serviceResp = "{\"paymentUrl\":\"test.com\", \"message\":\"success\", \"responseCode\":0}";
	private final String serviceNotFoundResp = "{\"message\":\"Requested data not found\", \"responseCode\":1}";
	private final String serviceServiceUnavailableResp = "{\"message\":\"Service unavailable returned\", \"responseCode\":-1}";
	private final String serviceUnknownResp = "{\"message\":\"Unknown response code return\", \"responseCode\":6}";

	public static MockWebServer mockBackEnd;
	@InjectMocks
	@Spy
	EcrcPaymentServiceImpl ecrcPaymentService;

	@Mock
	EcrcProperties ecrcProperties;

	@Mock
	ObjectMapper objectMapper;

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
		Mockito.when(ecrcProperties.getPaymentUrl()).thenReturn(baseUrl);
		Mockito.when(ecrcProperties.getPaymentUsername()).thenReturn("username");
		Mockito.when(ecrcProperties.getPaymentPassword()).thenReturn("password");
		Mockito.when(ecrcProperties.getGetSinglePaymentUri()).thenReturn("uri");

		Method postConstruct = EcrcPaymentServiceImpl.class.getDeclaredMethod("InitService");
		postConstruct.setAccessible(true);
		postConstruct.invoke(ecrcPaymentService);
	}

	@DisplayName("Success - webMethods call")
	@Test
	public void testWebMethodsCallSuccess() throws JsonProcessingException, EcrcServiceException {
		Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonResp);
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(successResponseObject());
		mockResponse.addHeader("content-type: application/xml;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> res = ecrcPaymentService.createPaymentUrl(new RequestPaymentService());
		Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
		Assertions.assertEquals(serviceResp, res.getBody());
	}

	@DisplayName("Not Found - webMethods call")
	@Test
	public void testWebMethodsCallNotFound() throws JsonProcessingException, EcrcServiceException {
		Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonNotFoundResp);
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(successResponseObject());
		mockResponse.addHeader("content-type: application/xml;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> res = ecrcPaymentService.createPaymentUrl(new RequestPaymentService());
		Assertions.assertEquals(HttpStatus.NOT_FOUND, res.getStatusCode());
		Assertions.assertEquals(serviceNotFoundResp, res.getBody());
	}

	@DisplayName("Service Unavailable - webMethods call")
	@Test
	public void testWebMethodsCallServiceUnavailable() throws JsonProcessingException, EcrcServiceException {
		Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonServiceUnavailableResp);
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(successResponseObject());
		mockResponse.addHeader("content-type: application/xml;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> res = ecrcPaymentService.createPaymentUrl(new RequestPaymentService());
		Assertions.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, res.getStatusCode());
		Assertions.assertEquals(serviceServiceUnavailableResp, res.getBody());
	}

	@DisplayName("Unknown Response - webMethods call")
	@Test
	public void testWebMethodsCallUnknown() throws JsonProcessingException, EcrcServiceException {
		Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonUnknownResp);
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody(successResponseObject());
		mockResponse.addHeader("content-type: application/xml;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> res = ecrcPaymentService.createPaymentUrl(new RequestPaymentService());
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, res.getStatusCode());
		Assertions.assertEquals(serviceUnknownResp, res.getBody());
	}

	@SuppressWarnings("serial")
	@DisplayName("Failure - webMethods call bad json")
	@Test
	public void testWebMethodsCallJsonFailure() throws JsonProcessingException, EcrcServiceException {
		Mockito.when(objectMapper.writeValueAsString(any())).thenThrow(new JsonProcessingException("BROKEN") {
		});
		MockResponse mockResponse = new MockResponse();
		mockResponse.addHeader("content-type: application/xml;");
		mockResponse.setResponseCode(200);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> res = ecrcPaymentService.createPaymentUrl(new RequestPaymentService());
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, res.getStatusCode());
	}

	@DisplayName("Failure - webMethods call general exception")
	@Test
	public void testWebMethodsCallFailure() throws EcrcServiceException {
		MockResponse mockResponse = new MockResponse();
		mockResponse.setBody("SOMEXML");
		mockResponse.setResponseCode(400);
		mockBackEnd.enqueue(mockResponse);
		ResponseEntity<String> res = ecrcPaymentService.createPaymentUrl(new RequestPaymentService());
		Assertions.assertEquals(HttpStatus.BAD_REQUEST, res.getStatusCode());
	}

	private String successResponseObject() {
		ResponsePaymentService response = new ResponsePaymentService();
		response.setRespCode(0);
		response.setRespMsg("msg");
		response.setRespValue("value");
		return XMLStringUtil.jaxbObjectToXML(response);
	}
}
