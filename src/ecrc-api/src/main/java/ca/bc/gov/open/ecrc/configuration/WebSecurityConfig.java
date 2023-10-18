package ca.bc.gov.open.ecrc.configuration;

import ca.bc.gov.open.ecrc.security.JWTAuthorizationFilter;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.authorization.AuthorityAuthorizationManager;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Autowired
    EcrcProperties ecrcProps;
    
    @Autowired
    private ECRCJWTValidationServiceImpl tokenValidationServices;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .addFilterAfter(new JWTAuthorizationFilter(ecrcProps, tokenValidationServices), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(authorizeRequests ->
                    authorizeRequests
                            .requestMatchers(new AntPathRequestMatcher("/v3/api-docs/**")).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/swagger-ui/**")).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/swagger-ui.html")).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/initialHandshake**")).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/actuator/**")).permitAll()
                            .requestMatchers(new AntPathRequestMatcher("/protected/**")).hasAuthority(ecrcProps.getJwtRole())
                            .requestMatchers(new AntPathRequestMatcher("/private/**")).hasAuthority(ecrcProps.getJwtAuthorizedRole())
                            .anyRequest()
                            .authenticated()
                ).build();
    }

}
