package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCheckApplicantForPrevCrc;
import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * Check applicant for previous crc controller
 * 
 * @author sivakaruna
 *
 */
@RestController
public class CheckApplicantForPrevCrcController {
	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(CheckApplicantForPrevCrcController.class);

	@GetMapping(value = "/checkApplicantForPrevCRC", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkApplicantForPrevCrc(@RequestBody RequestCheckApplicantForPrevCrc applicantInfo) {
		logger.info("Create applicant request received {}", applicantInfo.getRequestGuid());

		try {
			return ecrcServices.checkApplicantForPrevCrc(applicantInfo);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
							EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.BAD_REQUEST);
		}
	}
}
