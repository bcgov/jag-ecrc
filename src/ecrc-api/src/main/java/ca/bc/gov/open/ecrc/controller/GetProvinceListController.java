package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.util.EcrcConstants;
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
	public ResponseEntity<String> getProvinceList(@RequestParam(required=true) String requestGuid) {
		MDC.put(EcrcConstants.REQUEST_GUID, requestGuid);
		MDC.put(EcrcConstants.REQUEST_ENDPOINT,  "getProvinceList");
		logger.info("Get province list request received [{}]", requestGuid);
		try {
			return ecrcServices.getProvinceList(requestGuid);
		} catch (Exception ex) {
			logger.error("Error in ecrc service: ", ex);
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
		} finally {
			MDC.remove(EcrcConstants.REQUEST_GUID);
			MDC.remove(EcrcConstants.REQUEST_ENDPOINT);
		}
	}
}
