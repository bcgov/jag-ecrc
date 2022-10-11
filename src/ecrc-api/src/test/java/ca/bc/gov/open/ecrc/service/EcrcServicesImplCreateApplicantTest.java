package ca.bc.gov.open.ecrc.service;

import static org.mockito.ArgumentMatchers.any;

import ca.bc.gov.open.ecrc.objects.CreateApplicant;
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
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;
import javassist.NotFoundException;

/**
 * Tests for create applicant service
 *  
 * @author sivakaruna
 *
 */
class EcrcServicesImplCreateApplicantTest {

    private ResponseEntity<String> serviceResult;
	private final String result = "{\n" 
			+ "		\"Message\": \"Success\",\n" 
			+ "		\"ResponseCode\": \"0\",\n"
			+ "		\"PartyId\": \"49061\"\n" 
			+ "}";
    
    @InjectMocks
    EcrcServicesImpl ecrcServices;

    @Mock
    EcrcWebMethodsService ecrcWebMethodsService;

    @Mock
    EcrcProperties ecrcProperties;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.openMocks(this);
		Mockito.when(ecrcProperties.getCreateApplicantUri()).thenReturn("/createApplicant");
	}

	@DisplayName("Success - ecrcService createApplicant")
	@Test
	public void testCreateApplicantResultSuccess() throws EcrcServiceException {
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any(CreateApplicant.class), any()))
				.thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
		serviceResult = ecrcServices.createApplicant(new RequestCreateApplicant());
		Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
		Assertions.assertEquals(result, serviceResult.getBody());
	}
}
