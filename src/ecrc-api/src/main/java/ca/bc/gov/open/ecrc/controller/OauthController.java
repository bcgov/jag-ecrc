package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.util.EcrcConstants;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
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
	@GetMapping(value = "/protected/getBCSCUrl")
	public ResponseEntity<String> getBCSCUrl(HttpServletRequest request, @RequestParam(required = true) String requestGuid,
			@RequestParam(required = false) String returnUrl) throws OauthServiceException {
		MDC.put(EcrcConstants.REQUEST_GUID, requestGuid);
		MDC.put(EcrcConstants.REQUEST_ENDPOINT, "getBCSCUrl");
		logger.info("BCSC URL request received [{}]", requestGuid);
		try {
			String jwtToken = request.getHeader("Authorization").replace("Bearer ", "").trim();
			return oauthServices.getIDPRedirect(jwtToken, returnUrl);
		} catch (Exception e) {
			logger.error("Error retrieving BCSC redirect url ");
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(EcrcExceptionConstants.SERVICE_UNAVAILABLE, HttpStatus.INTERNAL_SERVER_ERROR);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}

	}

	@GetMapping(value = "/protected/login")
	public ResponseEntity<String> login(HttpServletRequest request, @RequestParam(name = "code", required = true) String authCode,
			@RequestParam(required = true) String requestGuid, @RequestParam(required = false) String returnUrl)
			throws OauthServiceException {
		MDC.put(EcrcConstants.REQUEST_GUID, requestGuid);
		MDC.put(EcrcConstants.REQUEST_ENDPOINT, "login");
		logger.info("Login URL request received [{}]", requestGuid);

		try {
			String jwtToken = request.getHeader("Authorization").replace("Bearer ", "").trim();
			return oauthServices.getToken(jwtToken, authCode, returnUrl);
		} catch (OauthServiceException e) {
			logger.error("Error logging in to BCSC");
			logger.error(e.getMessage(), e);
			return new ResponseEntity<>(OauthServiceException.OAUTH_FAILURE_RESPONSE, HttpStatus.FORBIDDEN);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}
	}

}