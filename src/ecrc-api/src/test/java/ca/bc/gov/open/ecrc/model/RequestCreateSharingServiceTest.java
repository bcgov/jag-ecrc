package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for create sharing service request bean
 *  
 * @author sivakaruna
 *
 */
class RequestCreateSharingServiceTest {

	private final String expectedQueryString = "?"
			+ "OrgTicketNumber=orgTicketNumber"
			+ "&Appl_Party_Id=applPartyId"
			+ "&Scope_Level_Cd=scopeLevelCd"
			+ "&Applicant_Posn=applicantPosn"
			+ "&Auth_Release_EIV_Vendor_YN=authReleaseEivVendorYN"
			+ "&Auth_Release_To_Org_YN=authReleaseToOrgYN"
			+ "&Appl_Identity_Verified_EIV_YN=applIdentityVerifiedEivYN"
			+ "&Previous_Service_Id=previousServiceId"
			+ "&EivPassDetailsResults=eivPassDetailsResults";

	@DisplayName("Success - createSharingService request queryString")
	@Test
	public void generateQueryStringTest() {
		RequestCreateSharingService requestCreateSharingService = new RequestCreateSharingService();
		requestCreateSharingService.setApplicantPosn("applicantPosn");
		requestCreateSharingService.setApplIdentityVerifiedEivYN("applIdentityVerifiedEivYN");
		requestCreateSharingService.setApplPartyId("applPartyId");
		requestCreateSharingService.setAuthReleaseEivVendorYN("authReleaseEivVendorYN");
		requestCreateSharingService.setAuthReleaseToOrgYN("authReleaseToOrgYN");
		requestCreateSharingService.setEivPassDetailsResults("eivPassDetailsResults");
		requestCreateSharingService.setOrgTicketNumber("orgTicketNumber");
		requestCreateSharingService.setPreviousServiceId("previousServiceId");
		requestCreateSharingService.setScopeLevelCd("scopeLevelCd");
		requestCreateSharingService.setRequestGuid("requestGuid");

		Assertions.assertEquals("applicantPosn", requestCreateSharingService.getApplicantPosn());
		Assertions.assertEquals("applIdentityVerifiedEivYN", requestCreateSharingService.getApplIdentityVerifiedEivYN());
		Assertions.assertEquals("applPartyId", requestCreateSharingService.getApplPartyId());
		Assertions.assertEquals("authReleaseEivVendorYN", requestCreateSharingService.getAuthReleaseEivVendorYN());
		Assertions.assertEquals("authReleaseToOrgYN", requestCreateSharingService.getAuthReleaseToOrgYN());
		Assertions.assertEquals("eivPassDetailsResults", requestCreateSharingService.getEivPassDetailsResults());
		Assertions.assertEquals("orgTicketNumber", requestCreateSharingService.getOrgTicketNumber());
		Assertions.assertEquals("previousServiceId", requestCreateSharingService.getPreviousServiceId());
		Assertions.assertEquals("scopeLevelCd", requestCreateSharingService.getScopeLevelCd());
		Assertions.assertEquals("requestGuid", requestCreateSharingService.getRequestGuid());
		

		Assertions.assertEquals(expectedQueryString, requestCreateSharingService.toQueryString());
	}

}
