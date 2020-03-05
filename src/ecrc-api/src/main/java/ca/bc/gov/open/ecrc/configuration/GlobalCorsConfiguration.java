package ca.bc.gov.open.ecrc.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS configuration
 * 
 * @author sivakaruna
 *
 */
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class GlobalCorsConfiguration {

	@Bean
	public WebMvcConfigurer corsConfigurer(EcrcProperties ecrcProps) {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping(ecrcProps.getCorsMapping()).allowedMethods("GET", "POST")
						.allowedOrigins(ecrcProps.getCorsAllowedOrigins());
			}
		};
	}
}
