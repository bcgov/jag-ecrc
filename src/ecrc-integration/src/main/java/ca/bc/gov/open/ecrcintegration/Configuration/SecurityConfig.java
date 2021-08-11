package ca.bc.gov.open.ecrcintegration.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MyBasicAuthenticationEntryPoint authenticationEntryPoint;

    @Value("${security.basic-auth.username}")
    private String userName;

    @Value("${security.basic-auth.password}")
    private String password;

    @Autowired
    public SecurityConfig(MyBasicAuthenticationEntryPoint authenticationEntryPoint) {
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser(this.userName)
                .password(passwordEncoder().encode(this.password))
                .authorities("ADMIN");
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/error")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic()
                .authenticationEntryPoint(authenticationEntryPoint);
        http.addFilterAfter(new AuthenticationFilter(), BasicAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
