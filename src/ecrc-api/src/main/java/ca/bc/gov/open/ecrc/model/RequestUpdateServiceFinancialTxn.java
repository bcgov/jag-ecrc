package ca.bc.gov.open.ecrc.model;

public class RequestUpdateServiceFinancialTxn {
    private String orgTicketNumber;
    private String applPartyId;
    private String serviceId;
    private String cCAuthorization;
    private String paymentDate;
    private String payorTypeCd;
    private String paymentStatusCd;
    private String sessionId;
    private String invoiceId;
    private String transactionId;
    private String transactionAmount;
    private String requestGuid;
    
    public String getOrgTicketNumber() {
        return orgTicketNumber;
    }

    public void setOrgTicketNumber(String orgTicketNumber) {
        this.orgTicketNumber = orgTicketNumber;
    }

    public String getApplPartyId() {
        return applPartyId;
    }

    public void setApplPartyId(String applPartyId) {
        this.applPartyId = applPartyId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getcCAuthorization() {
        return cCAuthorization;
    }

    public void setcCAuthorization(String cCAuthorization) {
        this.cCAuthorization = cCAuthorization;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPayorTypeCd() {
        return payorTypeCd;
    }

    public void setPayorTypeCd(String payorTypeCd) {
        this.payorTypeCd = payorTypeCd;
    }

    public String getPaymentStatusCd() {
        return paymentStatusCd;
    }

    public void setPaymentStatusCd(String paymentStatusCd) {
        this.paymentStatusCd = paymentStatusCd;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(String transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getRequestGuid() { return requestGuid; }

    public void setRequestGuid(String requestGuid) { this.requestGuid = requestGuid; }

    public String toQueryString() {
        return "?" +
                "OrgTicketNumber=" + orgTicketNumber +
                "&Appl_Party_Id=" + applPartyId +
                "&Service_Id=" + serviceId +
                "&CC_Authorization=" + cCAuthorization +
                "&Payment_Date=" + paymentDate +
                "&Payor_Type_Cd=" + payorTypeCd +
                "&Payment_Status_Cd=" + paymentStatusCd +
                "&Session_Id=" + sessionId +
                "&Invoice_Id=" + invoiceId +
                "&Transaction_Id=" + transactionId +
                "&Transaction_Amount=" + transactionAmount;
    }
}
