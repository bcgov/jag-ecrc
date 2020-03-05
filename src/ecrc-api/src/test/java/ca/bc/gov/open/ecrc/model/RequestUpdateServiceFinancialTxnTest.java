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
        requestUpdateServiceFinancialTxn.setAppl_Party_Id("appl_Party_Id");
        requestUpdateServiceFinancialTxn.setService_Id("service_Id");
        requestUpdateServiceFinancialTxn.setcC_Authorization("cC_Authorization");
        requestUpdateServiceFinancialTxn.setPayment_Date("payment_Date");
        requestUpdateServiceFinancialTxn.setPayor_Type_Cd("payor_Type_Cd");
        requestUpdateServiceFinancialTxn.setPayment_Status_Cd("payment_Status_Cd");
        requestUpdateServiceFinancialTxn.setSession_Id("session_Id");
        requestUpdateServiceFinancialTxn.setInvoice_Id("invoice_Id");
        requestUpdateServiceFinancialTxn.setTransaction_Id("transaction_Id");
        requestUpdateServiceFinancialTxn.setTransaction_Amount("transaction_Amount");
        
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getOrgTicketNumber(), "orgTicketNumber");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getAppl_Party_Id(), "appl_Party_Id");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getService_Id(), "service_Id");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getcC_Authorization(), "cC_Authorization");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getPayment_Date(), "payment_Date");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getPayor_Type_Cd(), "payor_Type_Cd");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getPayment_Status_Cd(), "payment_Status_Cd");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getSession_Id(), "session_Id");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getInvoice_Id(), "invoice_Id");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getTransaction_Id(), "transaction_Id");
		Assertions.assertEquals(requestUpdateServiceFinancialTxn.getTransaction_Amount(), "transaction_Amount");

        Assertions.assertEquals(expectedQueryString, requestUpdateServiceFinancialTxn.toQueryString());
    }
}
