package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

@RestController
public class LinksController {
	
	@Autowired
	EcrcServices ecrcServices;
	
	@CrossOrigin(origins = "/**")
	@GetMapping(value = "/links")
	public ResponseEntity<Object> getLinks() throws EcrcServiceException {
		return new ResponseEntity<>(ecrcServices.getLinks(), HttpStatus.OK);
	}
	
}
