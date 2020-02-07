package ca.bc.gov.open.ecrc.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import ca.bc.gov.open.ecrc.controller.AppHomeController;


public class AppHomeControllerTest {

	AppHomeController appHome = new AppHomeController();
	
	@Test
	public void testOddValidOrg() {
		ResponseEntity<String> result = appHome.validateOrg(1);
		Assertions.assertEquals(result.getBody().toString(), "{\"bscsorg\" : \"0\"}");
	}
	@Test
	public void testEvenValidOrg() {
		ResponseEntity<String> result = appHome.validateOrg(2);
		Assertions.assertEquals(result.getBody().toString(), "{\"bscsorg\" : \"1\"}");
	}
}
