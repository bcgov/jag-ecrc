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
import ca.bc.gov.open.ecrc.model.RequestCreateApplicant;

@ContextConfiguration
class CreateApplicantControllerTest {

	@BeforeEach
	public void initMocks() {
		MockitoAnnotations.initMocks(this);
	}

	@Mock
	EcrcServices ecrcServices;

	@InjectMocks
	CreateApplicantController createApplicantController = new CreateApplicantController();

	@DisplayName("Success - createApplicant controller")
	@Test
	void testSuccess() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenReturn(new ResponseEntity<String>(
				"{\"message\":\"Success\",\"partyId\":49060,\"responseCode\":0}", HttpStatus.OK));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assert.assertEquals("{\"message\":\"Success\",\"partyId\":49060,\"responseCode\":0}", response.getBody());
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@DisplayName("Failure - createApplicant controller")
	@Test
	void testFailure() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenReturn(new ResponseEntity<>(
				"{\"message\":\"Requested data not found\", \"responseCode\":1}", HttpStatus.NOT_FOUND));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assert.assertEquals("{\"message\":\"Requested data not found\", \"responseCode\":1}", response.getBody());
		Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@DisplayName("Error - createApplicant controller")
	@Test
	void testError() throws EcrcServiceException {
		RequestCreateApplicant request = new RequestCreateApplicant();
		when(ecrcServices.createApplicant(request)).thenReturn(new ResponseEntity<>(
				"{\"message\":\"Requested data not found\", \"responseCode\":1}", HttpStatus.BAD_REQUEST));
		ResponseEntity<String> response = createApplicantController.createApplicant(request);
		Assert.assertEquals("{\"message\":\"Requested data not found\", \"responseCode\":1}", response.getBody());
		Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

}
