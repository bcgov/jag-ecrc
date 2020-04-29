package ca.bc.gov.open.ecrc.service;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.OauthServiceException;
import reactor.core.publisher.Mono;

/**
 *
 * Oauth API Services Implementation class.
 *
 * @author sivakaruna
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class OauthServicesImpl implements OauthServices {

	@Autowired
	private EcrcProperties ecrcProps;

	private final Logger logger = LoggerFactory.getLogger(OauthServicesImpl.class);

	private WebClient webClient = null;

	@PostConstruct
	public void InitService() {
		this.webClient = WebClient.builder().baseUrl(ecrcProps.getOauthUrl())
				.defaultHeaders(
						header -> header.setBasicAuth(ecrcProps.getOauthUsername(), ecrcProps.getOauthPassword()))
				.build();
	}

	public ResponseEntity<String> getIDPRedirect(String returnUrl) throws OauthServiceException {
		logger.debug("Calling getIDPRedirect");
		try {
			String params = "?returnUrl=" + returnUrl;
			String uri = String.format(ecrcProps.getOauthGetBCSCRedirectUri(), params);
			Mono<String> responseBody = this.webClient.get().uri(uri).retrieve().bodyToMono(String.class);
			return new ResponseEntity<>(responseBody.block(), HttpStatus.OK);
		} catch (Exception e) {
			throw new OauthServiceException(e.getMessage(), e);
		}

	}

	public ResponseEntity<String> getToken(String authCode, String returnUrl) throws OauthServiceException {
		logger.debug("Calling getToken");
		try {
			String params = "?code=" + authCode + "&returnUrl=" + returnUrl;
			String loginUri = String.format(ecrcProps.getOauthLoginUri(), params);
			Mono<String> responseBody = this.webClient.get().uri(loginUri).retrieve().bodyToMono(String.class);
			return new ResponseEntity<>(responseBody.block(), HttpStatus.OK);
		} catch (Exception e) {
			throw new OauthServiceException(e.getMessage(), e);
		}
	}
}
