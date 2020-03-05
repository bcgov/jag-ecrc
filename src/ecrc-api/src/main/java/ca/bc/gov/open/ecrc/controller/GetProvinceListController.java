package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

import java.util.UUID;

/**
 * @author sivakaruna
 *
 */
@RestController
public class GetProvinceListController {

	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(GetProvinceListController.class);

	@GetMapping(value = "/protected/getProvinceList", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getProvinceList() throws EcrcServiceException {
		//TODO: Extract guid generated from front end
		logger.info("Get province list request received {}", UUID.randomUUID());
		return ecrcServices.getProvinceList();

	}
}
