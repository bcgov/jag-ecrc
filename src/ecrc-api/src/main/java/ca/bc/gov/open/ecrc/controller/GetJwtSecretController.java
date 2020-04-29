package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.util.EcrcConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * Endpoint that provides the jwt secret from the properties file.
 * 
 * @author BrendanBeachBCJ
 *
 */
@RestController
public class GetJwtSecretController {
	
	private final Logger logger = LoggerFactory.getLogger(GetJwtSecretController.class);
	
	@Autowired
	private EcrcServices ecrcServices;
	
	@GetMapping(value = "/initialHandshake")
	public ResponseEntity<String> getJwtSecret(@RequestParam(required=true) String requestGuid) {
		MDC.put(EcrcConstants.REQUEST_GUID, requestGuid);
		MDC.put(EcrcConstants.REQUEST_ENDPOINT,  "initialHandshake");
		logger.info("Initial handshake received: [{}]", requestGuid);
		try {
			return new ResponseEntity<>(ecrcServices.getJwtSecret(), HttpStatus.OK);		
		} catch (EcrcServiceException e) {
			logger.error("Error in service: ", e);
			return new ResponseEntity<>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
							EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.NOT_FOUND);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}
	}
}
