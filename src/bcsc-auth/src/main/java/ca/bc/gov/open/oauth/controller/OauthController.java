package ca.bc.gov.open.oauth.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;

import ca.bc.gov.open.oauth.configuration.OauthProperties;
import ca.bc.gov.open.oauth.model.ValidationResponse;
import ca.bc.gov.open.oauth.service.ECRCJWTValidationServiceImpl;
import ca.bc.gov.open.oauth.service.OauthServicesImpl;
import ca.bc.gov.open.oauth.util.AES256;
import ca.bc.gov.open.oauth.util.JwtTokenGenerator;
import ca.bc.gov.open.oauth.exception.OauthServiceException;
import ch.qos.logback.classic.Logger;
import net.minidev.json.JSONObject;

/**
 * 
 * Oauth Controller class. 
 * 
 * Provides OIDC endpoints serving the eCRC front end. 
 * 
 * @author shaunmillargov
 *
 */
@Configuration
@EnableConfigurationProperties(OauthProperties.class)
@RestController
public class OauthController {
	
	@Autowired
	private OauthServicesImpl oauthServices;
	
	@Autowired
	private OauthProperties ecrcProps;
	
	@Autowired
	private ECRCJWTValidationServiceImpl tokenServices;
	
	private final Logger logger = (Logger) LoggerFactory.getLogger(OauthController.class);

	@ResponseStatus(code = HttpStatus.FOUND)
	@GetMapping(value = "/getBCSCUrl")
	public ResponseEntity<String> getBCSCUrl() throws OauthServiceException {
		logger.info("BCSC URL request received [{}]");

		try {
			return new ResponseEntity<>(oauthServices.getIDPRedirect().toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new OauthServiceException("Configuration Error");
		}
	}

	/*
	 * 
	 * Uses authorization code provided back from call to /authorize to generate access token from IdP. 
	 * 
	 * Responds to SPA with new JWT (complete with userInfo and encrypted IdP token).
	 * 
	 */
	@GetMapping(value = "/login")
	public ResponseEntity<String> login(@RequestParam(name = "code", required = true) String authCode) throws OauthServiceException {
		logger.info("Login URL request received {}");
		
		AccessTokenResponse token = null; 
		try {
			token = oauthServices.getToken(authCode);
		} catch (Exception e) {
			logger.error("Error while calling Oauth2 /token endpoint. ", e);
			return new ResponseEntity<>(OauthServiceException.OAUTH_FAILURE_RESPONSE, HttpStatus.FORBIDDEN);
		}
		
		// Validate tokens received from BCSC. 
		logger.debug("Validating ID token received from BCSC...");
		ValidationResponse valResp = tokenServices.validateBCSCIDToken((String)token.toSuccessResponse().getCustomParameters().get("id_token"));
		if (!valResp.isValid()) {
			logger.error("ID token failed to validate. Error {}", valResp.getMessage());
			return new ResponseEntity<>(OauthServiceException.OAUTH_FAILURE_RESPONSE, HttpStatus.FORBIDDEN);
		}
		
		// Fetch corresponding Userinfo from the IdP server.  
		JSONObject userInfo = null; 
		try {
			userInfo = oauthServices.getUserInfo((BearerAccessToken)token.toSuccessResponse().getTokens().getAccessToken());
		} catch (OauthServiceException e) {
			logger.error("Error fetching userinfo:", e);
			return new ResponseEntity<>(OauthServiceException.OAUTH_FAILURE_RESPONSE, HttpStatus.FORBIDDEN);
		}
		
		// Encrypt the Access Token received from the IdP. This token has a 1 hour expiry time on it and 
		// must be decrypted and used for subsequent calls back to the API. 
	    String encryptedAccessToken = null;
	    try {
	    	encryptedAccessToken = AES256.encrypt(token.getTokens().getBearerAccessToken().getValue(), ecrcProps.getPerSecret() );
		} catch (Exception e) {
			logger.error("Error encrypting token:", e);
			return new ResponseEntity<>(OauthServiceException.OAUTH_FAILURE_RESPONSE, HttpStatus.FORBIDDEN);
		}
		
		// Send the new FE JWT in the response body to the caller. 
	    String feTokenResponse = JwtTokenGenerator.generateFEAccessToken(userInfo, encryptedAccessToken, ecrcProps.getJwtSecret(), ecrcProps.getJwtExpiry(), ecrcProps.getJwtAuthorizedRole());
        return new ResponseEntity<>(feTokenResponse, HttpStatus.OK);
	}

}