package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * Tests for new crc applicant request bean
 * 
 * @author sivakaruna
 *
 */
public class RequestNewCRCApplicantTest {

	@Test
	public void objectTest() {
		RequestNewCRCApplicant requestNewCRCApplicant = new RequestNewCRCApplicant();
		requestNewCRCApplicant.setApplType("applType");
		requestNewCRCApplicant.setApprovedPage("approvedPage");
		requestNewCRCApplicant.setDeclinedPage("declinedPage");
		requestNewCRCApplicant.setErrorPage("errorPage");
		requestNewCRCApplicant.setRequestCreateApplicant(new RequestCreateApplicant());
		requestNewCRCApplicant.setRequestNewCRCService(new RequestNewCRCService());
		requestNewCRCApplicant.setRequestGuid("requestGuid");

		Assertions.assertEquals("applType", requestNewCRCApplicant.getApplType());
		Assertions.assertEquals("approvedPage", requestNewCRCApplicant.getApprovedPage());
		Assertions.assertEquals("declinedPage", requestNewCRCApplicant.getDeclinedPage());
		Assertions.assertEquals("errorPage", requestNewCRCApplicant.getErrorPage());
		Assertions.assertEquals(RequestCreateApplicant.class,
				requestNewCRCApplicant.getRequestCreateApplicant().getClass());
		Assertions.assertEquals(RequestNewCRCService.class,
				requestNewCRCApplicant.getRequestNewCRCService().getClass());
		Assertions.assertEquals("requestGuid", requestNewCRCApplicant.getRequestGuid());

	}
}
