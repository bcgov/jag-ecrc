package ca.bc.gov.open.ecrc.controller;


import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import ca.bc.gov.open.ecrc.model.RequestNewCRCApplicant;
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
 * @author sivakaruna
 *
 */
@RestController
public class CreateApplicantController {

	@Autowired
	EcrcServices ecrcServices;

	Logger logger = LoggerFactory.getLogger(CreateApplicantController.class);

	@PostMapping(value = "/private/createApplicant", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createApplicant(@RequestBody RequestCreateApplicant applicantInfo) {
		MDC.put(EcrcConstants.REQUEST_GUID, applicantInfo.getRequestGuid());
		MDC.put(EcrcConstants.REQUEST_ENDPOINT,  "createApplicant");
		logger.info("Create applicant request received [{}]", applicantInfo.getRequestGuid());

		try {
			return ecrcServices.createApplicant(applicantInfo);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}
	}

	@PostMapping(value = "/private/createNewCRCApplicant", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createNewApplicant(@RequestBody RequestNewCRCApplicant newCRCApplicant) {
		MDC.put(EcrcConstants.REQUEST_GUID, newCRCApplicant.getRequestGuid());
		MDC.put(EcrcConstants.REQUEST_ENDPOINT,  "createApplicant");
		MDC.put(EcrcConstants.REQUEST_APPLTYPE, newCRCApplicant.getApplType());
		logger.info("Create new applicant request received [{}]", newCRCApplicant.getRequestGuid());

		try {
			return ecrcServices.createNewCRCApplicant(newCRCApplicant);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
			MDC.remove(EcrcConstants.REQUEST_APPLTYPE);
		}
	}
}

