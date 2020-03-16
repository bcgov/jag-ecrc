package ca.bc.gov.open.ecrc.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;

/**
 * 
 * @author BrendanBeachBCJ
 *
 */
@ContextConfiguration
public class LinksControllerTest {

	@InjectMocks
	private LinksController linksController = new LinksController();

	@Mock
	private EcrcServices ecrcServices;

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@DisplayName("Success - links controller")

	@Test
	public void testValidLink() throws EcrcServiceException {
		Map<String,String> links = new HashMap<String,String>();
		links.put("test1", "http://test1.ca");
		Mockito.when(ecrcServices.getLinks()).thenReturn(links);
		ResponseEntity<Object> result = linksController.getLinks("SOMEUUID");
		Assertions.assertEquals(result.getBody(), links);
	}

	@DisplayName("Error - links controller")
	@Test
	void testError() throws EcrcServiceException {
		when(ecrcServices.getLinks()).thenThrow(new EcrcServiceException(EcrcExceptionConstants.DATA_NOT_FOUND_ERROR));
		ResponseEntity<Object> response = linksController.getLinks("SOMEUUID");
		Assertions.assertEquals(
				String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()),
				response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

}
