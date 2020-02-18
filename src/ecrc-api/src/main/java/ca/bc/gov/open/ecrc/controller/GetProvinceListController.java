package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

/**
 * @author sivakaruna
 *
 */
@RestController
public class GetProvinceListController {

	@Autowired
	EcrcServices ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping(value = "/getProvinceList", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getProvinceList() throws EcrcServiceException {
		return ecrcServices.getProvinceList();

	}
}
