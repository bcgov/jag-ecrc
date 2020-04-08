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

	public ResponseEntity<String> getIDPRedirect() throws OauthServiceException {
		logger.debug("Calling getIDPRedirect");

		Mono<String> responseBody = this.webClient.get().uri(ecrcProps.getOauthGetBCSCRedirectUri()).retrieve()
				.bodyToMono(String.class);
		return new ResponseEntity<>(responseBody.block(), HttpStatus.OK);

	}

	public ResponseEntity<String> getToken(String authCode) throws OauthServiceException {
		logger.debug("Calling getToken");

		String loginUri = String.format(ecrcProps.getOauthLoginUri(), authCode);
		Mono<String> responseBody = this.webClient.get().uri(loginUri).retrieve().bodyToMono(String.class);
		return new ResponseEntity<>(responseBody.block(), HttpStatus.OK);
	}
}
