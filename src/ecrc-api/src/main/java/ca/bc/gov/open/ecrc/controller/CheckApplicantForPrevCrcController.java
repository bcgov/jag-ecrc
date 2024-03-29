package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCheckApplicantForPrevCrc;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.util.EcrcConstants;
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

	@PostMapping(value = "/private/checkApplicantForPrevCRC", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkApplicantForPrevCrc(@RequestBody RequestCheckApplicantForPrevCrc applicantInfo) {
		MDC.put(EcrcConstants.REQUEST_GUID, applicantInfo.getRequestGuid());
		MDC.put(EcrcConstants.REQUEST_ENDPOINT,  "checkApplicantForPrevCRC");
		logger.info("Check applicant for previous CRC request received [{}]", applicantInfo.getRequestGuid());

		try {
			return ecrcServices.checkApplicantForPrevCrc(applicantInfo);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
							EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
					HttpStatus.BAD_REQUEST);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}
	}
}
