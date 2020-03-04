package ca.bc.gov.open.ecrc.util;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Date;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 *
 * Convenience class for generating and Front End JWT tokens.  
 * 
 * @author shaunmillargov
 */
public class JwtTokenGenerator {
	
	/**
	 * Generates a JWT token for Front end API access.
	 * 
	 * Note: Expiry time is in ms.
	 * 
	 * @param userInfo
	 * @param encryptedToken
	 * @param secret
	 * @param expiryTime
	 * @return
	 */
	public static String generateFEAccessToken(UserInfo userInfo, String encryptedToken, String secret, int expiryTime, String authority) {

		String token = null;
		try {
			// per == persisted IdP token
			token = Jwts.builder()
					.claim("userInfo", userInfo.toJSONObject())
					.claim("per", encryptedToken)
					.claim("authorities", Arrays.asList(authority))
					.setExpiration(new Date(System.currentTimeMillis() + expiryTime))
					.signWith(SignatureAlgorithm.HS256, secret.getBytes("UTF-8")).compact();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return token;

	}
}
