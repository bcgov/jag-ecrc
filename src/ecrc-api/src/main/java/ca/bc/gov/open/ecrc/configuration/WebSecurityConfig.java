package ca.bc.gov.open.ecrc.configuration;

import ca.bc.gov.open.ecrc.security.JWTAuthorizationFilter;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    EcrcProperties ecrcProps;
    
    @Autowired
    private ECRCJWTValidationServiceImpl tokenValidationServices;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .addFilterAfter(new JWTAuthorizationFilter(ecrcProps, tokenValidationServices), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/initialHandshake**").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers("/protected/**").hasAuthority(ecrcProps.getJwtRole())
                .antMatchers("/private/**").hasAuthority(ecrcProps.getJwtAuthorizedRole())
                .anyRequest().authenticated();
   }
}
