package ca.bc.gov.open.ecrc.security;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.model.ValidationResponse;
import ca.bc.gov.open.ecrc.service.ECRCJWTValidationServiceImpl;
import ca.bc.gov.open.ecrc.util.AES256;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JWTAuthorizationFilter  extends OncePerRequestFilter {
	
	private final Logger jwtLogger = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

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

            	jwtLogger.debug("JWT found in header.");
            	
                Claims claims = validateToken(request);
                jwtLogger.debug("JWT passed basic validation checks.");
                Boolean requestValid = validateRequest(claims, request);

                if (Boolean.TRUE.equals(requestValid)) {
                    setUpSpringAuthentication(claims);
                } else {
                    SecurityContextHolder.clearContext();
                }
            }
            chain.doFilter(request, response);
        } catch (Exception e) {
            jwtLogger.info("Authentication failed: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            (response).sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
        }
    }

    private Claims validateToken(HttpServletRequest request) {
        String jwtToken = request.getHeader(ecrcProps.getJwtHeader()).replace(ecrcProps.getJwtPrefix(), "").trim();
        return Jwts.parserBuilder().setSigningKey(ecrcProps.getJwtSecret().getBytes()).build().parseClaimsJws(jwtToken).getBody();
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

    private boolean validateRequest(Claims claims, HttpServletRequest request) {
        if (null != claims.get("authorities") ) {
            jwtLogger.debug("Authority found JWT.");

            // Accessing a private resource requires validating the 'PER' claim.
            // Any errors during validation or a missing 'PER' claim will result in 403.
            if ((null != request.getServletPath()) && request.getServletPath().startsWith("/private")) {
                // "per" block must be found in private context.
                jwtLogger.debug("Found 'PER' claim. Validating....");
                if (claims.get("per") != null  && validToken(AES256.decrypt((String)claims.get("per"), ecrcProps.getOauthPERSecret()))) {
                    return true;
                }
            } else {
                jwtLogger.debug("Authorities checked. Allowing non private access.");
                return true;
            }
        }
        return false;
    }

    private boolean validToken(String accessToken) {
        if ( accessToken != null ) {
            ValidationResponse resp = tokenValidationServices.validateBCSCAccessToken(accessToken);
            if ( !resp.isValid() ) {
                jwtLogger.error("Failed to validate Access Token within PER claim. Validation response said : {}", resp.getMessage());
               return false;
            } else {
                jwtLogger.debug("'PER' decypted and Access Token validated.");
                return true;
            }
        } else {
            jwtLogger.error("Error decrypting 'PER' block while accessing private resource");
            return false;
        }
    }
}
