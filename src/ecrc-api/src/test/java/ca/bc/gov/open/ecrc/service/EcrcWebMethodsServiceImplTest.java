package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
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

public class EcrcWebMethodsServiceImplTest {
    private static final String GUID = "GUID";
    private final String jsonResp = "{\"accessCodeResponse\":{\"ticketFoundYn\":\"Y\",\"contactSurnameNm\":\"ANOTHERRIDICULOUSLYLONGSURNAMETOBEENTERE\",\"cityNm\":\"VANCOUVER\",\"defaultScheduleTypeCd\":\"WBSD\",\"alreadyUsedYn\":\"N\",\"provinceNm\":\"BRITISH COLUMBIA\",\"orgApplicantRelationship\":\"EMPLOYEE\",\"countryNm\":\"CANADA\",\"validDateRangeYn\":\"Y\",\"defaultCrcScopeLevelCd\":\"WWCA\",\"orgNm\":\"ORGNAME\\n\",\"contactFirstNm\":\"ASDFASDFASDFASFSADF\",\"contactPhoneNo\":\"604\",\"addressLine1\":\"55 SEVENTH AVE\",\"addressLine2\":\"\",\"contactFaxNo\":\"604\",\"orgPartyId\":47430,\"postalCodeTxt\":\"V8V 7V6\"},\"scheduleTypes\":{\"scheduleType\":[{\"crcScheduleTypeDsc\":\"SCHEDULE D - WEB EIV\",\"crcScheduleTypeCd\":\"WBSD\"}]},\"message\":\"Success\",\"scopeLevels\":{\"scopeLevel\":[{\"crcScopeLevelCd\":\"WWCH\",\"crcScopeLevelDsc\":\"CHILDREN\"},{\"crcScopeLevelCd\":\"WWCA\",\"crcScopeLevelDsc\":\"CHILDREN AND VULNERABLE ADULTS\"},{\"crcScopeLevelCd\":\"WWAD\",\"crcScopeLevelDsc\":\"VULNERABLE ADULTS\"}]},\"responseCode\":0}";
    private final String jsonNotFoundResp = "{\"message\":\"Requested data not found\", \"responseCode\":1}";
    private final String jsonServiceUnavailableResp = "{\"message\":\"Service unavailable returned\", \"responseCode\":-1}";
    private final String jsonUnknownResp = "{\"message\":\"Unknown response code return\", \"responseCode\":6}";
    public static MockWebServer mockBackEnd;
    @InjectMocks
    @Spy
    EcrcWebMethodsServiceImpl ecrcWebMethodsService;

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
        String baseUrl = String.format("http://localhost:%s",
                mockBackEnd.getPort());
        Mockito.when(ecrcProperties.getBaseUrl()).thenReturn(baseUrl);
        Mockito.when(ecrcProperties.getUsername()).thenReturn("username");
        Mockito.when(ecrcProperties.getPassword()).thenReturn("password");

