package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;

/**
 * 
 * Controller for links for side bar navigation.
 * 
 * @author BrendanBeachBCJ
 *
 */
@RestController
public class LinksController {

	private final Logger logger = LoggerFactory.getLogger(LinksController.class);

	@Autowired
	EcrcServices ecrcServices;

	@GetMapping(value = "/protected/links", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> getLinks(@RequestParam(required=true) String requestGuid) {
		MDC.put("request.guid", requestGuid);
		MDC.put("request.endpoint",  "links");
		logger.info("Get links request received [{}]", requestGuid);

		try {
			return new ResponseEntity<>(ecrcServices.getLinks(), HttpStatus.OK);
		} catch (EcrcServiceException e) {
			logger.debug("DEBUG Stack:", e);
			return new ResponseEntity<>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
							EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.NOT_FOUND);
		}
	}

}
