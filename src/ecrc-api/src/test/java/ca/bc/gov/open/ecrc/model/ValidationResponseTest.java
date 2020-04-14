package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for ValidationResponse bean
 * 
 * @author sivakaruna
 *
 */
class ValidationResponseTest {

	@DisplayName("Success - ValidationResponse bean")
	@Test
	public void generateQueryStringTest() {
		ValidationResponse validationResponse = new ValidationResponse();
		validationResponse.setMessage("message");
		validationResponse.setValid(true);

		Assertions.assertEquals("message", validationResponse.getMessage());
		Assertions.assertEquals(true, validationResponse.isValid());
	}

}
