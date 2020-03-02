package ca.bc.gov.open.ecrc.configuration;

import ca.bc.gov.open.ecrc.security.JWTAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    EcrcProperties ecrcProps;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
         http.csrf().disable()
              .addFilterAfter(new JWTAuthorizationFilter(ecrcProps), UsernamePasswordAuthenticationFilter.class)
              .authorizeRequests()
              .antMatchers("/login**").permitAll()
              .antMatchers("/authorize**").permitAll()
              .antMatchers("/auth-callback**").permitAll()
              .antMatchers("/createApplicant**").hasAuthority(ecrcProps.getJwtAuthorizedRole())
              .antMatchers("/public/**").hasAuthority(ecrcProps.getJwtRole())
              .anyRequest().authenticated();
   }
}
