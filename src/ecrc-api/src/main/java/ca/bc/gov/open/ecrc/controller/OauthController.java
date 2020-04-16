package ca.bc.gov.open.ecrc.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.OauthServiceException;
import ca.bc.gov.open.ecrc.service.OauthServicesImpl;
import ch.qos.logback.classic.Logger;

/**
 * 
 * Oauth Controller class.
 * 
 * Provides OIDC endpoints serving the eCRC front end.
 * 
 * @author sivakaruna
 *
 */
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
@RestController
public class OauthController {

	@Autowired
	private OauthServicesImpl oauthServices;

	private final Logger logger = (Logger) LoggerFactory.getLogger(OauthController.class);

	@ResponseStatus(code = HttpStatus.FOUND)
	@GetMapping(value = "/protected/getBCSCUrl", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getBCSCUrl(@RequestParam(required = true) String requestGuid)
			throws OauthServiceException {
		logger.info("BCSC URL request received [{}]", requestGuid);
		try {
			return oauthServices.getIDPRedirect();
		} catch (Exception e) {
			logger.error("Error retrieving BCSC redirect url ", e);
			return new ResponseEntity<>(EcrcExceptionConstants.SERVICE_UNAVAILABLE, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(value = "/protected/login", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> login(@RequestParam(name = "code", required = true) String authCode,
			@RequestParam(required = true) String requestGuid) throws OauthServiceException {
		logger.info("Login URL request received {}", requestGuid);
		try {
			return oauthServices.getToken(authCode);
		} catch (OauthServiceException e) {
			logger.error("Error logging in to BCSC", e);
			return new ResponseEntity<>(OauthServiceException.OAUTH_FAILURE_RESPONSE, HttpStatus.FORBIDDEN);
		}
	}

}