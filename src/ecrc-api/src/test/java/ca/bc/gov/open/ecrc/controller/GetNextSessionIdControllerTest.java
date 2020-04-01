package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

public class GetNextSessionIdControllerTest {
    private static final String GUID = "GUID";
    @InjectMocks
    GetNextSessionIdController getNextSessionIdController;

    @Mock
    EcrcServicesImpl ecrcServices;

    @Mock
    ObjectMapper objectMapper;

    @BeforeEach
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
    }

    @DisplayName("Success - getNextSessionId controller")
    @Test
    public void testFoundValidOrg() throws EcrcServiceException {
        Mockito.when(ecrcServices.getNextSessionId("SOMEDATA", GUID)).thenReturn(new ResponseEntity<>("SOMESTRING", HttpStatus.OK));
        ResponseEntity<String> result = getNextSessionIdController.getNextSessionId("SOMEDATA", GUID);
        Assertions.assertEquals("SOMESTRING", result.getBody());
    }

    @DisplayName("Failure - getNextSessionId controller")
    @Test
    public void testNotFoundValidOrg() throws EcrcServiceException {
        Mockito.when(ecrcServices.getNextSessionId("SOMEDATA", GUID)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.NOT_FOUND));
        ResponseEntity<String> result = getNextSessionIdController.getNextSessionId("SOMEDATA", GUID);
        Assertions.assertEquals(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), result.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
    }

    @DisplayName("Error - getNextSessionId controller")
    @Test
    public void testServiceExceptionValidOrg() throws EcrcServiceException {
        Mockito.when(ecrcServices.getNextSessionId("SOMEDATA", GUID)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.BAD_REQUEST));
        ResponseEntity<String> result = getNextSessionIdController.getNextSessionId("SOMEDATA", GUID);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }
}
