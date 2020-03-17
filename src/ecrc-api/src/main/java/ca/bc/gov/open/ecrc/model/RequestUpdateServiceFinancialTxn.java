package ca.bc.gov.open.ecrc.model;

public class RequestUpdateServiceFinancialTxn {
    private String orgTicketNumber;
    private String appl_Party_Id;
    private String service_Id;
    private String cC_Authorization;
    private String payment_Date;
    private String payor_Type_Cd;
    private String payment_Status_Cd;
    private String session_Id;
    private String invoice_Id;
    private String transaction_Id;
    private String transaction_Amount;
    private String requestGuid;
    
    public String getOrgTicketNumber() {
        return orgTicketNumber;
    }

    public void setOrgTicketNumber(String orgTicketNumber) {
        this.orgTicketNumber = orgTicketNumber;
    }

    public String getAppl_Party_Id() {
        return appl_Party_Id;
    }

    public void setAppl_Party_Id(String appl_Party_Id) {
        this.appl_Party_Id = appl_Party_Id;
    }

    public String getService_Id() {
        return service_Id;
    }

    public void setService_Id(String service_Id) {
        this.service_Id = service_Id;
    }

    public String getcC_Authorization() {
        return cC_Authorization;
    }

    public void setcC_Authorization(String cC_Authorization) {
        this.cC_Authorization = cC_Authorization;
    }

    public String getPayment_Date() {
        return payment_Date;
    }

    public void setPayment_Date(String payment_Date) {
        this.payment_Date = payment_Date;
    }

    public String getPayor_Type_Cd() {
        return payor_Type_Cd;
    }

    public void setPayor_Type_Cd(String payor_Type_Cd) {
        this.payor_Type_Cd = payor_Type_Cd;
    }

    public String getPayment_Status_Cd() {
        return payment_Status_Cd;
    }

    public void setPayment_Status_Cd(String payment_Status_Cd) {
        this.payment_Status_Cd = payment_Status_Cd;
    }

    public String getSession_Id() {
        return session_Id;
    }

    public void setSession_Id(String session_Id) {
        this.session_Id = session_Id;
    }

    public String getInvoice_Id() {
        return invoice_Id;
    }

    public void setInvoice_Id(String invoice_Id) {
        this.invoice_Id = invoice_Id;
    }

    public String getTransaction_Id() {
        return transaction_Id;
    }

    public void setTransaction_Id(String transaction_Id) {
        this.transaction_Id = transaction_Id;
    }

    public String getTransaction_Amount() {
        return transaction_Amount;
    }

    public void setTransaction_Amount(String transaction_Amount) {
        this.transaction_Amount = transaction_Amount;
    }

    public String getRequestGuid() { return requestGuid; }

    public void setRequestGuid(String requestGuid) { this.requestGuid = requestGuid; }

    public String toQueryString() {
        return "?" +
                "OrgTicketNumber=" + orgTicketNumber +
                "&Appl_Party_Id=" + appl_Party_Id +
                "&Service_Id=" + service_Id +
                "&CC_Authorization=" + cC_Authorization +
                "&Payment_Date=" + payment_Date +
                "&Payor_Type_Cd=" + payor_Type_Cd +
                "&Payment_Status_Cd=" + payment_Status_Cd +
                "&Session_Id=" + session_Id +
                "&Invoice_Id=" + invoice_Id +
                "&Transaction_Id=" + transaction_Id +
                "&Transaction_Amount=" + transaction_Amount;
    }
}
