package ca.bc.gov.open.ecrc.oauth.api.service;

import java.net.URI;
import java.net.URISyntaxException;

import com.nimbusds.oauth2.sdk.token.AccessToken;
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import ca.bc.gov.open.ecrc.oauth.api.exception.OauthServiceException;

/**
 *
 * Interface for ECRC Oauth Services
 *
 * @author shaunmillargov
 *
 */
public interface OauthServices {

	public URI getIDPRedirect() throws URISyntaxException;
	
	public AccessToken getToken(String code) throws OauthServiceException;
	
	public UserInfo getUserInfo(BearerAccessToken accessToken) throws OauthServiceException;

	//TODO - fill in other service method signatures here.

}
