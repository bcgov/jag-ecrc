package ca.bc.gov.open.ecrc.service;

import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import javassist.NotFoundException;

/**
 * Tests for get province list service
 *  
 * @author sivakaruna
 *
 */
class EcrcServicesImplGetProvinceListTest {

    private ResponseEntity<String> serviceResult;
	private final String result = "{\n" + "\"Provinces\": {\n" + "\"Province\": [\n" + "{\n"
			+ "\"Name\": \"BRITISH COLUMBIA\"\n" + "},\n" + "{\n" + "\"Name\": \"ALBERTA\"\n" + "},\n" + "{\n"
			+ "\"Name\": \"MANITOBA\"\n" + "},\n" + "{\n" + "\"Name\": \"NEW BRUNSWICK\"\n" + "},\n" + "{\n"
			+ "\"Name\": \"NEWFOUNDLAND\"\n" + "},\n" + "{\n" + "\"Name\": \"NORTH WEST TERRITORIES\"\n" + "},\n"
			+ "{\n" + "\"Name\": \"NOVA SCOTIA\"\n" + "},\n" + "{\n" + "\"Name\": \"NUNAVUT\"\n" + "},\n" + "{\n"
			+ "\"Name\": \"ONTARIO\"\n" + "},\n" + "{\n" + "\"Name\": \"PRINCE EDWARD ISLAND\"\n" + "},\n" + "{\n"
			+ "\"Name\": \"QUEBEC\"\n" + "},\n" + "{\n" + "\"Name\": \"SASKATCHEWAN\"\n" + "},\n" + "{\n"
			+ "\"Name\": \"YUKON\"\n" + "}\n ]\n },\n" + "\"Message\": \"Success\",\n" + "\"ResponseCode\": \"0\"\n"
			+ "}";

	@InjectMocks
	EcrcServicesImpl ecrcServices;

	@Mock
	EcrcWebMethodsService ecrcWebMethodsService;

	@Mock
	EcrcProperties ecrcProperties;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getGetProvincesListUri()).thenReturn("/getProvinceList");
	}

	@DisplayName("Success - ecrcService getProvinceList")
	@Test
	public void testGetProvinceListResultSuccess() throws NotFoundException, EcrcServiceException {
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any()))
				.thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
		serviceResult = ecrcServices.getProvinceList();
		Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
		Assertions.assertEquals(result, serviceResult.getBody());
	}

}
