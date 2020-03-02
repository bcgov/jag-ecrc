package ca.bc.gov.open.ecrc.controller;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ContextConfiguration;

import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * 
 * @author BrendanBeachBCJ
 *
 */
@ContextConfiguration
public class GetJwtSecretTest {
	
	@InjectMocks
	private GetJwtSecretController getFrontEndSecretController;
	
	@Mock
	private EcrcServices ecrcServices;
	
	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@DisplayName("Success - get front end secret controller")
	@Test
	public void testSuccess() {
		
	}
}
