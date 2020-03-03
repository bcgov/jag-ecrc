package ca.bc.gov.open.ecrc.service;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import com.nimbusds.oauth2.sdk.AuthorizationCode;
import com.nimbusds.oauth2.sdk.AuthorizationCodeGrant;
import com.nimbusds.oauth2.sdk.AuthorizationGrant;
import com.nimbusds.oauth2.sdk.AuthorizationRequest;
import com.nimbusds.oauth2.sdk.ParseException;
import com.nimbusds.oauth2.sdk.ResponseType;
import com.nimbusds.oauth2.sdk.Scope;
import com.nimbusds.oauth2.sdk.TokenErrorResponse;
import com.nimbusds.oauth2.sdk.TokenRequest;
import com.nimbusds.oauth2.sdk.TokenResponse;
import com.nimbusds.oauth2.sdk.auth.ClientAuthentication;
import com.nimbusds.oauth2.sdk.auth.ClientSecretBasic;
import com.nimbusds.oauth2.sdk.auth.Secret;
import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.State;
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.openid.connect.sdk.UserInfoRequest;
import com.nimbusds.openid.connect.sdk.UserInfoResponse;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.OauthServiceException;


/**
 *
 * Oauth API Services Implementation class.
 *
 * @author shaunmillargov
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class OauthServicesImpl implements OauthServices {

	@Autowired
	private EcrcProperties ecrcProps;

	private final Logger logger = LoggerFactory.getLogger(OauthServicesImpl.class);

	public URI getIDPRedirect(String redirectUrl) throws URISyntaxException {
		
		logger.debug("Calling getIDPRedirect");
		
		// The authorisation endpoint of IDP the server
		URI authzEndpoint = new URI(ecrcProps.getOauthIdp() + "/authorize");

		// The client identifier provisioned by the server
		ClientID clientID = new ClientID(ecrcProps.getOauthClientId());

		// The requested scope values for the token
		Scope scope = new Scope(ecrcProps.getOauthScope());

		// The client callback URI, typically pre-registered with the server
		URI callback = new URI(redirectUrl);

		// Generate random state string for pairing the response to the request
		State state = new State();

		// Build the request
		AuthorizationRequest request = new AuthorizationRequest.Builder(
		    new ResponseType(ResponseType.Value.CODE), clientID)
		    .scope(scope)
		    .state(state)
		    .redirectionURI(callback)
		    .endpointURI(authzEndpoint)
		    .build();

		// Use this URI to send the end-user's browser to the server
		return request.toURI();	
			
	}

	public AccessTokenResponse getToken(String authCode, String redirectUrl) throws OauthServiceException {
		
		logger.debug("Calling getToken");
		
		AuthorizationCode code = new AuthorizationCode(authCode);
		try {
			
			URI callback = new URI(redirectUrl);
			
			// The credentials to authenticate the client at the token endpoint
			ClientID clientID = new ClientID(ecrcProps.getOauthClientId());
			Secret clientSecret = new Secret(ecrcProps.getOauthSecret());
			ClientAuthentication clientAuth = new ClientSecretBasic(clientID, clientSecret);
			
			AuthorizationGrant codeGrant = new AuthorizationCodeGrant(code, callback);
			
			// The IDP token endpoint
			URI tokenEndpoint = new URI(ecrcProps.getOauthIdp() + "/token");
			
			//authorization_code == grant_type

			// Make the token request
			TokenRequest request = new TokenRequest(tokenEndpoint, clientAuth, codeGrant);
			
			TokenResponse response;
			try {
				response = TokenResponse.parse(request.toHTTPRequest().send());
			} catch (ParseException e) {
				logger.error(e.getMessage(), e);
				e.printStackTrace();
				throw new OauthServiceException("Parse Exception", e);
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
				e.printStackTrace();
				throw new OauthServiceException("Error comunicating with IdP server", e);
			}

			if (!response.indicatesSuccess()) {
			    TokenErrorResponse errorResponse = response.toErrorResponse();
			    logger.error(errorResponse.toString());
				throw new OauthServiceException("Token Error Response from IdP server: " + errorResponse.toString() );
			}

			// Respond with the complete token returned from the IdP.
			return response.toSuccessResponse();
			
		} catch (URISyntaxException e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			throw new OauthServiceException(e.getMessage(), e);
		}
		
	}

	public UserInfo getUserInfo(BearerAccessToken accessToken) throws OauthServiceException {
	
		try {

			// Build the IdP endpoint for user info data
			HTTPResponse httpResponse = new UserInfoRequest(new URI(ecrcProps.getOauthIdp() + "/userinfo"),
					(BearerAccessToken) accessToken).toHTTPRequest().send();

			// Parse the response
			UserInfoResponse userInfoResponse = null;
			try {
				userInfoResponse = UserInfoResponse.parse(httpResponse);
			} catch (ParseException e) {
				logger.error(e.getMessage(), e);
				e.printStackTrace();
				throw new OauthServiceException("Error parsing userinfo data returned from server. ", e);
			}

			// The request failed, e.g. due to invalid or expired token
			if (!userInfoResponse.indicatesSuccess()) {
				logger.error("Invalid response received from server when requesting userinfo. " + "code: "
						+ userInfoResponse.toErrorResponse().getErrorObject().getCode() + "desc: "
						+ userInfoResponse.toErrorResponse().getErrorObject().getDescription());
				throw new OauthServiceException("Invalid response returned from server for userinfo request.");
			}

			// Extract the claims
			return userInfoResponse.toSuccessResponse().getUserInfo();

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			throw new OauthServiceException(e.getMessage(), e);
		}
	}
}


