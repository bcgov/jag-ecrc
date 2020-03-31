package ca.bc.gov.open.ecrc.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	private String serverPort; 

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
	
	//CORS properties
	private String corsMapping;
	private String corsAllowedOrigins;
	
	//OAUTH Properties
	private String oauthIdp;
	private String oauthClientId;
	private String oauthSecret;
	private String oauthScope;
	private String oauthReturnUri;
	private int oauthJwtExpiry;
	private String oauthTokenPath;
	private String oauthUserinfoPath;
	private String oauthAuthorizePath;
	private String oauthWellKnown;
	private String oauthPERSecret;

	// JWT properties
	private String jwtHeader;
	private String jwtPrefix;
	private String jwtSecret;
	private String jwtRole;
	private String jwtAuthorizedRole;

	@Value("#{'${ecrc.whitelist}'.split(',')}")
	private List<String> whiteList;
	
	private Map<String, String> links = new HashMap<>();
	
	//Payment properties
	private String paymentUrl;
	private String getSinglePaymentUri;
	private String paymentUsername;
	private String paymentPassword;

	public String getServerPort() {
		return serverPort;
	}

	public void setServerPort(String serverPort) {
		this.serverPort = serverPort;
	}

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

	public String getCorsMapping() {
		return corsMapping;
	}

	public void setCorsMapping(String corsMapping) {
		this.corsMapping = corsMapping;
	}

	public String getCorsAllowedOrigins() {
		return corsAllowedOrigins;
	}

	public void setCorsAllowedOrigins(String corsAllowedOrigins) {
		this.corsAllowedOrigins = corsAllowedOrigins;
	}

	public List<String> getWhiteList() { return whiteList; }

	public void setWhiteList(List<String> whiteList) { this.whiteList = whiteList; }

	public Map<String, String> getLinks() {
		return links;
	}

	public void setLinks(Map<String, String> links) {
		this.links = links;
	}


  public String getJwtHeader() { return jwtHeader; }

  public void setJwtHeader(String jwtHeader) {  this.jwtHeader = jwtHeader; }

  public String getJwtPrefix() { return jwtPrefix; }

  public void setJwtPrefix(String jwtPrefix) { this.jwtPrefix = jwtPrefix; }

  public String getJwtSecret() { return jwtSecret;  }

  public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }

  public String getJwtRole() { return jwtRole; }

  public void setJwtRole(String jwtRole) { this.jwtRole = jwtRole; }
	
	public String getJwtAuthorizedRole() {
		return jwtAuthorizedRole;
	}

	public void setJwtAuthorizedRole(String jwtAuthorizedRole) {
		this.jwtAuthorizedRole = jwtAuthorizedRole;
	}

	public String getPaymentUrl() {
		return paymentUrl;
	}

	public void setPaymentUrl(String paymentUrl) {
		this.paymentUrl = paymentUrl;
	}

	public String getGetSinglePaymentUri() {
		return getSinglePaymentUri;
	}

	public void setGetSinglePaymentUri(String getSinglePaymentUri) {
		this.getSinglePaymentUri = getSinglePaymentUri;
	}

	public String getPaymentUsername() {
		return paymentUsername;
	}

	public void setPaymentUsername(String paymentUsername) {
		this.paymentUsername = paymentUsername;
	}

	public String getPaymentPassword() {
		return paymentPassword;
	}

	public void setPaymentPassword(String paymentPassword) {
		this.paymentPassword = paymentPassword;
  }

	public String getOauthIdp() {
		return oauthIdp;
	}

	public void setOauthIdp(String oauthIdp) {
		this.oauthIdp = oauthIdp;
	}

	public String getOauthClientId() {
		return oauthClientId;
	}

	public void setOauthClientId(String oauthClientId) {
		this.oauthClientId = oauthClientId;
	}

	public String getOauthSecret() {
		return oauthSecret;
	}

	public void setOauthSecret(String oauthSecret) {
		this.oauthSecret = oauthSecret;
	}

	public String getOauthScope() {
		return oauthScope;
	}

	public void setOauthScope(String oauthScope) {
		this.oauthScope = oauthScope;
	}

	public String getOauthReturnUri() {
		return oauthReturnUri;
	}

	public void setOauthReturnUri(String oauthReturnUri) {
		this.oauthReturnUri = oauthReturnUri;
	}

	public int getOauthJwtExpiry() {
		return oauthJwtExpiry;
	}

	public void setOauthJwtExpiry(String oautJwtExpiry) {
		this.oauthJwtExpiry = Integer.parseInt(oautJwtExpiry);
	}

	public String getOauthTokenPath() { return oauthTokenPath; }

	public void setOauthTokenPath(String oauthTokenPath) { this.oauthTokenPath = oauthTokenPath; }

	public String getOauthUserinfoPath() { return oauthUserinfoPath; }

	public void setOauthUserinfoPath(String oauthUserinfoPath) { this.oauthUserinfoPath = oauthUserinfoPath; }

	public String getOauthAuthorizePath() { return oauthAuthorizePath; }

	public void setOauthAuthorizePath(String oauthAuthorizePath) { this.oauthAuthorizePath = oauthAuthorizePath; }
	
	public String getOauthWellKnown() {
		return oauthWellKnown;
	}

	public void setOauthWellKnown(String oauthWellKnown) {
		this.oauthWellKnown = oauthWellKnown;
	}

	public String getOauthPERSecret() {
		return oauthPERSecret;
	}

	public void setOauthPERSecret(String oauthPERSecret) {
		this.oauthPERSecret = oauthPERSecret;
	}

}
