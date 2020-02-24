package ca.bc.gov.open.ecrc.oauth.api.service;


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
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.State;
import com.nimbusds.oauth2.sdk.token.AccessToken;

import ca.bc.gov.open.ecrc.oauth.api.configuration.OauthApiProperties;
import ca.bc.gov.open.ecrc.oauth.api.exception.OauthServiceException;


/**
 *
 * Oauth API Services Implementation class.
 *
 * @author shaunmillargov
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(OauthApiProperties.class)
public class OauthServicesImpl implements OauthServices {

	@Autowired
	private OauthApiProperties oauthProps;

	private final Logger logger = LoggerFactory.getLogger(OauthServicesImpl.class);

	public URI getIDPRedirect() throws URISyntaxException {
		
		logger.debug("Calling getIDPRedirect");
		
		// The authorisation endpoint of IDP the server
		URI authzEndpoint = new URI(oauthProps.getIdp() + "/authorize");

		// The client identifier provisioned by the server
		ClientID clientID = new ClientID(oauthProps.getClientid());

		// The requested scope values for the token
		Scope scope = new Scope(oauthProps.getScope());

		// The client callback URI, typically pre-registered with the server
		URI callback = new URI(oauthProps.getClientreturnuri());

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

	public AccessToken getToken(String authCode) throws OauthServiceException {
		
		logger.debug("Calling getToken");
		
		AuthorizationCode code = new AuthorizationCode(authCode);
		try {
			
			URI callback = new URI(oauthProps.getClientreturnuri());
			
			// The credentials to authenticate the client at the token endpoint
			ClientID clientID = new ClientID(oauthProps.getClientid());
			Secret clientSecret = new Secret(oauthProps.getClientsecret());
			ClientAuthentication clientAuth = new ClientSecretBasic(clientID, clientSecret);
			
			AuthorizationGrant codeGrant = new AuthorizationCodeGrant(code, callback);
			
			// The IDP token endpoint
			URI tokenEndpoint = new URI(oauthProps.getIdp() + "/token");
			
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
			    // We got an error response...
			    TokenErrorResponse errorResponse = response.toErrorResponse();
			    logger.error(errorResponse.toString());
				throw new OauthServiceException("Token Error Response from IdP server: " + errorResponse.toString() );
			}
			

			AccessTokenResponse successResponse = response.toSuccessResponse();

			// Get the access token, the server may also return a refresh token (depends on scope. If contains offline_access, it will!)
			AccessToken accessToken = successResponse.getTokens().getAccessToken();
			//RefreshToken refreshToken = successResponse.getTokens().getRefreshToken();
			
			return accessToken;
			
		} catch (URISyntaxException e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			throw new OauthServiceException(e.getMessage(), e);
		}
		
	}

}
