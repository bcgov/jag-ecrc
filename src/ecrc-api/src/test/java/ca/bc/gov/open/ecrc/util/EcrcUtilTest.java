package ca.bc.gov.open.ecrc.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import static org.junit.jupiter.api.Assertions.assertThrows;

class EcrcUtilTest {

	@DisplayName("Success - encodeUriSpaces EcrcUtil")
	@Test
	void testSuccess() {
		Assertions.assertEquals("Hello%20World", EcrcUtil.encodeUriSpaces("Hello World"));
	}

	@DisplayName("Exception - test private constructor throws exception")
	@Test
	public void testPrivateConstructor() throws Exception {
		assertThrows(
				InvocationTargetException.class,
				() -> {
					Constructor<EcrcUtil> constructor =  EcrcUtil.class.getDeclaredConstructor();
					constructor.setAccessible(true);
					constructor.newInstance((Object[]) null);
				}
		);
	}
}
