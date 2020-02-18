package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
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

public class EcrcServicesImplUpdateServiceFinancialTxnTest {
    private ResponseEntity<String> serviceResult;
    private String result = "{\n" +
            "    \"message\": \"Data Updated\",\n" +
            "    \"responseCode\": 0\n" +
            "}";
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

    RequestUpdateServiceFinancialTxn requestUpdateServiceFinancialTxn;

    @BeforeEach
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        Mockito.when(ecrcProperties.getUpdateServiceFinancialTxnUri()).thenReturn("fintxnurl%s");

        requestUpdateServiceFinancialTxn = new RequestUpdateServiceFinancialTxn();
        requestUpdateServiceFinancialTxn.setOrgTicketNumber("CRCE");
        requestUpdateServiceFinancialTxn.setAppl_Party_Id("123");
        requestUpdateServiceFinancialTxn.setService_Id("123");
        requestUpdateServiceFinancialTxn.setcC_Authorization("111");
        requestUpdateServiceFinancialTxn.setPayment_Date("1/1/2000");
        requestUpdateServiceFinancialTxn.setPayor_Type_Cd("CD");
        requestUpdateServiceFinancialTxn.setPayment_Status_Cd("CD");
        requestUpdateServiceFinancialTxn.setSession_Id("111");
        requestUpdateServiceFinancialTxn.setInvoice_Id("111");
        requestUpdateServiceFinancialTxn.setTransaction_Id("111");
        requestUpdateServiceFinancialTxn.setTransaction_Amount("111");
    }

    @DisplayName("Success - ecrcService UpdateFinancialTxn")
    @Test
    public void testUpdateFinancialTxnResultSuccess() throws EcrcServiceException {

        Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any())).thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
        serviceResult = ecrcServices.updateServiceFinancialTxn(requestUpdateServiceFinancialTxn);
        Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
        Assertions.assertEquals(result, serviceResult.getBody());
    }

    @DisplayName("Error - ecrcService UpdateFinancialTxn")
    @Test
    public void testUpdateFinancialTxnResultError() throws EcrcServiceException {
        Assertions.assertThrows(NullPointerException.class,
                () -> {
                    ecrcServices.updateServiceFinancialTxn(null);
                });
    }
}
