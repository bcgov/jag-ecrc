package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
/**
 * 
 * Controller for links for side bar navigation.
 * 
 * @author BrendanBeachBCJ
 *
 */
@RestController
public class LinksController {
	
	@Autowired
	EcrcServices ecrcServices;
	
	@GetMapping(value = "/links", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> getLinks() {
		try {
			return new ResponseEntity<>(ecrcServices.getLinks(), HttpStatus.OK);
		} catch (EcrcServiceException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
