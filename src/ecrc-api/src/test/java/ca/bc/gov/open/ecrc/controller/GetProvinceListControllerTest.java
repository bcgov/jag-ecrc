package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.when;

/**
 * Tests for get province list controller
 *  
 * @author sivakaruna
 *
 */
class GetProvinceListControllerTest {

	private static final String GUID = "SOMEUUID";

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	GetProvinceListController getProvinceListController = new GetProvinceListController();

	@DisplayName("Success - getProvinceList controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		when(ecrcServices.getProvinceList(GUID)).thenReturn(new ResponseEntity<String>(
				"{\"provinces\":{\"province\":[{\"name\":\"BRITISH COLUMBIA\"},{\"name\":\"ALBERTA\"},{\"name\":\"MANITOBA\"},{\"name\":\"NEW BRUNSWICK\"},{\"name\":\"NEWFOUNDLAND\"},{\"name\":\"NORTH WEST TERRITORIES\"},{\"name\":\"NOVA SCOTIA\"},{\"name\":\"NUNAVUT\"},{\"name\":\"ONTARIO\"},{\"name\":\"PRINCE EDWARD ISLAND\"},{\"name\":\"QUEBEC\"},{\"name\":\"SASKATCHEWAN\"},{\"name\":\"YUKON\"}]},\"message\":\"Success\",\"responseCode\":0}",
				HttpStatus.OK));
		ResponseEntity<String> response = getProvinceListController.getProvinceList("SOMEUUID");
		Assert.assertEquals(
				"{\"provinces\":{\"province\":[{\"name\":\"BRITISH COLUMBIA\"},{\"name\":\"ALBERTA\"},{\"name\":\"MANITOBA\"},{\"name\":\"NEW BRUNSWICK\"},{\"name\":\"NEWFOUNDLAND\"},{\"name\":\"NORTH WEST TERRITORIES\"},{\"name\":\"NOVA SCOTIA\"},{\"name\":\"NUNAVUT\"},{\"name\":\"ONTARIO\"},{\"name\":\"PRINCE EDWARD ISLAND\"},{\"name\":\"QUEBEC\"},{\"name\":\"SASKATCHEWAN\"},{\"name\":\"YUKON\"}]},\"message\":\"Success\",\"responseCode\":0}",
				response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - getProvinceList controller")
	@Test
	void testFailure() throws EcrcServiceException {
		when(ecrcServices.getProvinceList(GUID)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = getProvinceListController.getProvinceList("SOMEUUID");
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.NOTFOUND.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - getProvinceList controller")
	@Test
	void testError() throws EcrcServiceException {
		when(ecrcServices.getProvinceList(GUID)).thenReturn(new ResponseEntity<>(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = getProvinceListController.getProvinceList(GUID);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	@DisplayName("Exception - getProvinceList controller")
	@Test
	void testException() throws EcrcServiceException {
		when(ecrcServices.getProvinceList(GUID)).thenThrow(new EcrcServiceException("FAIL"));
		ResponseEntity<String> response = getProvinceListController.getProvinceList(GUID);
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
