package ca.bc.gov.open.ecrc.oauth.api.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import com.nimbusds.oauth2.sdk.token.AccessToken;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * Convenience class to generate a token for testing your requests.
 * Make sure the used secret here matches the on in your application.yml
 *
 * @author shaunmillargov
 */
public class JwtTokenGenerator {

	/**
	 * Generates a JWT token containing userInfo name as additional claims.
     * 
     * Token validity is infinite.
     * 
	 * @param userInfo
	 * @param secret
	 * @return
	 */
    public static String generateToken(UserInfo userInfo, AccessToken accessToken, String secret) {
        
    	String token = null; 
    	try {
			token = Jwts.builder()
					  // TODO - fix me - need to find a way to serialize this object. 
					  //.claim("user", userInfo)
					  .claim("accessToken", accessToken)
					  .setExpiration(new Date()) //TODO - fix this. 
					  .signWith(
					    SignatureAlgorithm.HS256,
					    secret.getBytes("UTF-8")
					  ).compact();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	
		return token;
    	
    }
}
