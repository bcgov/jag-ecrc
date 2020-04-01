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

public class EcrcServicesImplGetServiceFeeAmountTest {
    private static final String GUID = "GUID";
    private final String result = "{\"serviceFeeAmount\":28,\"message\":\"Success\",\"responseCode\":0}";
    private ResponseEntity<String> serviceResult;
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(ecrcProperties.getGetServiceFeeAmountUri()).thenReturn("serviceFeeAmounturl?%s");
    }

    @DisplayName("Success - ecrcService get ServiceFeeAmount")
    @Test
    public void testGetServiceFeeAmount() throws EcrcServiceException {
        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any())).thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
        serviceResult = ecrcServices.getServiceFeeAmount("CRCE","SCHED", "SCOPE", GUID);
        Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
        Assertions.assertEquals(result, serviceResult.getBody());
    }
}
