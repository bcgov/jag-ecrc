package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RequestUpdateServiceFinancialTxnTest {
    private final String expectedQueryString = "?" +
            "OrgTicketNumber=orgTicketNumber" +
            "&Appl_Party_Id=appl_Party_Id" +
            "&Service_Id=service_Id" +
            "&CC_Authorization=cC_Authorization" +
            "&Payment_Date=payment_Date" +
            "&Payor_Type_Cd=payor_Type_Cd" +
            "&Payment_Status_Cd=payment_Status_Cd" +
            "&Session_Id=session_Id" +
            "&Invoice_Id=invoice_Id" +
            "&Transaction_Id=transaction_Id" +
            "&Transaction_Amount=transaction_Amount";
    @Test
    public void generateQueryStringTest() {
        RequestUpdateServiceFinancialTxn requestUpdateServiceFinancialTxn = new RequestUpdateServiceFinancialTxn();
        requestUpdateServiceFinancialTxn.setOrgTicketNumber("orgTicketNumber");
        requestUpdateServiceFinancialTxn.setApplPartyId("appl_Party_Id");
        requestUpdateServiceFinancialTxn.setServiceId("service_Id");
        requestUpdateServiceFinancialTxn.setcCAuthorization("cC_Authorization");
        requestUpdateServiceFinancialTxn.setPaymentDate("payment_Date");
        requestUpdateServiceFinancialTxn.setPayorTypeCd("payor_Type_Cd");
        requestUpdateServiceFinancialTxn.setPaymentStatusCd("payment_Status_Cd");
        requestUpdateServiceFinancialTxn.setSessionId("session_Id");
        requestUpdateServiceFinancialTxn.setInvoiceId("invoice_Id");
        requestUpdateServiceFinancialTxn.setTransactionId("transaction_Id");
        requestUpdateServiceFinancialTxn.setTransactionAmount("transaction_Amount");
        requestUpdateServiceFinancialTxn.setRequestGuid("requestGuid");
        
		Assertions.assertEquals("orgTicketNumber", requestUpdateServiceFinancialTxn.getOrgTicketNumber());
		Assertions.assertEquals("appl_Party_Id", requestUpdateServiceFinancialTxn.getApplPartyId());
		Assertions.assertEquals("service_Id", requestUpdateServiceFinancialTxn.getServiceId());
		Assertions.assertEquals("cC_Authorization", requestUpdateServiceFinancialTxn.getcCAuthorization());
		Assertions.assertEquals("payment_Date", requestUpdateServiceFinancialTxn.getPaymentDate());
		Assertions.assertEquals("payor_Type_Cd", requestUpdateServiceFinancialTxn.getPayorTypeCd());
		Assertions.assertEquals("payment_Status_Cd", requestUpdateServiceFinancialTxn.getPaymentStatusCd());
		Assertions.assertEquals("session_Id", requestUpdateServiceFinancialTxn.getSessionId());
		Assertions.assertEquals("invoice_Id", requestUpdateServiceFinancialTxn.getInvoiceId());
		Assertions.assertEquals("transaction_Id", requestUpdateServiceFinancialTxn.getTransactionId());
		Assertions.assertEquals("transaction_Amount", requestUpdateServiceFinancialTxn.getTransactionAmount());

        Assertions.assertEquals(expectedQueryString, requestUpdateServiceFinancialTxn.toQueryString());
    }
}
