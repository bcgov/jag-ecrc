package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCRCShare;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestCreateSharingService;
import ca.bc.gov.open.ecrc.service.EcrcServicesImpl;
import org.junit.Assert;
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

import static org.mockito.Mockito.when;

public class ShareCRCControllerTest {
    @InjectMocks
    ShareCRCController shareCRCController;

    @Mock
    EcrcServicesImpl ecrcServices;

    RequestCRCShare requestCRCShare;

    @BeforeEach
    public void initMocks(){

        MockitoAnnotations.initMocks(this);
        requestCRCShare = new RequestCRCShare();
        requestCRCShare.setRequestCreateApplicant(new RequestCreateApplicant());
        requestCRCShare.getRequestCreateApplicant().setRequestGuid("TESTING");
        requestCRCShare.setRequestCreateSharingService(new RequestCreateSharingService());
    }
    @DisplayName("Success - shareCRC controller")
    @Test
    public void testSuccessfulCreate() throws EcrcServiceException {

        Mockito.when(ecrcServices.createCRCShare(requestCRCShare)).thenReturn(new ResponseEntity<>("SOMESTRING", HttpStatus.OK));
        ResponseEntity<String> result = shareCRCController.shareCRCService(requestCRCShare);
        Assertions.assertEquals("SOMESTRING", result.getBody());
    }

    @DisplayName("Failure - shareCRC controller")
    @Test
    public void testNotFoundValidOrg() throws EcrcServiceException {
        Mockito.when(ecrcServices.createCRCShare(requestCRCShare)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.NOT_FOUND));
        ResponseEntity<String> result = shareCRCController.shareCRCService(requestCRCShare);
        Assertions.assertEquals(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), result.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
    }

    @DisplayName("Error - shareCRC controller")
    @Test
    public void testServiceExceptionValidOrg() throws EcrcServiceException {
        Mockito.when(ecrcServices.createCRCShare(requestCRCShare)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.BAD_REQUEST));
        ResponseEntity<String> result = shareCRCController.shareCRCService(requestCRCShare);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }
    @DisplayName("Exception - shareCRC controller")
    @Test
    void testException() throws EcrcServiceException {
        when(ecrcServices.createCRCShare(requestCRCShare)).thenThrow(new EcrcServiceException("FAIL"));
        ResponseEntity<String> response =  shareCRCController.shareCRCService(requestCRCShare);
        Assertions.assertEquals(
                String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                        EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
                response.getBody());
        Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
