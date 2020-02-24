package ca.bc.gov.open.ecrc.oauth.api.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * convenience class to generate a token for testing your requests.
 * Make sure the used secret here matches the on in your application.yml
 *
 * @author pascal alma
 */
public class JwtTokenGenerator {

    /**
     * Generates a JWT token containing username as subject, and userId and role as additional claims. These properties are taken from the specified
     * User object. Tokens validity is infinite.
     *
     * @param u the user for which the token will be generated
     * @return the JWT token
     * @throws UnsupportedEncodingException 
     */
    public static String generateToken(String secret) {
        
    	String token = null; 
    	try {
			token = Jwts.builder()
					  .setSubject("users/TzMUocMF4p")
					  .setExpiration(new Date())
					  .claim("name", "Some Guy Token Man")
					  .claim("scope", "email api")
					  .signWith(
					    SignatureAlgorithm.HS256,
					    secret.getBytes("UTF-8")
					  ).compact();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	
		return token;
    	
    }

    /**
     * @param args
     */
    public static void main(String[] args) {

        System.out.println("**************************************\n\n" + generateToken("my-very-secret-key") + "\n\n**************************************");
    }
}
