package ca.bc.gov.open.oauth.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;


/**
 *
 * BCSC OAUTH properties file object.
 *
 * @See EcrcServicesImpl for example usage.
 *
 * @author sivakaruna
 *
 */
@ConfigurationProperties(prefix = "oauth")
public class OauthProperties {
	
	private String serverPort;

	// CORS properties
	private String corsMapping;
	private String corsAllowedOrigins;

	// OAUTH Properties
	private String idp;
	private String clientId;
	private String secret;
	private String scope;
	private String returnUri;
	private int jwtExpiry;
	private String tokenPath;
	private String userinfoPath;
	private String authorizePath;
	private String wellKnown;
	private String perSecret;
	private int bcscTimeout;

	// JWT properties
	private String jwtHeader;
	private String jwtPrefix;
	private String jwtSecret;
	private String jwtRole;
	private String jwtAuthorizedRole;

	public String getServerPort() {
		return serverPort;
	}
	public void setServerPort(String serverPort) {
		this.serverPort = serverPort;
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
	public String getIdp() {
		return idp;
	}
	public void setIdp(String idp) {
		this.idp = idp;
	}
	public String getClientId() {
		return clientId;
	}
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	public String getSecret() {
		return secret;
	}
	public void setSecret(String secret) {
		this.secret = secret;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public String getReturnUri() {
		return returnUri;
	}
	public void setReturnUri(String returnUri) {
		this.returnUri = returnUri;
	}
	public int getJwtExpiry() {
		return jwtExpiry;
	}
	public void setJwtExpiry(int jwtExpiry) {
		this.jwtExpiry = jwtExpiry;
	}
	public String getTokenPath() {
		return tokenPath;
	}
	public void setTokenPath(String tokenPath) {
		this.tokenPath = tokenPath;
	}
	public String getUserinfoPath() {
		return userinfoPath;
	}
	public void setUserinfoPath(String userinfoPath) {
		this.userinfoPath = userinfoPath;
	}
	public String getAuthorizePath() {
		return authorizePath;
	}
	public void setAuthorizePath(String authorizePath) {
		this.authorizePath = authorizePath;
	}
	public String getWellKnown() {
		return wellKnown;
	}
	public void setWellKnown(String wellKnown) {
		this.wellKnown = wellKnown;
	}
	public String getPerSecret() {
		return perSecret;
	}
	public void setPerSecret(String perSecret) {
		this.perSecret = perSecret;
	}
	public int getBcscTimeout() {
		return bcscTimeout;
	}
	public void setBcscTimeout(int bcscTimeout) {
		this.bcscTimeout = bcscTimeout;
	}
	public String getJwtHeader() {
		return jwtHeader;
	}
	public void setJwtHeader(String jwtHeader) {
		this.jwtHeader = jwtHeader;
	}
	public String getJwtPrefix() {
		return jwtPrefix;
	}
	public void setJwtPrefix(String jwtPrefix) {
		this.jwtPrefix = jwtPrefix;
	}
	public String getJwtSecret() {
		return jwtSecret;
	}
	public void setJwtSecret(String jwtSecret) {
		this.jwtSecret = jwtSecret;
	}
	public String getJwtRole() {
		return jwtRole;
	}
	public void setJwtRole(String jwtRole) {
		this.jwtRole = jwtRole;
	}
	public String getJwtAuthorizedRole() {
		return jwtAuthorizedRole;
	}
	public void setJwtAuthorizedRole(String jwtAuthorizedRole) {
		this.jwtAuthorizedRole = jwtAuthorizedRole;
	}
}
