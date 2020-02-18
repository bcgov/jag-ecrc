package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;

/**
 * @author sivakaruna
 *
 */
@RestController
public class CreateApplicantController {

	@Autowired
	EcrcServices ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping(value = "/createApplicant", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createApplicant(@RequestBody RequestCreateApplicant applicantInfo) throws EcrcServiceException {
		
		return ecrcServices.createApplicant(applicantInfo);
		
	}
}

