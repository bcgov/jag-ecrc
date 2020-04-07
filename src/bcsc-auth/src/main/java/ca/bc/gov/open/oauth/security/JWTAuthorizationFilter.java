package ca.bc.gov.open.oauth.security;

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

import ca.bc.gov.open.oauth.configuration.OauthProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

	private final Logger jwtLogger = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

	private OauthProperties oauthProps;

	public JWTAuthorizationFilter(OauthProperties oauthProps) {
		this.oauthProps = oauthProps;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		try {
			if (checkJWTToken(request)) {

				jwtLogger.debug("JWT found in header.");

				Claims claims = validateToken(request);
				jwtLogger.debug("JWT passed basic validation checks.");

				if (null != claims.get("authorities")) {
					jwtLogger.debug("Authorities checked. Allowing non private access.");
            		setUpSpringAuthentication(claims); // pass
				} else {
					jwtLogger.debug("No Authorities found. Blocking access.");
					SecurityContextHolder.clearContext(); // fail
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
		String jwtToken = request.getHeader(oauthProps.getJwtHeader()).replace(oauthProps.getJwtPrefix(), "").trim();
		return Jwts.parser().setSigningKey(oauthProps.getJwtSecret().getBytes()).parseClaimsJws(jwtToken).getBody();
	}

	/**
	 * Authentication method in Spring flow
	 *
	 * @param claims
	 */
	private void setUpSpringAuthentication(Claims claims) {
		List<SimpleGrantedAuthority> authorities = ((List<?>) claims.get("authorities")).stream()
				.map(authority -> new SimpleGrantedAuthority((String) authority)).collect(Collectors.toList());

		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null,
				authorities);
		SecurityContextHolder.getContext().setAuthentication(auth);
	}

	private boolean checkJWTToken(HttpServletRequest request) {
		String authenticationHeader = request.getHeader(oauthProps.getJwtHeader());
		return !(authenticationHeader == null || !authenticationHeader.startsWith(oauthProps.getJwtPrefix()));
	}

}
