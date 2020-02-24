package ca.bc.gov.open.ecrc.oauth.api.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.oauth2.sdk.token.AccessToken;

import ca.bc.gov.open.ecrc.oauth.api.configuration.OauthApiProperties;
import ca.bc.gov.open.ecrc.oauth.api.exception.OauthServiceException;
import ca.bc.gov.open.ecrc.oauth.api.model.JwtUserDto;
import ca.bc.gov.open.ecrc.oauth.api.service.OauthServicesImpl;
import ca.bc.gov.open.ecrc.oauth.api.util.JwtTokenGenerator;
import ch.qos.logback.classic.Logger;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Configuration
@EnableConfigurationProperties(OauthApiProperties.class)
@RestController
public class OauthApiController {
	
	@Autowired
	private OauthServicesImpl oauthServices;
	
	@Autowired
	private OauthApiProperties oauthProps;
	
	private final Logger logger = (Logger) LoggerFactory.getLogger(OauthApiController.class);

	/*
	 * Redirects to IDP to initiate authorization process. 
	 * 
	 */
	@ResponseStatus(code = HttpStatus.FOUND)
	@RequestMapping(value = "/idpRedirect", method = RequestMethod.GET)
	public void authenticate(HttpServletRequest request, HttpServletResponse response) throws OauthServiceException {
		
		System.out.println("/idpRedirect called...");
		
		try {
			response.setHeader("Location", oauthServices.getIDPRedirect().toString());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			throw new OauthServiceException("Configuration Error");
		}
		
	}
	
	/*
	 * 
	 * Uses authorization code provided at /idpRedirect to generate token which is stored in 
	 * memory. Responds to SPA with new JWT.  
	 * 
	 * https://connect2id.com/products/nimbus-oauth-openid-connect-sdk/examples/oauth/token-request
	 * 
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(@RequestParam(name = "code", required = true) String authCode) throws OauthServiceException {
		
		System.out.println("login called... Authorization code being used to generate token = " + authCode);
		
		
		AccessToken resp = null; 
		try {
			resp = oauthServices.getToken(authCode);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			throw new OauthServiceException("Error generating client token. ", e);
		}
		
		// TODO
		// Using the response from the IdP server, strip out the access token and add it to a new JWT token and
		// return to caller. 
		//return resp.toString();
		

        return JwtTokenGenerator.generateToken(oauthProps.getFesecret()); 
		
	}

}