package ca.bc.gov.open.ecrc.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AppHomeController {

	@CrossOrigin(origins = "/**")
	@GetMapping("/validateorg")
	public ResponseEntity<String> validateOrg(@RequestParam(required=true) int org) {
		String resp = (org % 2 == 0) ? "1" : "0";

		return new ResponseEntity<>(String.format("{\"bscsorg\" : \"%s\"}", resp), HttpStatus.OK);
	}
	
}
