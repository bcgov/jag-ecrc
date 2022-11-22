package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
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

public class UpdateServiceFinancialTxnControllerTest {
    @InjectMocks
    UpdateServiceFinancialTxnController updateServiceFinancialTxnController;

    @Mock
    EcrcServicesImpl ecrcServices;

    RequestUpdateServiceFinancialTxn updateServiceFinancialTxn;

    @BeforeEach
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
    }
    @DisplayName("Success - updateServiceFinancialTxn controller")
    @Test
    public void testSuccessfulCreate() throws EcrcServiceException {
        updateServiceFinancialTxn = new RequestUpdateServiceFinancialTxn();
        Mockito.when(ecrcServices.updateServiceFinancialTxn(updateServiceFinancialTxn)).thenReturn(new ResponseEntity<>("SOMESTRING", HttpStatus.OK));
        ResponseEntity<String> result = updateServiceFinancialTxnController.updateServiceFinancialTxn(updateServiceFinancialTxn);
        Assertions.assertEquals("SOMESTRING", result.getBody());
        Assertions.assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @DisplayName("Failure - updateServiceFinancialTxn controller")
    @Test
    public void testNotFoundValidOrg() throws EcrcServiceException {
        updateServiceFinancialTxn = new RequestUpdateServiceFinancialTxn();
        Mockito.when(ecrcServices.updateServiceFinancialTxn(updateServiceFinancialTxn)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.NOT_FOUND));
        ResponseEntity<String> result = updateServiceFinancialTxnController.updateServiceFinancialTxn(updateServiceFinancialTxn);
        Assertions.assertEquals(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), result.getBody());
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
    }

    @DisplayName("Error - updateServiceFinancialTxn controller")
    @Test
    public void testServiceExceptionValidOrg() throws EcrcServiceException {
        updateServiceFinancialTxn = new RequestUpdateServiceFinancialTxn();
        Mockito.when(ecrcServices.updateServiceFinancialTxn(updateServiceFinancialTxn)).thenReturn(new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()), HttpStatus.BAD_REQUEST));
        ResponseEntity<String> result = updateServiceFinancialTxnController.updateServiceFinancialTxn(updateServiceFinancialTxn);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }
    @DisplayName("Exception - updateServiceFinancialTxn controller")
    @Test
    void testException() throws EcrcServiceException {
        updateServiceFinancialTxn = new RequestUpdateServiceFinancialTxn();
        when(ecrcServices.updateServiceFinancialTxn(updateServiceFinancialTxn)).thenThrow(new EcrcServiceException("FAIL"));
        ResponseEntity<String> response =  updateServiceFinancialTxnController.updateServiceFinancialTxn(updateServiceFinancialTxn);
        Assertions.assertEquals(
                String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                        EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
                response.getBody());
        Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
