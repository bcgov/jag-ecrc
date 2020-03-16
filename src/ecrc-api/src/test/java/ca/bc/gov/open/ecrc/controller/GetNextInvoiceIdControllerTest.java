package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;

class GetNextInvoiceIdControllerTest {

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	GetNextInvoiceIdController getNextInvoiceIdController = new GetNextInvoiceIdController();

	@DisplayName("Success - getNextInvoiceIdController controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		when(ecrcServices.getNextInvoiceId("request")).thenReturn(new ResponseEntity<String>("success", HttpStatus.OK));
		ResponseEntity<String> response = getNextInvoiceIdController.getNextInvoiceId("request", "SOMEUUID");
		Assert.assertEquals("success", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - getNextInvoiceIdController controller")
	@Test
	void testFailure() throws EcrcServiceException {
		when(ecrcServices.getNextInvoiceId("request")).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = getNextInvoiceIdController.getNextInvoiceId("request", "SOMEUUID");
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - getNextInvoiceIdController controller")
	@Test
	void testError() throws EcrcServiceException {
		when(ecrcServices.getNextInvoiceId("request")).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = getNextInvoiceIdController.getNextInvoiceId("request", "SOMEUUID");
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

}
