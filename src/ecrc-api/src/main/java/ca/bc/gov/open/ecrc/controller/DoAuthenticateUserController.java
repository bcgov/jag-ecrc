package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author shaunmillargov
 *
 */
@RestController
public class DoAuthenticateUserController {
	@Autowired
	private EcrcServicesImpl ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping("/doAuthenticateUser")
	public ResponseEntity<String> doAuthenticateUser(@RequestParam(required=true) String orgTicketId) throws EcrcServiceException {

		return  ecrcServices.doAuthenticateUser(orgTicketId);

	}
}

