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
            	
            	logger.debug("JWT found in header.");
            	
                Claims claims = validateToken(request);
                logger.debug("JWT passed basic validation checks.");
                
                if ( null != claims.get("authorities") ) {
                	
                	logger.debug("Authority found JWT.");
                	
                	// Accessing a private resource requires validating the 'PER' claim. 
                	// Any errors during validation or a missing 'PER' claim will result in 403. 
                	if ( (null != request.getServletPath() ) && request.getServletPath().startsWith("/private") ) {
                	
                		// "per" block must be found in private context. 
	                	if ( claims.get("per") != null ) {
	                		logger.debug("Found 'PER' claim. Validating....");
	                		String accessToken = AES256.decrypt((String)claims.get("per")); 
	                		if ( accessToken != null ) {
	                			ValidationResponse resp = tokenValidationServices.validateBCSCAccessToken(accessToken);  
	                			if ( !resp.isValid() ) {
	                				logger.error("Failed to validate Access Token within PER claim. Validation response said : " + resp.getMessage());
	                				SecurityContextHolder.clearContext(); // fail
	                			} else {
	                				logger.debug("'PER' decypted and Access Token validated.");
	                				setUpSpringAuthentication(claims); // pass
	                			}
	                		} else {
	                			logger.error("Error decrypting 'PER' block while accessing private resource");
	                			SecurityContextHolder.clearContext(); // fail
	                		}
	                	} else {
	                		logger.error("No 'PER' block found during attempt to access private resource");
	                		SecurityContextHolder.clearContext(); // fail
	                	}
                	} else {
                		logger.debug("Authorities checked. Allowing non private access.");
                		setUpSpringAuthentication(claims); // pass
                	}
                    
                } else {
                	logger.debug("No Authorities found. Blocking access.");
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
