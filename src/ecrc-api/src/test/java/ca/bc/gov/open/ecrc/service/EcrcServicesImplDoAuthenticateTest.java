package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import javassist.NotFoundException;
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

import static org.mockito.ArgumentMatchers.any;


public class EcrcServicesImplDoAuthenticateTest {
    private ResponseEntity<String> serviceResult;
    private final String result = "{\n" +
            "    \"accessCodeResponse\": {\n" +
            "        \"ticketFoundYn\": \"Y\",\n" +
            "        \"contactSurnameNm\": \"ANOTHERRIDICULOUSLYLONGSURNAMETOBEENTERE\",\n" +
            "        \"cityNm\": \"VANCOUVER\",\n" +
            "        \"defaultScheduleTypeCd\": \"WBSD\",\n" +
            "        \"alreadyUsedYn\": \"N\",\n" +
            "        \"provinceNm\": \"BRITISH COLUMBIA\",\n" +
            "        \"orgApplicantRelationship\": \"EMPLOYEE\",\n" +
            "        \"countryNm\": \"CANADA\",\n" +
            "        \"validDateRangeYn\": \"Y\",\n" +
            "        \"defaultCrcScopeLevelCd\": \"WWCA\",\n" +
            "        \"orgNm\": \"ORG NAME\\n\",\n" +
            "        \"contactFirstNm\": \"ASDFASDFASDFASFSADF\",\n" +
            "        \"contactPhoneNo\": \"604\",\n" +
            "        \"addressLine1\": \"STREETNAME\",\n" +
            "        \"addressLine2\": \"\",\n" +
            "        \"contactFaxNo\": \"604\",\n" +
            "        \"orgPartyId\": 47430,\n" +
            "        \"postalCodeTxt\": \"V8V 7V6\"\n" +
            "    },\n" +
            "    \"scheduleTypes\": {\n" +
            "        \"scheduleType\": [\n" +
            "            {\n" +
            "                \"crcScheduleTypeDsc\": \"SCHEDULE D - WEB EIV\",\n" +
            "                \"crcScheduleTypeCd\": \"WBSD\"\n" +
            "            }\n" +
            "        ]\n" +
            "    },\n" +
            "    \"message\": \"Success\",\n" +
            "    \"scopeLevels\": {\n" +
            "        \"scopeLevel\": [\n" +
            "            {\n" +
            "                \"crcScopeLevelCd\": \"WWCH\",\n" +
            "                \"crcScopeLevelDsc\": \"CHILDREN\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"crcScopeLevelCd\": \"WWCA\",\n" +
            "                \"crcScopeLevelDsc\": \"CHILDREN AND VULNERABLE ADULTS\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"crcScopeLevelCd\": \"WWAD\",\n" +
            "                \"crcScopeLevelDsc\": \"VULNERABLE ADULTS\"\n" +
            "            }\n" +
            "        ]\n" +
            "    },\n" +
            "    \"responseCode\": 0\n" +
            "}";
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(ecrcProperties.getDoAuthenticateUserUri()).thenReturn("doauthurl?%s");
    }

    @DisplayName("Success - ecrcService doAuthenticate")
    @Test
    public void testDoAuthenticateResultSuccess() throws NotFoundException, EcrcServiceException {
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any())).thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
        serviceResult = ecrcServices.doAuthenticateUser("CRCE");
        Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
        Assertions.assertEquals(result, serviceResult.getBody());
    }
}
