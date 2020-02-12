package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author shaunmillargov
 *
 */
@RestController
public class DoAuthenticateUserController {
	@Autowired
	private EcrcServicesImpl ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping("/doAuthenticateUser")
	public ResponseEntity<String> doAuthenticateUser(@RequestParam(required=true) String orgTicketId) {
		try {
			String result = ecrcServices.doAuthenticateUser(orgTicketId);
			if (result != null) {
				return new ResponseEntity<>(ecrcServices.doAuthenticateUser(orgTicketId), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR), HttpStatus.NOT_FOUND);
			}
		} catch(EcrcServiceException e) {
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR), HttpStatus.BAD_REQUEST);
		}
	}
}

