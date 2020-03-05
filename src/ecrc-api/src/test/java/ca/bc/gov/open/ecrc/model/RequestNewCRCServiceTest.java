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
        requestNewCRCService.setSchedule_Type_Cd("schedule_Type_Cd");
        requestNewCRCService.setScope_Level_Cd("scope_Level_Cd");
        requestNewCRCService.setAppl_Party_Id("appl_Party_Id");
        requestNewCRCService.setOrg_Appl_To_Pay("org_Appl_To_Pay");
        requestNewCRCService.setApplicant_Posn("applicant_Posn");
        requestNewCRCService.setChild_Care_Fac_Nm("child_Care_Fac_Nm");
        requestNewCRCService.setGoverning_Body_Nm("governing_Body_Nm");
        requestNewCRCService.setSession_Id("session_Id");
        requestNewCRCService.setInvoice_Id("invoice_Id");
        requestNewCRCService.setAuth_Release_EIV_Vendor_YN("auth_Release_EIV_Vendor_YN");
        requestNewCRCService.setAuth_Conduct_CRC_Check_YN("auth_Conduct_CRC_Check_YN");
        requestNewCRCService.setAuth_Release_To_Org_YN("auth_Release_To_Org_YN");
        requestNewCRCService.setAppl_Identity_Verified_EIV_YN("appl_Identity_Verified_EIV_YN");
        requestNewCRCService.setEivPassDetailsResults("eivPassDetailsResults");

		Assertions.assertEquals(requestNewCRCService.getOrgTicketNumber(), "orgTicketNumber");
		Assertions.assertEquals(requestNewCRCService.getSchedule_Type_Cd(), "schedule_Type_Cd");
		Assertions.assertEquals(requestNewCRCService.getScope_Level_Cd(), "scope_Level_Cd");
		Assertions.assertEquals(requestNewCRCService.getAppl_Party_Id(), "appl_Party_Id");
		Assertions.assertEquals(requestNewCRCService.getOrg_Appl_To_Pay(), "org_Appl_To_Pay");
		Assertions.assertEquals(requestNewCRCService.getApplicant_Posn(), "applicant_Posn");
		Assertions.assertEquals(requestNewCRCService.getChild_Care_Fac_Nm(), "child_Care_Fac_Nm");
		Assertions.assertEquals(requestNewCRCService.getGoverning_Body_Nm(), "governing_Body_Nm");
		Assertions.assertEquals(requestNewCRCService.getSession_Id(), "session_Id");
		Assertions.assertEquals(requestNewCRCService.getInvoice_Id(), "invoice_Id");
		Assertions.assertEquals(requestNewCRCService.getAuth_Release_EIV_Vendor_YN(), "auth_Release_EIV_Vendor_YN");
		Assertions.assertEquals(requestNewCRCService.getAuth_Conduct_CRC_Check_YN(), "auth_Conduct_CRC_Check_YN");
		Assertions.assertEquals(requestNewCRCService.getAuth_Release_To_Org_YN(), "auth_Release_To_Org_YN");
		Assertions.assertEquals(requestNewCRCService.getAppl_Identity_Verified_EIV_YN(),
				"appl_Identity_Verified_EIV_YN");
		Assertions.assertEquals(requestNewCRCService.getEivPassDetailsResults(), "eivPassDetailsResults");
        
        Assertions.assertEquals(expectedQueryString, requestNewCRCService.toQueryString());
    }
}
