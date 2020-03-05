package ca.bc.gov.open.ecrc.model;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class ResponseBCSCClientDetailsTest {
	@DisplayName("Success - get and set client details")
	@Test
	public void testGetAndSetClientDetailsSuccess() {
		ResponseBCSCClientDetails details = new ResponseBCSCClientDetails();
		details.setPrimaryDocumentedSurname("Surname");
		details.setPrimaryDocumentedGivenName("GivenName");
		details.setPrimaryDocumentedGivenNames("GivenNames");
		details.setBirthDate("1991-07-21");
		details.setSex("Male");
		details.setStreetAddress("1234 Test Rd.");
		details.setProvince("BC");
		details.setPostalCode("A1A 1A1");
		details.setCountry("Canada");
		
		assertEquals("Surname", details.getPrimaryDocumentedSurname());
		assertEquals("GivenName", details.getPrimaryDocumentedGivenName());
		assertEquals("GivenNames", details.getPrimaryDocumentedGivenNames());
		assertEquals("1991-07-21", details.getBirthDate());
		assertEquals("Male", details.getSex());
		assertEquals("1234 Test Rd.", details.getStreetAddress());
		assertEquals("BC", details.getProvince());
		assertEquals("A1A 1A1", details.getPostalCode());
		assertEquals("Canada", details.getCountry());
	}
}
