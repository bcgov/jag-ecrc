package ca.bc.gov.open.ecrc.model;

public class ResponseServiceDetails {
    private String paymentUrl;
    private String serviceId;
    private String partyId;
    private String sessionId;
    private String invoiceId;
    private String serviceFeeAmount;

    public String getPaymentUrl() { return paymentUrl; }

    public void setPaymentUrl(String paymentUrl) { this.paymentUrl = paymentUrl; }

    public String getServiceId() { return serviceId; }

    public void setServiceId(String serviceId) { this.serviceId = serviceId; }

    public String getPartyId() { return partyId; }

    public void setPartyId(String partyId) { this.partyId = partyId; }

    public String getSessionId() { return sessionId; }

    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getInvoiceId() { return invoiceId; }

    public void setInvoiceId(String invoiceId) { this.invoiceId = invoiceId; }

    public String getServiceFeeAmount() { return serviceFeeAmount; }

    public void setServiceFeeAmount(String serviceFeeAmount) { this.serviceFeeAmount = serviceFeeAmount; }

}
