package ca.bc.gov.open.ecrc.util;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;

/**
 * Eventual convenience class for validating JWT tokens. 
 *
 * TODO - much work to still be done here. 
 * 
 */
@Component
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class JwtTokenValidator {
	
	//@Autowired
	//private EcrcProperties ecrcProps;

    /**
     * 	
     *
     * @param token the JWT token to parse
     * @return void
     */
    public void validateFrontEndToken(String token) {
    	
    	//TODO - needs completing. 
       
    }
    
    /**
     * 	
     *
     * @param token the JWT token to parse
     * @return void
     * 
     */
    public void validateIdPToken(String token) {
    	
    	//TODO - needs completing. 
       
    }
    
    
}
