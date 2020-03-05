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

	private final String expectedQueryString = "?"
			+ "transType=transType"
			+ "&invoiceNumber=invoiceNumber"
			+ "&approvedPage=approvedPage"
			+ "&declinedPage=declinedPage"
			+ "&errorPage=errorPage"
			+ "&totalItemsAmount=totalItemsAmount"
			+ "&minutesToExpire=minutesToExpire"
			+ "&ref1=serviceIdRef1"
			+ "&ref2=partyIdRef2";

	@DisplayName("Success - payment request queryString")
	@Test
	public void generateQueryStringTest() {
		RequestPaymentService paymentInfo = new RequestPaymentService();

		paymentInfo.setApprovedPage("approvedPage");
		paymentInfo.setDeclinedPage("declinedPage");
		paymentInfo.setErrorPage("errorPage");
		paymentInfo.setInvoiceNumber("invoiceNumber");
		paymentInfo.setMinutesToExpire("minutesToExpire");
		paymentInfo.setPartyIdRef2("partyIdRef2");
		paymentInfo.setServiceIdRef1("serviceIdRef1");
		paymentInfo.setTotalItemsAmount("totalItemsAmount");
		paymentInfo.setTransType("transType");
		
		Assertions.assertEquals(paymentInfo.getApprovedPage(), "approvedPage");
		Assertions.assertEquals(paymentInfo.getDeclinedPage(), "declinedPage");
		Assertions.assertEquals(paymentInfo.getErrorPage(), "errorPage");
		Assertions.assertEquals(paymentInfo.getInvoiceNumber(), "invoiceNumber");
		Assertions.assertEquals(paymentInfo.getMinutesToExpire(), "minutesToExpire");
		Assertions.assertEquals(paymentInfo.getPartyIdRef2(), "partyIdRef2");
		Assertions.assertEquals(paymentInfo.getServiceIdRef1(), "serviceIdRef1");
		Assertions.assertEquals(paymentInfo.getTotalItemsAmount(), "totalItemsAmount");
		Assertions.assertEquals(paymentInfo.getTransType(), "transType");

		Assertions.assertEquals(expectedQueryString, paymentInfo.toQueryString());
	}
}
