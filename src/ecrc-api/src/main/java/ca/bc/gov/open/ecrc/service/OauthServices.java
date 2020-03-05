package ca.bc.gov.open.ecrc.service;

import java.net.URI;
import java.net.URISyntaxException;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;

import ca.bc.gov.open.ecrc.exception.OauthServiceException;
import net.minidev.json.JSONObject;

/**
 *
 * Interface for ECRC Oauth Services
 *
 * @author shaunmillargov
 *
 */
public interface OauthServices {

	public URI getIDPRedirect() throws URISyntaxException;
	
	public AccessTokenResponse getToken(String code) throws OauthServiceException;

	public JSONObject getUserInfo(BearerAccessToken accessToken) throws OauthServiceException;

}

