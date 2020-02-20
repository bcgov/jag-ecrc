package ca.bc.gov.open.ecrc.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for Ecrc service Exception
 * 
 * @author sivakaruna
 *
 */
class EcrcServiceExceptionTest {

	@DisplayName("Success - ecrcServiceException with message")
	@Test
	void throwExceptionWithMessage() {
		EcrcServiceException exception = Assertions.assertThrows(EcrcServiceException.class, () -> {
			throw new EcrcServiceException("error");
		});
		String expectedMessage = "error";
		Assertions.assertTrue(exception.getMessage().contains(expectedMessage));
	}

	@DisplayName("Success - ecrcServiceException with cause")
	@Test
	void throwExceptionWithCause() {
		EcrcServiceException exception = Assertions.assertThrows(EcrcServiceException.class, () -> {
			throw new EcrcServiceException("error", new Throwable("cause"));
		});
		String expectedMessage = "error";
		String expectedCause = "cause";
		exception.getCause().getMessage();
		Assertions.assertTrue(exception.getMessage().contains(expectedMessage));
		Assertions.assertTrue(exception.getCause().getMessage().contains(expectedCause));

	}

}
