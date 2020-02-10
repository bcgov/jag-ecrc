package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import ca.bc.gov.open.ecrc.utils.ObjectToJSONUtil;
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
	EcrcServicesImpl ecrcServices = new EcrcServicesImpl();
	@CrossOrigin(origins = "/**")
	@GetMapping("/doAuthenticateUser")
	public ResponseEntity<String> doAuthenticateUser(@RequestParam(required=true) String org) {
		String resp;
		try {
			DoAuthenticateUser doAuthenticateUser = ecrcServices.doAuthenticateUser(org);
			resp = ObjectToJSONUtil.jaxbObjectToJSON(doAuthenticateUser);
			return new ResponseEntity<String>(resp, HttpStatus.OK);
		} catch(EcrcServiceException e) {
			return new ResponseEntity<>("Failed to find user", HttpStatus.BAD_REQUEST);
		}

	}

}

