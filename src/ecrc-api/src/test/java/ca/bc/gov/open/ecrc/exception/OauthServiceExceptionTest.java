package ca.bc.gov.open.ecrc.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for Oauth service Exception
 * 
 * @author sivakaruna
 *
 */
class OauthServiceExceptionTest {

	@DisplayName("Success - OauthServiceException with message")
	@Test
	void throwExceptionWithMessage() {
		OauthServiceException exception = Assertions.assertThrows(OauthServiceException.class, () -> {
			throw new OauthServiceException("error");
		});
		String expectedMessage = "error";
		Assertions.assertTrue(exception.getMessage().contains(expectedMessage));
	}

	@DisplayName("Success - ecrcServiceException with cause")
	@Test
	void throwExceptionWithCause() {
		OauthServiceException exception = Assertions.assertThrows(OauthServiceException.class, () -> {
			throw new OauthServiceException("error", new Throwable("cause"));
		});
		String expectedMessage = "error";
		String expectedCause = "cause";
		exception.getCause().getMessage();
		Assertions.assertTrue(exception.getMessage().contains(expectedMessage));
		Assertions.assertTrue(exception.getCause().getMessage().contains(expectedCause));

	}

}
