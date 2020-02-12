package ca.bc.gov.open.ecrc.controller;

import static org.mockito.Mockito.when;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;

import ca.bc.gov.open.ecrc.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

@ContextConfiguration
class GetProvinceListControllerTest {

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
		when(ecrcServices.getProvinceList()).thenReturn(
				"{\"provinces\":{\"province\":[{\"name\":\"BRITISH COLUMBIA\"},{\"name\":\"ALBERTA\"},{\"name\":\"MANITOBA\"},{\"name\":\"NEW BRUNSWICK\"},{\"name\":\"NEWFOUNDLAND\"},{\"name\":\"NORTH WEST TERRITORIES\"},{\"name\":\"NOVA SCOTIA\"},{\"name\":\"NUNAVUT\"},{\"name\":\"ONTARIO\"},{\"name\":\"PRINCE EDWARD ISLAND\"},{\"name\":\"QUEBEC\"},{\"name\":\"SASKATCHEWAN\"},{\"name\":\"YUKON\"}]},\"message\":\"Success\",\"responseCode\":0}");
		ResponseEntity<String> response = getProvinceListController.getProvinceList();
		Assert.assertEquals(
				"{\"provinces\":{\"province\":[{\"name\":\"BRITISH COLUMBIA\"},{\"name\":\"ALBERTA\"},{\"name\":\"MANITOBA\"},{\"name\":\"NEW BRUNSWICK\"},{\"name\":\"NEWFOUNDLAND\"},{\"name\":\"NORTH WEST TERRITORIES\"},{\"name\":\"NOVA SCOTIA\"},{\"name\":\"NUNAVUT\"},{\"name\":\"ONTARIO\"},{\"name\":\"PRINCE EDWARD ISLAND\"},{\"name\":\"QUEBEC\"},{\"name\":\"SASKATCHEWAN\"},{\"name\":\"YUKON\"}]},\"message\":\"Success\",\"responseCode\":0}",
				response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - getProvinceList controller")
	@Test
	void testFailure() throws EcrcServiceException {
		when(ecrcServices.getProvinceList()).thenReturn(null);
		ResponseEntity<String> response = getProvinceListController.getProvinceList();
		Assert.assertEquals("{\"message\":\"Requested data not found\", \"responseCode\":1}", response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - getProvinceList controller")
	@Test
	void testError() throws EcrcServiceException {
		when(ecrcServices.getProvinceList()).thenThrow(new EcrcServiceException("Exception"));
		ResponseEntity<String> response = getProvinceListController.getProvinceList();
		Assert.assertEquals("{\"message\":\"Exception\", \"responseCode\":1}", response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
}
