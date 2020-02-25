package ca.bc.gov.open.ecrc.model;

import ca.bc.gov.open.ecrc.constants.PaymentServiceConstants;

/**
 * Object for requesting payment
 * 
 * @author sivakaruna
 *
 */
public class RequestPaymentService {

	private String invoiceNumber;
	private String totalItemsAmount;
	private String serviceIdRef1;
	private String partyIdRef2;
	private String merchantId;
	private String returnUri;

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public String getTotalItemsAmount() {
		return totalItemsAmount;
	}

	public void setTotalItemsAmount(String totalItemsAmount) {
		this.totalItemsAmount = totalItemsAmount;
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

	public String getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(String merchantId) {
		this.merchantId = merchantId;
	}

	public String getReturnUri() {
		return returnUri;
	}

	public void setReturnUri(String returnUri) {
		this.returnUri = returnUri;
	}

	public String toQueryString() {

		return PaymentServiceConstants.BAMBORA_PARAM_MERCHANT_ID + "=" + merchantId 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_TRANS_TYPE + "=" + PaymentServiceConstants.BamboraTransType.P
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_TRANS_ORDER_NUMBER + "=" + invoiceNumber 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_ERROR_PAGE + "=" + returnUri 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_DECL_PAGE + "=" + returnUri 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_APPV_PAGE + "=" + returnUri 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_REF1 + "=" + serviceIdRef1 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_REF2 + "=" + partyIdRef2 
				+ "&" + PaymentServiceConstants.BAMBORA_PARAM_TRANS_AMOUNT + "="
				+ String.format(PaymentServiceConstants.PAYMENT_AMOUNT_FORMAT, Double.parseDouble(totalItemsAmount));
		
	}
}
