package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	public String getProvinceList() {
		String response = null;
		try {
			response = ecrcServices.getProvinceList();
		} catch (EcrcServiceException e) {
			e.printStackTrace();
			response = String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE, e.getMessage());
		}
		return response;
	}
}
