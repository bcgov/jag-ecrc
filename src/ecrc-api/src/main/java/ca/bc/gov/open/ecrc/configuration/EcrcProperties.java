package ca.bc.gov.open.ecrc.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 *
 * ECRC properties file object. 
 *
 *  @See EcrcServicesImpl for example usage. 
 *
 * @author shaunmillargov
 *
 */
@ConfigurationProperties(prefix = "ecrc")
public class EcrcProperties {

	private String baseUrl;
	private String username;
	private String password;
	private String getProvincesListUri;
	private String doAuthenticateUserUri;
	private String getNextSessionIdUri;
	private String createNewCRCServiceUri;
    private String getServiceFeeAmountUri;
	private String createApplicantUri;
	private String logPaymentFailureUri;
	private String getNextInvoiceIdUri;
	private String updateServiceFinancialTxnUri;

	@Value("#{'${ecrc.whitelist}'.split(',')}")
	private List<String> whiteList;

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGetProvincesListUri() {
		return getProvincesListUri;
	}

	public void setGetProvincesListUri(String getProvincesListUri) {
		this.getProvincesListUri = getProvincesListUri;
	}

	public String getGetNextSessionIdUri() {
		return getNextSessionIdUri;
	}

	public void setGetNextSessionIdUri(String getNextSessionIdUri) { this.getNextSessionIdUri = getNextSessionIdUri; }

	public String getDoAuthenticateUserUri() { return doAuthenticateUserUri; }

	public void setDoAuthenticateUserUri(String doAuthenticateUserUri) { this.doAuthenticateUserUri = doAuthenticateUserUri; }

	public String getCreateNewCRCServiceUri() { return createNewCRCServiceUri; }

	public void setCreateNewCRCServiceUri(String createNewCRCServiceUri) { this.createNewCRCServiceUri = createNewCRCServiceUri; }

	public String getUpdateServiceFinancialTxnUri() { return updateServiceFinancialTxnUri; }

	public void setUpdateServiceFinancialTxnUri(String updateServiceFinancialTxnUri) { this.updateServiceFinancialTxnUri = updateServiceFinancialTxnUri; }

	public String getGetServiceFeeAmountUri() { return getServiceFeeAmountUri; }

	public void setGetServiceFeeAmountUri(String getServiceFeeAmountUri) { this.getServiceFeeAmountUri = getServiceFeeAmountUri; }

	public String getCreateApplicantUri() {
		return createApplicantUri;
	}

	public void setCreateApplicantUri(String createApplicantUri) {
		this.createApplicantUri = createApplicantUri;
	}

	public String getLogPaymentFailureUri() {
		return logPaymentFailureUri;
	}

	public void setLogPaymentFailureUri(String logPaymentFailureUri) {
		this.logPaymentFailureUri = logPaymentFailureUri;
	}

	public String getGetNextInvoiceIdUri() {
		return getNextInvoiceIdUri;
	}

	public void setGetNextInvoiceIdUri(String getNextInvoiceIdUri) {
		this.getNextInvoiceIdUri = getNextInvoiceIdUri;
	}

	public List<String> getWhiteList() { return whiteList; }

	public void setWhiteList(List<String> whiteList) { this.whiteList = whiteList; }
}
