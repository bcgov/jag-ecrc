package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestCheckApplicantForPrevCrc;
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
 * Tests for check applicant for previous crc service
 *  
 * @author sivakaruna
 *
 */
class EcrcServicesImplCheckApplicantForPrevCrcTest {

    private ResponseEntity<String> serviceResult;
	private final String result = "{\n" 
			+ "		\"Message\": \"Success\",\n" 
			+ "		\"ResponseCode\": \"0\",\n"
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
		Mockito.when(ecrcProperties.getCheckApplicantForPrevCrcUri()).thenReturn("/checkApplicantForPrevCrc%s");
	}

	@DisplayName("Success - ecrcService checkApplicantForPrevCrc")
	@Test
	public void testCheckApplicantForPrevCrcSuccess() throws EcrcServiceException {
		Mockito.when(ecrcWebMethodsService.callWebMethodsService(any(), any(), any()))
				.thenReturn(new ResponseEntity<>(result, HttpStatus.OK));
		serviceResult = ecrcServices.checkApplicantForPrevCrc(new RequestCheckApplicantForPrevCrc());
		Assertions.assertEquals(HttpStatus.OK, serviceResult.getStatusCode());
		Assertions.assertEquals(result, serviceResult.getBody());
	}
}
