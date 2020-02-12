package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

/**
 * @author sivakaruna
 *
 */
@RestController
public class GetProvinceListController {

	@Autowired
	EcrcServices ecrcServices;

	@CrossOrigin(origins = "/**")
	@GetMapping("/getProvinceList")
	public ResponseEntity<String> getProvinceList() {
		try {
			String result = ecrcServices.getProvinceList();
			if (result != null) {
				return new ResponseEntity<String>(result, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR), HttpStatus.NOT_FOUND);
			}
		} catch (EcrcServiceException e) {
			e.printStackTrace();
			return new ResponseEntity<String>(
					String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE, e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}
}
