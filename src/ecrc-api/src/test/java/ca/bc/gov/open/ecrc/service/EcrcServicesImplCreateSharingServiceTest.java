package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCreateSharingService;
import javassist.NotFoundException;
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

/**
 * Tests for create sharing service
 *  
 * @author sivakaruna
 *
 */
class EcrcServicesImplCreateSharingServiceTest {

    private ResponseEntity<String> serviceResult;
	private final String result = "{\n" 
			+ "		\"Message\": \"Success\",\n" 
			+ "		\"ResponseCode\": \"0\",\n"
			+ "		\"ServiceId\": \"49061\"\n" 
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
		Mockito.when(ecrcProperties.getCreateSharingServiceUri()).thenReturn("/createSharingService%s");
	}

	@DisplayName("Success - ecrcService createSharingService")
	@Test
	public void testCreateSharingServiceSuccess() throws NotFoundException, EcrcServiceException {
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
				.thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
		serviceResult = ecrcServices.createSharingService(new RequestCreateSharingService());
		Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
		Assertions.assertEquals(result, serviceResult.getBody());
	}
}
