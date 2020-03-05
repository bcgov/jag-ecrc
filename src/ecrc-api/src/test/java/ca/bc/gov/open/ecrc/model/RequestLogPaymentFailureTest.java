package ca.bc.gov.open.ecrc.model;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for log payment failure request bean
 * 
 * @author sivakaruna
 *
 */
class RequestLogPaymentFailureTest {

	private final String expectedQueryString = "?"
			+ "OrgTicketNumber=orgTicketNumber"
			+ "&Service_Id=serviceId"
			+ "&Appl_Party_Id=applPartyId"
			+ "&Session_Id=sessionId"
			+ "&Invoice_Id=invoiceId"
			+ "&Service_Fee_Amount=serviceFeeAmount"
			+ "&BCEP_Error_Msg=bcepErrorMsg";

	@DisplayName("Success - logPaymentFailure request queryString")
	@Test
	public void generateQueryStringTest() {
		RequestLogPaymentFailure requestLogPaymentFailure = new RequestLogPaymentFailure();
		requestLogPaymentFailure.setApplPartyId("applPartyId");
		requestLogPaymentFailure.setBcepErrorMsg("bcepErrorMsg");
		requestLogPaymentFailure.setInvoiceId("invoiceId");
		requestLogPaymentFailure.setOrgTicketNumber("orgTicketNumber");
		requestLogPaymentFailure.setServiceFeeAmount("serviceFeeAmount");
		requestLogPaymentFailure.setServiceId("serviceId");
		requestLogPaymentFailure.setSessionId("sessionId");

		Assertions.assertEquals(requestLogPaymentFailure.getApplPartyId(), "applPartyId");
		Assertions.assertEquals(requestLogPaymentFailure.getBcepErrorMsg(), "bcepErrorMsg");
		Assertions.assertEquals(requestLogPaymentFailure.getInvoiceId(), "invoiceId");
		Assertions.assertEquals(requestLogPaymentFailure.getOrgTicketNumber(), "orgTicketNumber");
		Assertions.assertEquals(requestLogPaymentFailure.getServiceFeeAmount(), "serviceFeeAmount");
		Assertions.assertEquals(requestLogPaymentFailure.getServiceId(), "serviceId");
		Assertions.assertEquals(requestLogPaymentFailure.getSessionId(), "sessionId");

		Assertions.assertEquals(expectedQueryString, requestLogPaymentFailure.toQueryString());
	}

}
