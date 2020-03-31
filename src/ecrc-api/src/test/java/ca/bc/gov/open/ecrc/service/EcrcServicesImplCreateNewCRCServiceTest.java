package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;

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

import static org.mockito.ArgumentMatchers.any;

public class EcrcServicesImplCreateNewCRCServiceTest {

	private ResponseEntity<String> serviceResult;

	private String result = "{\n" 
			+ "\"ServiceId\": \"22465\",\n" 
			+ "\"Message\": \"Success\",\n"
			+ "\"ResponseCode\": \"0\"\n" 
			+ "	}";

	@InjectMocks
	EcrcServicesImpl ecrcServices;

	@Mock
	EcrcWebMethodsService ecrcWebMethodsService;

	@Mock
	EcrcProperties ecrcProperties;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
		Mockito.when(ecrcProperties.getCreateNewCRCServiceUri()).thenReturn("createNewService?%s");
	}

	@DisplayName("Success - ecrcService get CreateNewCRCService")
	@Test
	public void testGetCreateNewCRCServiceSuccess() throws EcrcServiceException {
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
				.thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
		serviceResult = ecrcServices.createNewCRCService(new RequestNewCRCService());
		Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
		Assertions.assertEquals(result, serviceResult.getBody());
	}
}
