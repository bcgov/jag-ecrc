package ca.bc.gov.open.ecrc.oauth.api.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 *
 * ECRC Oauth2 API properties file object.
 *
 * @See EcrcServicesImpl for example usage.
 *
 * @author shaunmillargov
 *
 */
@ConfigurationProperties(prefix = "oauth")
public class OauthApiProperties {

	private String idp;
	private String clientid;
	private String clientsecret;
	private String scope;
	private String clientreturnuri;
	private String fesecret; // secret shared with the front end

	public String getClientid() {
		if (null == clientid || clientid.startsWith("$"))
			throw new NullPointerException("No CLIENT ID. Check project configuration");
		else
			return clientid;
	}

	public void setClientid(String clientid) {
		this.clientid = clientid;
	}

	public String getClientsecret() {
		if (null == clientsecret || clientsecret.startsWith("$"))
			throw new NullPointerException("No CLIENT SECRET. Check project configuration");
		else
			return clientsecret;
	}

	public void setClientsecret(String clientsecret) {
		this.clientsecret = clientsecret;
	}

	public String getScope() {
		if (null == scope || scope.startsWith("$"))
			throw new NullPointerException("No SCOPE. Check project configuration");
		else
			return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getIdp() throws NullPointerException {
		if (null == idp || idp.startsWith("$"))
			throw new NullPointerException("No IDP. Check project configuration");
		else
			return idp;
	}

	public void setIdp(String idp) {
		this.idp = idp;
	}

	public String getClientreturnuri() {
		if (null == clientreturnuri || clientreturnuri.startsWith("$"))
			throw new NullPointerException("No client return URI. Check project configuration");
		else
			return clientreturnuri;
	}

	public void setClientreturnuri(String clientreturnuri) {
		this.clientreturnuri = clientreturnuri;
	}

	public String getFesecret() {
		if (null == fesecret || fesecret.startsWith("$"))
			throw new NullPointerException("No FE Secret defined. Check project configuration");
		else
			return fesecret;
	}

	public void setFesecret(String fesecret) {
		this.fesecret = fesecret;
	}
	
}
