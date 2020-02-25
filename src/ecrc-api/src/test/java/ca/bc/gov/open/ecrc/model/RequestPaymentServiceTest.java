package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for payment request bean
 * 
 * @author sivakaruna
 *
 */
class RequestPaymentServiceTest {

	private final String expectedQueryString = "merchant_id=123"
			+ "&trnType=P"
			+ "&trnOrderNumber=invoiceNumber"
			+ "&errorPage=http://return.com"
			+ "&declinedPage=http://return.com"
			+ "&approvedPage=http://return.com"
			+ "&ref1=serviceIdRef1"
			+ "&ref2=partyIdRef2"
			+ "&trnAmount=123.00";

	@DisplayName("Success - payment request queryString")
	@Test
	public void generateQueryStringTest() {
		
		RequestPaymentService paymentInfo = new RequestPaymentService();

		paymentInfo.setInvoiceNumber("invoiceNumber");
		paymentInfo.setPartyIdRef2("partyIdRef2");
		paymentInfo.setServiceIdRef1("serviceIdRef1");
		paymentInfo.setTotalItemsAmount("123");
		paymentInfo.setMerchantId("123");
		paymentInfo.setReturnUri("http://return.com");

		Assertions.assertEquals(expectedQueryString, paymentInfo.toQueryString());
	}
}
