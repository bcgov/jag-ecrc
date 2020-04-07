package ca.bc.gov.open.oauth.configuration;

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
@EnableConfigurationProperties(OauthProperties.class)
public class GlobalCorsConfiguration {

	@Bean
	public WebMvcConfigurer corsConfigurer(OauthProperties oauthProps) {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping(oauthProps.getCorsMapping()).allowedMethods("GET", "POST")
						.allowedOrigins(oauthProps.getCorsAllowedOrigins());
			}
		};
	}
}
