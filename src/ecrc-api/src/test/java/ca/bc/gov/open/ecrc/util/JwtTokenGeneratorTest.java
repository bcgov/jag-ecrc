package ca.bc.gov.open.ecrc.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import net.minidev.json.JSONObject;

/**
 * Tests for JwtTokenGenerator
 * 
 * @author 196916
 *
 */
class JwtTokenGeneratorTest {

	@DisplayName("Success - generateFEAccessToken JwtTokenGenerator")
	@Test
	void testSuccess() {

		String result = JwtTokenGenerator.generateFEAccessToken(new JSONObject(), "abc", "secret", 0, "role");
		Assertions.assertTrue(result.length() > 0);
	}

}
