package ca.bc.gov.open.ecrc.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.Arrays;
import java.util.HashSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTClaimsVerifier;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import com.nimbusds.oauth2.sdk.TokenResponse;
import com.nimbusds.oauth2.sdk.token.AccessToken;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.model.ValidationResponse;
import ca.bc.gov.open.ecrc.util.AES256;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;

/**
 * 
 * BCSC JWT Token Validation Services.  
 * 
 * These services are intended for validation of JWT token(s) received from BCSC.
 * 
 * @author shaunmillargov
 * 
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class ECRCJWTValidationServiceImpl implements ECRCJWTValidationService {
	
	private final String[] BCSC_ACCESS_TOKEN_CLAIMS =  {"aud", "iss", "exp", "iat", "jti"}; 
	private final String[] BCSC_ID_TOKEN_CLAIMS =  {"sub", "aud", "acr", "kid", "iss", "exp", "iat", "jti"}; 
	
	@Autowired
	private EcrcProperties ecrcProps;

	@Autowired
	private OIDCConfigurationService oidcConfigService;
	
	private Logger logger = LoggerFactory.getLogger(ECRCJWTValidationServiceImpl.class);
	
	/**
	 * Validate BCSC Access Token 
	 */
	@Override
	public ValidationResponse validateBCSCAccessToken(String token) { 
		logger.debug("validateBCSCAccessToken called. Token = " + token);
		return validateBCSCToken(token, BCSC_ACCESS_TOKEN_CLAIMS);
	}
	
	/**
	 * Validate BCSC ID Token 
	 */
	@Override
	public ValidationResponse validateBCSCIDToken(String token) {
		logger.debug("validateBCSCIDToken called. Token = " + token);
		return validateBCSCToken(token, BCSC_ID_TOKEN_CLAIMS);
	}
	
   /**
	* validateBCSCToken Performs the following checks: 
	* 
	*   - Algorithm check -- The JWS algorithm specified in the JWT header is
	*     checked whether it matches the agreed / expected one. Signature check
	*   - The digital signature is verified by trying an appropriate public
	*     key from the server JWK set of the remote server. 
	*   - JWT claims check -- The JWT claims set is validated, for example to ensure the token is
	*     not expired and matches the expected issuer, audience and other
	*     claims. 
	*     
	*     Applicable to both access_token and id_token types. 
	*   
	**/
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private ValidationResponse validateBCSCToken(String token, String[] claims) {

		ValidationResponse val = new ValidationResponse(true, "Successful JWT validation");

		// Create a JWT processor for the access tokens
		ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();

		// Fetch the public RSA keys from the IdP server to validate the signatures
		// Keys are sourced from the IdP server's JWK set, published at a well-known URL.
		// The RemoteJWKSet object caches the retrieved keys to speed up subsequent look-ups and can
		// also handle key-rollovers.
		JWKSource<SecurityContext> keySource = null;
		try {
			keySource = new RemoteJWKSet<>(new URL(oidcConfigService.getConfig().getJwksUri()));
		} catch (MalformedURLException e1) {
			logger.error("Unable to instantiate Remote JWK set from remote server.", e1);
			val.setMessage(e1.getMessage());
		}

		// The expected JWS algorithm of the id_Token received from BCSC
		JWSAlgorithm expectedJWSAlg = JWSAlgorithm.RS256;

		// Configure the JWT processor with a key selector to feed matching public
		// RSA keys sourced from the JWK set URL
		JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(expectedJWSAlg, keySource);

		jwtProcessor.setJWSKeySelector(keySelector);

		// Set the required JWT claims for access tokens issued by the IdP (BCSC) server.
		// This set MUST match those found for the ID_TOKEN rec'd back from BCSC.
		jwtProcessor.setJWTClaimsSetVerifier(new DefaultJWTClaimsVerifier(
				// new JWTClaimsSet.Builder().issuer("https://idtest.gov.bc.ca/oauth2/").build(),
				new JWTClaimsSet.Builder().issuer(ecrcProps.getOauthIdp() + "/oauth2/").build(),
				new HashSet<>(Arrays.asList(claims))));

		// Process the token
		SecurityContext ctx = null; // optional context parameter, not required here
		try {
			jwtProcessor.process(token, ctx);
			logger.debug("Token Ok");
		} catch (ParseException | BadJOSEException | JOSEException e) {
			logger.error("Token FAILED validation.", e);
			val.setMessage(e.getMessage());
			val.setValid(false);
		}

		return val;
	}


	/**
	 * Validate the PER claim (Decrypt and validate the BCSC tokens within).
	 * 
	 * MIGHT NOT BE USED. 
	 */
	@Override
	public ValidationResponse PERValidate(String tokens) {
		
		// Decrypt the original claim (labeled "PER") containing the tokens BCSC
		String _tokens = AES256.decrypt(tokens); 
		JSONParser p = new JSONParser(JSONParser.MODE_RFC4627);
		JSONObject obj;
		TokenResponse response = null; 
		try {
			obj = (JSONObject) p.parse(_tokens);
			response = TokenResponse.parse(obj);
		} catch (net.minidev.json.parser.ParseException e) {
			logger.error("PER Validate Failed to Parse. ", e);
		} catch (com.nimbusds.oauth2.sdk.ParseException e) {
			logger.error("PER Validate Failed to Parse. ", e);
		}
		
		// Fetch both tokens within the decrypted string. 
		AccessToken accessToken = response.toSuccessResponse().getTokens().getAccessToken();
		String idToken = (String) response.toSuccessResponse().getCustomParameters().get("id_token");

		ValidationResponse val1 = validateBCSCAccessToken(accessToken.getValue());
		ValidationResponse val2 = validateBCSCIDToken(idToken);
		Boolean bothValid = val1.isValid() && val2.isValid();
		ValidationResponse resp = new ValidationResponse();
		
		// merge the response of two tests into one. 
		if ( !bothValid ) {
			resp.setValid(false);
			if ( !val1.isValid() ) 
				resp.setMessage( val1.getMessage() );
			else 
				resp.setMessage( val2.getMessage());
		} else {
			resp.setValid(true);
			resp.setMessage("Successful JWT validation");
		}

		return resp; 
	}

}
