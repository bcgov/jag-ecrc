package ca.bc.gov.open.ecrc.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.model.ValidationResponse;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;
import ca.bc.gov.open.ecrc.util.AES256;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter  extends OncePerRequestFilter {
	
	private final Logger logger = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

    private EcrcProperties ecrcProps;
    
	private ECRCJWTValidationServiceImpl tokenValidationServices;

    public JWTAuthorizationFilter(EcrcProperties ecrcProps, ECRCJWTValidationServiceImpl tokenValidationServices) {
        this.ecrcProps = ecrcProps;
        this.tokenValidationServices = tokenValidationServices;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        try {
            if (checkJWTToken(request)) {
                Claims claims = validateToken(request);
                if ( claims.get("authorities") != null ) {
                	if (claims.get("per") != null) {
                		logger.debug("Found PER claim. Validating....");
                		String accessToken = AES256.decrypt((String)claims.get("per")); 
                		if ( accessToken != null ) {
                			ValidationResponse resp = tokenValidationServices.validateBCSCAccessToken(accessToken);  
                			if ( !resp.isValid() ) {
                				logger.error("Failed to validate PER claim of received JWT token. Validation Response said : " + resp.getMessage());
                				SecurityContextHolder.clearContext(); // fail
                			} else {
                				logger.debug("PER decypted and Access Token validated.");
                			}
                		} else {
                			SecurityContextHolder.clearContext(); // fail
                		}
                	}
                    setUpSpringAuthentication(claims);
                } else {
                    SecurityContextHolder.clearContext(); // fail
                }
            }
            chain.doFilter(request, response);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            (response).sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
        }
    }

    private Claims validateToken(HttpServletRequest request) {
        String jwtToken = request.getHeader(ecrcProps.getJwtHeader()).replace(ecrcProps.getJwtPrefix(), "").trim();
        return Jwts.parser().setSigningKey(ecrcProps.getJwtSecret().getBytes()).parseClaimsJws(jwtToken).getBody();
    }

    /**
     * Authentication method in Spring flow
     *
     * @param claims
     */
    private void setUpSpringAuthentication(Claims claims) {
        List<SimpleGrantedAuthority> authorities = ((List<?>) claims
                .get("authorities")).stream()
                .map(authority -> new SimpleGrantedAuthority((String) authority))
                .collect(Collectors.toList());

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null,
                authorities);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private boolean checkJWTToken(HttpServletRequest request) {
        String authenticationHeader = request.getHeader(ecrcProps.getJwtHeader());
        return !(authenticationHeader == null || !authenticationHeader.startsWith(ecrcProps.getJwtPrefix()));
    }
    
    

}