        Method postConstruct =  EcrcWebMethodsServiceImpl.class.getDeclaredMethod("InitService"); // methodName
        postConstruct.setAccessible(true);
        postConstruct.invoke(ecrcWebMethodsService);
    }

    @DisplayName("Success - webMethods call")
    @Test
    public void testWebMethodsCallSuccess() throws JsonProcessingException {
        Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonResp);
        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(successResponseObject());
        mockResponse.addHeader("content-type: application/xml;");
        mockResponse.setResponseCode(200);
        mockBackEnd.enqueue(mockResponse);
        ResponseEntity<String> res = ecrcWebMethodsService.callWebMethodsService(ecrcProperties.getBaseUrl(), new DoAuthenticateUser(), GUID);
        Assertions.assertEquals(HttpStatus.OK, res.getStatusCode());
        Assertions.assertEquals(jsonResp, res.getBody());
    }

    @DisplayName("Not Found - webMethods call")
    @Test
    public void testWebMethodsCallNotFound() throws JsonProcessingException {
        Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonNotFoundResp);
        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(successResponseObject());
        mockResponse.addHeader("content-type: application/xml;");
        mockResponse.setResponseCode(200);
        mockBackEnd.enqueue(mockResponse);
        ResponseEntity<String> res = ecrcWebMethodsService.callWebMethodsService(ecrcProperties.getBaseUrl(), new DoAuthenticateUser(), GUID);
        Assertions.assertEquals(HttpStatus.NOT_FOUND, res.getStatusCode());
        Assertions.assertEquals(jsonNotFoundResp, res.getBody());
    }

    @DisplayName("Service Unavailable - webMethods call")
    @Test
    public void testWebMethodsCallServiceUnavailable() throws JsonProcessingException {
        Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonServiceUnavailableResp);
        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(successResponseObject());
        mockResponse.addHeader("content-type: application/xml;");
        mockResponse.setResponseCode(200);
        mockBackEnd.enqueue(mockResponse);
        ResponseEntity<String> res = ecrcWebMethodsService.callWebMethodsService(ecrcProperties.getBaseUrl(), new DoAuthenticateUser(), GUID);
        Assertions.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, res.getStatusCode());
        Assertions.assertEquals(jsonServiceUnavailableResp, res.getBody());
    }

    @DisplayName("Unknown Response - webMethods call")
    @Test
    public void testWebMethodsCallUnknown() throws JsonProcessingException {
        Mockito.when(objectMapper.writeValueAsString(any())).thenReturn(jsonUnknownResp);
        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(successResponseObject());
        mockResponse.addHeader("content-type: application/xml;");
        mockResponse.setResponseCode(200);
        mockBackEnd.enqueue(mockResponse);
        ResponseEntity<String> res = ecrcWebMethodsService.callWebMethodsService(ecrcProperties.getBaseUrl(), new DoAuthenticateUser(), GUID);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST , res.getStatusCode());
        Assertions.assertEquals(jsonUnknownResp, res.getBody());
    }

	@DisplayName("Failure - webMethods call bad json")
    @Test
    public void testWebMethodsCallJsonFailure() throws JsonProcessingException {
		Mockito.when(objectMapper.writeValueAsString(any())).thenThrow(new JsonProcessingException("BROKEN") {
			private static final long serialVersionUID = 1L;
		});
        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody(successResponseObject());
        mockResponse.addHeader("content-type: application/xml;");
        mockResponse.setResponseCode(200);
        mockBackEnd.enqueue(mockResponse);
        ResponseEntity<String> res = ecrcWebMethodsService.callWebMethodsService(ecrcProperties.getBaseUrl(), new DoAuthenticateUser(), GUID);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, res.getStatusCode());
    }

    @DisplayName("Failure - webMethods call general exception")
    @Test
    public void testWebMethodsCallFailure() {
        MockResponse mockResponse = new MockResponse();
        mockResponse.setBody("SOMEXML");
        mockResponse.setResponseCode(400);
        mockBackEnd.enqueue(mockResponse);
        ResponseEntity<String> res = ecrcWebMethodsService.callWebMethodsService(ecrcProperties.getBaseUrl(), new DoAuthenticateUser(), GUID);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, res.getStatusCode());
    }

    private String successResponseObject() {
        DoAuthenticateUser doAuthenticateUser = new DoAuthenticateUser();
        DoAuthenticateUser.AccessCodeResponse accessCodeResponse = new DoAuthenticateUser.AccessCodeResponse();
        accessCodeResponse.setOrgPartyId(1);
        accessCodeResponse.setOrgNm("ORGNAME");
        accessCodeResponse.setContactSurnameNm("SURNAME");
        accessCodeResponse.setContactFirstNm("FIRSTNAME");
        accessCodeResponse.setAddressLine1("ADDRESS1");
        accessCodeResponse.setAddressLine2("ADDRESS2");
        accessCodeResponse.setCityNm("CITY");
        accessCodeResponse.setProvinceNm("PROVINCE");
        accessCodeResponse.setCountryNm("COUNTRY");
        accessCodeResponse.setPostalCodeTxt("POSTAL");
        accessCodeResponse.setContactPhoneNo("1231231233");
        accessCodeResponse.setContactFaxNo("1231231233");
        accessCodeResponse.setOrgApplicantRelationship("APPREL");
        accessCodeResponse.setDefaultScheduleTypeCd("CD");
        accessCodeResponse.setDefaultCrcScopeLevelCd("CD");
        accessCodeResponse.setTicketFoundYn("Y");
        accessCodeResponse.setAlreadyUsedYn("Y");
        accessCodeResponse.setValidDateRangeYn("Y");
        doAuthenticateUser.setAccessCodeResponse(accessCodeResponse);
        doAuthenticateUser.setScopeLevels(new DoAuthenticateUser.ScopeLevels());
        doAuthenticateUser.setScheduleTypes(new DoAuthenticateUser.ScheduleTypes());
        doAuthenticateUser.setMessage("MSG");
        doAuthenticateUser.setResponseCode(0);
        return XMLStringUtil.jaxbObjectToXML(doAuthenticateUser);
    }
}
