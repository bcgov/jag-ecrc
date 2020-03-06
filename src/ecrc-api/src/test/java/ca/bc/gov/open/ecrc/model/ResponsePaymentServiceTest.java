package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ResponsePaymentServiceTest {

	@DisplayName("Success - payment response object")
	@Test
	public void testPaymentResponseSuccess() {
		ResponsePaymentService response = new ResponsePaymentService();
		response.setRespCode(0);
		response.setRespMsg("message");
		response.setRespValue("value");

		Assertions.assertEquals(0, response.getRespCode());
		Assertions.assertEquals("message", response.getRespMsg());
		Assertions.assertEquals("value", response.getRespValue());
	}

}
