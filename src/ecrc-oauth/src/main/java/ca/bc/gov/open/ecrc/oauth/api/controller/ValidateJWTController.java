package ca.bc.gov.open.ecrc.oauth.api.controller;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.oauth.api.configuration.OauthApiProperties;

@Configuration
@EnableConfigurationProperties(OauthApiProperties.class)
@RestController
public class ValidateJWTController {
	
	// not used yet - placeholder

}
