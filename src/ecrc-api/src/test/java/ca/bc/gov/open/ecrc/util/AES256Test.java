package ca.bc.gov.open.ecrc.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Tests for AES256 encryption util
 * 
 * @author BrendanBeachBCJ
 *
 */
public class AES256Test {
	private final String strToEncrypt = "string for testing encryption";
	private final String secret = "encryptionSecret";
	
	@DisplayName("Success - encrypt success, decrypt success")
	@Test
	public void testEncryptSuccessDecryptSuccess() {
		String encryptedString = AES256.encrypt(strToEncrypt, secret);
		String decryptedString = AES256.decrypt(encryptedString, secret);
		assertEquals(decryptedString, strToEncrypt);
	}
	
	@DisplayName("Error - decrypt error")
	@Test
	public void testDecryptError() {
		String decryptedString = AES256.decrypt(null, secret);
		assertEquals(null, decryptedString);
	}
	
	@DisplayName("Error - encrypt error")
	@Test
	public void testEncryptError() {
		String encryptedString = AES256.encrypt(null, secret);
		assertEquals(null, encryptedString);
	}

	@DisplayName("Exception - test private constructor throws exception")
	@Test
	public void testPrivateConstructor() throws Exception {
		assertThrows(
				InvocationTargetException.class,
				() -> {
					Constructor<AES256> constructor =  AES256.class.getDeclaredConstructor();
					constructor.setAccessible(true);
					constructor.newInstance((Object[]) null);
				}
		);
	}
	
}
