package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * 
 * @author shaunmillargov
 *
 */
@RestController
public class DoAuthenticateUserController {
	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(DoAuthenticateUserController.class);

	@GetMapping(value = "/protected/doAuthenticateUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> doAuthenticateUser(@RequestParam(required=true) String orgTicketNumber) throws EcrcServiceException, NotFoundException {
		//TODO: Extract guid generated from front end
		logger.info("Do Authenticate request received {}", UUID.randomUUID());
		return  ecrcServices.doAuthenticateUser(orgTicketNumber);

	}
}

