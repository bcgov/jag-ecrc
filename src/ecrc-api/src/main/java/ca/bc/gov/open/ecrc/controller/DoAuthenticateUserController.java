package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
	EcrcServices ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping(value = "/doAuthenticateUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> doAuthenticateUser(@RequestParam(required=true) String orgTicketId) throws EcrcServiceException, NotFoundException {

		return  ecrcServices.doAuthenticateUser(orgTicketId);

	}
}

