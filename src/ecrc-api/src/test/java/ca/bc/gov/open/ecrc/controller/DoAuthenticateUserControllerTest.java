package ca.bc.gov.open.ecrc.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;


public class DoAuthenticateUserControllerTest {

	DoAuthenticateUserController auth = new DoAuthenticateUserController();
	
	@Test
	public void testOddValidOrg() {
		ResponseEntity<String> result = auth.doAuthenticateUser(1);
		Assertions.assertEquals(result.getBody().toString(), "{\"bscsorg\" : \"0\"}");
	}
	@Test
	public void testEvenValidOrg() {
		ResponseEntity<String> result = auth.doAuthenticateUser(2);
		Assertions.assertEquals(result.getBody().toString(), "{\"bscsorg\" : \"1\"}");
	}
}
