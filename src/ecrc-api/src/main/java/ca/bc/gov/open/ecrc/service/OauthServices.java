package ca.bc.gov.open.ecrc.service;

import java.net.URI;
import java.net.URISyntaxException;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import ca.bc.gov.open.ecrc.exception.OauthServiceException;

/**
 *
 * Interface for ECRC Oauth Services
 *
 * @author shaunmillargov
 *
 */
public interface OauthServices {

	public URI getIDPRedirect(String redirectUrl) throws URISyntaxException;
	
	public AccessTokenResponse getToken(String code, String redirectUrl) throws OauthServiceException;

	public UserInfo getUserInfo(BearerAccessToken accessToken) throws OauthServiceException;

}

