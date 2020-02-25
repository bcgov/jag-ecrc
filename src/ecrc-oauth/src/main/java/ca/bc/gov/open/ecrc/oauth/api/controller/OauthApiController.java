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
import com.nimbusds.oauth2.sdk.token.BearerAccessToken;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import ca.bc.gov.open.ecrc.oauth.api.configuration.OauthApiProperties;
import ca.bc.gov.open.ecrc.oauth.api.exception.OauthServiceException;
import ca.bc.gov.open.ecrc.oauth.api.service.OauthServicesImpl;
import ca.bc.gov.open.ecrc.oauth.api.util.JwtTokenGenerator;
import ch.qos.logback.classic.Logger;


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
	 * Uses authorization code provided from call to /idpRedirect and used to generate access token stored in 
	 * memory. 
	 * 
	 * Responds to SPA with new JWT (complete with userInfo and access_Token as claims).   
	 * 
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(@RequestParam(name = "code", required = true) String authCode) throws OauthServiceException {
		
		System.out.println("login called... Authorization code being used to generate token = " + authCode);
		
		// Using the response from the IdP server, strip out the access token and add it to a new JWT token along with the userInfo. 
		
		AccessToken accessToken = null; 
		try {
			accessToken = oauthServices.getToken(authCode);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
			throw new OauthServiceException("Error generating client token. ", e);
		}
		
		UserInfo userInfo = oauthServices.getUserInfo((BearerAccessToken)accessToken);
		
		// TODO - The JWT should be past as in the response header, e.g. resp.setHeader("Authorization", "Bearer " + token); 
        return JwtTokenGenerator.generateToken(userInfo, accessToken, oauthProps.getFesecret()); 
		
	}

}