package ca.bc.gov.open.ecrc.model;

/**
 * Object for requesting payment
 * 
 * @author sivakaruna
 *
 */
public class RequestPaymentService {

	private String transType;
	private String invoiceNumber;
	private String approvedPage;
	private String declinedPage;
	private String errorPage;
	private String totalItemsAmount;
	private String minutesToExpire;
	private String serviceIdRef1;
	private String partyIdRef2;
	private String requestGuid;

	public RequestPaymentService(String transType,
								 String invoiceNumber,
								 String approvedPage,
								 String declinedPage,
								 String errorPage,
								 String totalItemsAmount,
								 String minutesToExpire,
								 String serviceIdRef1,
								 String partyIdRef2,
								 String requestGuid) {
		this.transType = transType;
		this.invoiceNumber = invoiceNumber;
		this.approvedPage = approvedPage;
		this.declinedPage = declinedPage;
		this.errorPage = errorPage;
		this.totalItemsAmount = totalItemsAmount;
		this.minutesToExpire = minutesToExpire;
		this.serviceIdRef1 = serviceIdRef1;
		this.partyIdRef2 = partyIdRef2;
		this.requestGuid = requestGuid;
	}

	public RequestPaymentService() {}

	public String getTransType() {
		return transType;
	}

	public void setTransType(String transType) {
		this.transType = transType;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public String getApprovedPage() {
		return approvedPage;
	}

	public void setApprovedPage(String approvedPage) {
		this.approvedPage = approvedPage;
	}

	public String getDeclinedPage() {
		return declinedPage;
	}

	public void setDeclinedPage(String declinedPage) {
		this.declinedPage = declinedPage;
	}

	public String getErrorPage() {
		return errorPage;
	}

	public void setErrorPage(String errorPage) {
		this.errorPage = errorPage;
	}

	public String getTotalItemsAmount() {
		return totalItemsAmount;
	}

	public void setTotalItemsAmount(String totalItemsAmount) {
		this.totalItemsAmount = totalItemsAmount;
	}

	public String getMinutesToExpire() {
		return minutesToExpire;
	}

	public void setMinutesToExpire(String minutesToExpire) {
		this.minutesToExpire = minutesToExpire;
	}

	public String getServiceIdRef1() {
		return serviceIdRef1;
	}

	public void setServiceIdRef1(String serviceIdRef1) {
		this.serviceIdRef1 = serviceIdRef1;
	}

	public String getPartyIdRef2() {
		return partyIdRef2;
	}

	public void setPartyIdRef2(String partyIdRef2) {
		this.partyIdRef2 = partyIdRef2;
	}

	public String getRequestGuid() { return requestGuid; }

	public void setRequestGuid(String requestGuid) { this.requestGuid = requestGuid; }

	public String toQueryString() {
        return 	"?transType=" + transType +
        		"&invoiceNumber=" + invoiceNumber +
        		"&approvedPage=" + approvedPage +
        		"&declinedPage=" + declinedPage +
        		"&errorPage=" + errorPage +
        		"&totalItemsAmount=" + totalItemsAmount +
        		"&minutesToExpire=" + minutesToExpire +
        		"&ref1=" + serviceIdRef1 +
        		"&ref2=" + partyIdRef2;
    }
}
