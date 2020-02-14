package ca.bc.gov.open.ecrc.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

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

	private String updateServiceFinancialTxnUri;

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

}
