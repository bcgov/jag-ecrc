package ca.bc.gov.open.ecrc.oauth.api.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import ca.bc.gov.open.ecrc.oauth.api.configuration.OauthApiProperties;
import ca.bc.gov.open.ecrc.oauth.api.model.JwtUserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

/**
 * Class validates a given token by using the secret configured in the application
 *
 * @author pascal alma
 */
@Component
@Configuration
@EnableConfigurationProperties(OauthApiProperties.class)
public class JwtTokenValidator {

	
	@Autowired
	private OauthApiProperties oauthProps;

    /**
     * Tries to parse specified String as a JWT token. If successful, returns User object with username, id and role prefilled (extracted from token).
     * If unsuccessful (token is invalid or not containing all required user properties), simply returns null.
     *
     * @param token the JWT token to parse
     * @return the User object extracted from specified token or null if a token is invalid.
     */
    public JwtUserDto parseToken(String token) {
        JwtUserDto u = null;

        try {
            Claims body = Jwts.parser()
                    .setSigningKey(oauthProps.getFesecret())
                    .parseClaimsJws(token)
                    .getBody();

            u = new JwtUserDto();
            u.setUsername(body.getSubject());
            u.setId(Long.parseLong((String) body.get("userId")));
            u.setRole((String) body.get("role"));

        } catch (JwtException e) {
            // Simply print the exception and null will be returned for the userDto
            e.printStackTrace();
        }
        return u;
    }
}
