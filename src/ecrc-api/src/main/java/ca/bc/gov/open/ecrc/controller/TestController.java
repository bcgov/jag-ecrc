package ca.bc.gov.open.ecrc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author shaunmillargov
 *
 */
@RestController
public class TestController {

	@GetMapping("/")
	public String test() {
		return "Greetings from Spring Boot!";
	}

}

