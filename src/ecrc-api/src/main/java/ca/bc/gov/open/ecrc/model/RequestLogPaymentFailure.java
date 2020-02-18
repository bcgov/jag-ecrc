package ca.bc.gov.open.ecrc.model;

/**
 * Object for request to log payment failure 
 *  
 * @author sivakaruna
 *
 */
public class RequestLogPaymentFailure {

	private String orgTicketNumber;
	private String serviceId;
	private String applPartyId;
	private String sessionId;
	private String invoiceId;
	private String serviceFeeAmount;
	private String bcepErrorMsg;

	public String getOrgTicketNumber() {
		return orgTicketNumber;
	}

	public void setOrgTicketNumber(String orgTicketNumber) {
		this.orgTicketNumber = orgTicketNumber;
	}

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	public String getApplPartyId() {
		return applPartyId;
	}

	public void setApplPartyId(String applPartyId) {
		this.applPartyId = applPartyId;
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

	public String getServiceFeeAmount() {
		return serviceFeeAmount;
	}

	public void setServiceFeeAmount(String serviceFeeAmount) {
		this.serviceFeeAmount = serviceFeeAmount;
	}

	public String getBcepErrorMsg() {
		return bcepErrorMsg;
	}

	public void setBcepErrorMsg(String bcepErrorMsg) {
		this.bcepErrorMsg = bcepErrorMsg;
	}
	
	public String toQueryString() {
        return 	"?OrgTicketNumber=" + orgTicketNumber +
        		"&Service_Id=" + serviceId +
        		"&Appl_Party_Id=" + applPartyId +
        		"&Session_Id=" + sessionId +
        		"&Invoice_Id=" + invoiceId +
        		"&Service_Fee_Amount=" + serviceFeeAmount +
        		"&BCEP_Error_Msg=" + bcepErrorMsg;
    }
}
