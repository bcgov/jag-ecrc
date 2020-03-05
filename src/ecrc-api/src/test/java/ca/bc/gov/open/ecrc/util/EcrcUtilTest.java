package ca.bc.gov.open.ecrc.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class EcrcUtilTest {

	@DisplayName("Success - encodeUriSpaces EcrcUtil")
	@Test
	void testSuccess() {

		Assertions.assertEquals("Hello%20World", EcrcUtil.encodeUriSpaces("Hello World"));
		Assertions.assertNotNull(new EcrcUtil());

	}
}
