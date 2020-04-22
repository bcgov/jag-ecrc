package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.*;
import ca.bc.gov.open.ecrc.objects.*;
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

import static org.mockito.ArgumentMatchers.any;

public class EcrcServiceImplShareCRC {
    private static final String WEBMETHODSRES = "{\"message\":\"Success\",\"partyId\":49060,\"responseCode\":0}";
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;


    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(ecrcProperties.getCreateApplicantUri()).thenReturn("/createApplicant%s");
        Mockito.when(ecrcProperties.getCreateSharingServiceUri()).thenReturn("/share?%s");
    }

    @DisplayName("Success - ecrcService CreateCRCShare")
    @Test
    public void testEmployeeSuccess() throws EcrcServiceException {

        RequestCRCShare request = new RequestCRCShare();
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestCreateSharingService(new RequestCreateSharingService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

        ResponseEntity<String> response = ecrcServices.createCRCShare(request);
        Assert.assertEquals(WEBMETHODSRES, response.getBody());
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
    }


    @DisplayName("Error - createApplicant ecrcService CreateCRCShare")
    @Test
    public void testError1() throws EcrcServiceException {

        RequestCRCShare request = new RequestCRCShare();
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestCreateSharingService(new RequestCreateSharingService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(CreateApplicant.class), any()))
                .thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
                        HttpStatus.SERVICE_UNAVAILABLE));

        ResponseEntity<String> response = ecrcServices.createCRCShare(request);
        Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
        Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
    }

    @DisplayName("Error - createShare ecrcService CreateCRCShare")
    @Test
    public void testError2() throws EcrcServiceException {

        RequestCRCShare request = new RequestCRCShare();
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestCreateSharingService(new RequestCreateSharingService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(CreateApplicant.class), any()))
                .thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(CreateSharingService.class), any()))
                .thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}",
                        HttpStatus.SERVICE_UNAVAILABLE));

        ResponseEntity<String> response = ecrcServices.createCRCShare(request);
        Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
        Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
    }

    @DisplayName("Error - exception ecrcService CreateNewCRCApplicant")
    @Test
    public void testError3() throws EcrcServiceException {

        RequestCRCShare request = new RequestCRCShare();
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestCreateSharingService(new RequestCreateSharingService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenThrow(new NullPointerException("error"));
        ResponseEntity<String> response = ecrcServices.createCRCShare(request);
        Assert.assertEquals("error", response.getBody());
        Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
