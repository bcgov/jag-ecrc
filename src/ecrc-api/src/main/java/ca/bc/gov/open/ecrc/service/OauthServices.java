package ca.bc.gov.open.ecrc.service;

import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.exception.OauthServiceException;

/**
 *
 * Interface for ECRC Oauth Services
 *
 * @author sivakaruna
 *
 */
public interface OauthServices {

	public ResponseEntity<String> getIDPRedirect(String jwtToken, String returnUrl) throws OauthServiceException;

	public ResponseEntity<String> getToken(String jwtToken, String code, String returnUrl) throws OauthServiceException;

}
