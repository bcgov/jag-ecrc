package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.EcrcServices;
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
	private EcrcServices ecrcServices;
	
	@CrossOrigin(origins = "/**")
	@GetMapping(value = "/links")
	public ResponseEntity<Object> getLinks() {
		try {
			return new ResponseEntity<>(ecrcServices.getLinks(), HttpStatus.OK);
		} catch (EcrcServiceException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
