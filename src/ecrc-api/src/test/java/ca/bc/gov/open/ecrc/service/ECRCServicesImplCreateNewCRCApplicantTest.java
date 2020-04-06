package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestNewCRCApplicant;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
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
import static org.mockito.Mockito.when;

public class ECRCServicesImplCreateNewCRCApplicantTest {

    private static final String WEBMETHODSRES = "{\"message\":\"Success\",\"partyId\":49060,\"invoiceId\":49060,\"sessionId\":49060,\"serviceId\":49060,\"serviceFeeAmount\":28,\"responseCode\":0}";
    private static final String serviceResp =  "{\"respValue\":\"test.com\",\"respMsg\":\"success\",\"respCode\":0}";
    private static final String successResp = "{\"paymentUrl\":\"test.com\",\"serviceId\":\"49060\",\"partyId\":\"49060\",\"sessionId\":\"49060\",\"invoiceId\":\"49060\",\"serviceFeeAmount\":\"28\"}";
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

    @Mock
    EcrcPaymentService ecrcPaymentService;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(ecrcProperties.getCreateApplicantUri()).thenReturn("/createApplicant%s");
        Mockito.when(ecrcProperties.getGetNextInvoiceIdUri()).thenReturn("invoiceurl?%s");
        Mockito.when(ecrcProperties.getGetNextSessionIdUri()).thenReturn("sessionurl?%s");
        Mockito.when(ecrcProperties.getCreateNewCRCServiceUri()).thenReturn("crcurl?%s");
        Mockito.when(ecrcProperties.getGetServiceFeeAmountUri()).thenReturn("feeurl?%s");
    }

    @DisplayName("Success - ecrcService CreateNewCRCApplicant")
    @Test
    public void testSuccess() throws EcrcServiceException {

        RequestNewCRCApplicant request = new RequestNewCRCApplicant();
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestNewCRCService(new RequestNewCRCService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenReturn(new ResponseEntity<>(WEBMETHODSRES, HttpStatus.OK));

        Mockito.when(ecrcPaymentService.createPaymentUrl(any())).thenReturn(new ResponseEntity<String>(serviceResp, HttpStatus.OK));
        ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
        Assert.assertEquals(successResp, response.getBody());
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @DisplayName("Error - ecrcService CreateNewCRCApplicant")
    @Test
    public void testError() throws EcrcServiceException {

        RequestNewCRCApplicant request = new RequestNewCRCApplicant();
        request.setRequestCreateApplicant(new RequestCreateApplicant());
        request.setRequestNewCRCService(new RequestNewCRCService());
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
                .thenReturn(new ResponseEntity<>("{\"message\":\"something happened\",responseCode\":-1}", HttpStatus.SERVICE_UNAVAILABLE));

        ResponseEntity<String> response = ecrcServices.createNewCRCApplicant(request);
        Assert.assertEquals("{\"message\":\"something happened\",responseCode\":-1}", response.getBody());
        Assert.assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
    }
}
