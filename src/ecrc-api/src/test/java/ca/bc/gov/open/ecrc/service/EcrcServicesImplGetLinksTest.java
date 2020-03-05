package ca.bc.gov.open.ecrc.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

public class EcrcServicesImplGetLinksTest {
	
	@InjectMocks
	EcrcServicesImpl ecrcServices;
	
	@Mock
	EcrcProperties ecrcProperties;
	
	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@DisplayName("Success - ecrcService getJwtSecret")
	@Test
	public void testGetLinksSuccess() throws EcrcServiceException {
		Map<String, String> links = new HashMap<String, String>();
		links.put("Link1", "www.test1.ca");
		links.put("Link2", "www.test2.ca");
		when(ecrcProperties.getLinks()).thenReturn(links);
		assertEquals(links, ecrcServices.getLinks());
	}
}
