package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
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

public class EcrcServicesImplGetNextInvoiceIdTest {
    private static final String GUID = "GUID";
    private ResponseEntity<String> serviceResult;
    private String result = "{\"sessionId\":5742,\"message\":\"Success\",\"responseCode\":0}";
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(ecrcProperties.getGetNextInvoiceIdUri()).thenReturn("invoiceurl?%s");
    }

    @DisplayName("Success - ecrcService get NextInvoiceId")
    @Test
    public void testGetNextInvoiceIdSuccess() throws EcrcServiceException {
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any())).thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
        serviceResult = ecrcServices.getNextInvoiceId("CRCE", GUID);
        Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
        Assertions.assertEquals(result, serviceResult.getBody());
    }
}
