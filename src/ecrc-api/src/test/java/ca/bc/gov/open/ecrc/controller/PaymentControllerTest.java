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
import ca.bc.gov.open.ecrc.model.RequestPaymentService;
import ca.bc.gov.open.ecrc.service.EcrcPaymentService;

/**
 * Tests for payment controller
 * 
 * @author sivakaruna
 *
 */
class PaymentControllerTest {

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcPaymentService paymentService;

	@InjectMocks
	PaymentController paymentController = new PaymentController();

	@DisplayName("Success - payment controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		RequestPaymentService request = new RequestPaymentService();
		String responseStr = "{" + "\"respMsg\": \"success\"," + "\"respCode\": \"0\","
				+ "\"respValue\": \"https://web.na.bambora.com/scripts/payment/payment.asp"
				+ "?merchant_id=changeme&trnType=P&trnOrderNumber=12&errorPage=abe&declinedPage=abd"
				+ "&approvedPage=abc&ref1=abc&ref2=abc&trnAmount=123.00"
				+ "&hashValue=BB85DE3C6E7288168420B0DA3E692A37&hashExpiry=202002241118\"}";
		when(paymentService.createPaymentUrl(request)).thenReturn(new ResponseEntity<String>(responseStr, HttpStatus.OK));
		ResponseEntity<String> response = paymentController.createPaymentUrl(request);
		Assert.assertEquals(responseStr, response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - payment controller")
	@Test
	void testFailure() throws EcrcServiceException {
		RequestPaymentService request = new RequestPaymentService();
		String responseStr = String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode());
		when(paymentService.createPaymentUrl(request)).thenReturn(new ResponseEntity<>(responseStr, HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = paymentController.createPaymentUrl(request);
		Assertions.assertEquals(responseStr, response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - payment controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestPaymentService request = new RequestPaymentService();
		String responseStr = String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
				EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode());
		when(paymentService.createPaymentUrl(request))
				.thenReturn(new ResponseEntity<>(responseStr, HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = paymentController.createPaymentUrl(request);
		Assertions.assertEquals(responseStr, response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

}
