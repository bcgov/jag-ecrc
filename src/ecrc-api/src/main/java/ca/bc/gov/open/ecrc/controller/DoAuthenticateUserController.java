package ca.bc.gov.open.ecrc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author shaunmillargov
 *
 */
@RestController
public class DoAuthenticateUserController {

	@GetMapping("/doAuthenticateUser")
	public String doAuthenticateUser() {
		return "Greetings from the doAuthenticateUser endpoint";
	}

}

