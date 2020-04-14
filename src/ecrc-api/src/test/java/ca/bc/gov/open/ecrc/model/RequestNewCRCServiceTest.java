package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RequestNewCRCServiceTest {
    private final String expectedQueryString = "?" +
            "OrgTicketNumber=orgTicketNumber" +
            "&Schedule_Type_Cd=schedule_Type_Cd" +
            "&Scope_Level_Cd=scope_Level_Cd" +
            "&Appl_Party_Id=appl_Party_Id" +
            "&Org_Appl_To_Pay=org_Appl_To_Pay" +
            "&Applicant_Posn=applicant_Posn" +
            "&Child_Care_Fac_Nm=child_Care_Fac_Nm" +
            "&Governing_Body_Nm=governing_Body_Nm" +
            "&Session_Id=session_Id" +
            "&Invoice_Id=invoice_Id" +
            "&Auth_Release_EIV_Vendor_YN=auth_Release_EIV_Vendor_YN" +
            "&Auth_Conduct_CRC_Check_YN=auth_Conduct_CRC_Check_YN" +
            "&Auth_Release_To_Org_YN=auth_Release_To_Org_YN" +
            "&Appl_Identity_Verified_EIV_YN=appl_Identity_Verified_EIV_YN" +
            "&EivPassDetailsResults=eivPassDetailsResults";
    @Test
    public void generateQueryStringTest() {
        RequestNewCRCService requestNewCRCService = new RequestNewCRCService();
        requestNewCRCService.setOrgTicketNumber("orgTicketNumber");
        requestNewCRCService.setScheduleTypeCd("schedule_Type_Cd");
        requestNewCRCService.setScopeLevelCd("scope_Level_Cd");
        requestNewCRCService.setApplPartyId("appl_Party_Id");
        requestNewCRCService.setOrgApplToPay("org_Appl_To_Pay");
        requestNewCRCService.setApplicantPosn("applicant_Posn");
        requestNewCRCService.setChildCareFacNm("child_Care_Fac_Nm");
        requestNewCRCService.setGoverningBodyNm("governing_Body_Nm");
        requestNewCRCService.setSessionId("session_Id");
        requestNewCRCService.setInvoiceId("invoice_Id");
        requestNewCRCService.setAuthReleaseEIVVendorYN("auth_Release_EIV_Vendor_YN");
        requestNewCRCService.setAuthConductCRCCheckYN("auth_Conduct_CRC_Check_YN");
        requestNewCRCService.setAuthReleaseToOrgYN("auth_Release_To_Org_YN");
        requestNewCRCService.setApplIdentityVerifiedEIVYN("appl_Identity_Verified_EIV_YN");
        requestNewCRCService.setEivPassDetailsResults("eivPassDetailsResults");
        requestNewCRCService.setRequestGuid("requestGuid");

		Assertions.assertEquals("orgTicketNumber", requestNewCRCService.getOrgTicketNumber());
		Assertions.assertEquals("schedule_Type_Cd", requestNewCRCService.getScheduleTypeCd());
		Assertions.assertEquals("scope_Level_Cd", requestNewCRCService.getScopeLevelCd());
		Assertions.assertEquals("appl_Party_Id", requestNewCRCService.getApplPartyId());
		Assertions.assertEquals("org_Appl_To_Pay", requestNewCRCService.getOrgApplToPay());
		Assertions.assertEquals("applicant_Posn", requestNewCRCService.getApplicantPosn());
		Assertions.assertEquals("child_Care_Fac_Nm", requestNewCRCService.getChildCareFacNm());
		Assertions.assertEquals("governing_Body_Nm", requestNewCRCService.getGoverningBodyNm());
		Assertions.assertEquals("session_Id", requestNewCRCService.getSessionId());
		Assertions.assertEquals("invoice_Id", requestNewCRCService.getInvoiceId());
		Assertions.assertEquals("auth_Release_EIV_Vendor_YN", requestNewCRCService.getAuthReleaseEIVVendorYN());
		Assertions.assertEquals("auth_Conduct_CRC_Check_YN", requestNewCRCService.getAuthConductCRCCheckYN());
		Assertions.assertEquals("auth_Release_To_Org_YN", requestNewCRCService.getAuthReleaseToOrgYN());
		Assertions.assertEquals("appl_Identity_Verified_EIV_YN",
				requestNewCRCService.getApplIdentityVerifiedEIVYN());
		Assertions.assertEquals("eivPassDetailsResults", requestNewCRCService.getEivPassDetailsResults());
        
        Assertions.assertEquals(expectedQueryString, requestNewCRCService.toQueryString());
    }
}
