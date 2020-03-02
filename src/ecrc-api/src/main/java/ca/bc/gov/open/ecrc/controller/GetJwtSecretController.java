package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;

@RestController
public class GetJwtSecretController {
	
	private final Logger logger = LoggerFactory.getLogger(GetJwtSecretController.class);
	
	@Autowired
	private EcrcServices ecrcServices;
	
	@RequestMapping(value = "/initialHandshake", method = RequestMethod.GET) 
	public ResponseEntity<String> getJwtSecret() {
		try {
			return new ResponseEntity<>(ecrcServices.getJwtSecret(), HttpStatus.OK);		
		} catch (EcrcServiceException e) {
			logger.debug("DEBUG Stack:", e);
			return new ResponseEntity<>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
							EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.NOT_FOUND);
		}
	}
}