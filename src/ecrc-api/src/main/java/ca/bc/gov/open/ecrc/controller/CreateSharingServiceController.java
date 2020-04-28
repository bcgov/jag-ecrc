package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCreateSharingService;
import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * Create sharing service controller
 * 
 * @author sivakaruna
 *
 */
@RestController
public class CreateSharingServiceController {

	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(CreateSharingServiceController.class);

	@PostMapping(value = "/private/createSharingService", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createSharingService(@RequestBody RequestCreateSharingService serviceInfo) {
		MDC.put("request.guid", serviceInfo.getRequestGuid());
		MDC.put("request.endpoint",  "createSharingService");
		logger.info("Create sharing service request received [{}]", serviceInfo.getRequestGuid());

		try {
			return ecrcServices.createSharingService(serviceInfo);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
							EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.BAD_REQUEST);
		}
	}
}
