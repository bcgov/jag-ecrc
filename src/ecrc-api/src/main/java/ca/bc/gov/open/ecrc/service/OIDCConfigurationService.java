package ca.bc.gov.open.ecrc.service;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.model.OIDCConfiguration;


/**
 * 
 * Service Returns a JAVA object which represents OpenID Connect configuration values from the provider's 
 * Well-Known Configuration Endpoint. 
 * 
 * @author shaunmillargov
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class OIDCConfigurationService {
	
	private OIDCConfiguration config = null; 
	
	@Autowired
	private EcrcProperties ecrcProps;
	
	/**
	 * 
	 * Loads the OIDC Well-known config endpoint if not already loaded. 
	 * 
	 * @return
	 */
    public OIDCConfiguration getConfig() {
        if ( null == config ) 
        	loadConfig();
        return config;
    }

    /**
     * 
     * Loads config object. 
     * 
     */
	private void loadConfig() {
		RestTemplate restTemplate = new RestTemplate();
		URI uri = null;
		try {
			uri = new URI(ecrcProps.getOauthWellKnown());
			config = restTemplate.getForObject(uri, OIDCConfiguration.class);
		} catch (URISyntaxException e2) {
			System.out.println("Unable to load remote server Well-Known configuration endpoint. " + e2.getMessage()); 
			e2.printStackTrace();
		}
	}
}