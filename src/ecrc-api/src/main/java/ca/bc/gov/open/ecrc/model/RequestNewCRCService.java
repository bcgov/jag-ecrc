package ca.bc.gov.open.ecrc.model;

import org.apache.cxf.common.util.StringUtils;

/***
 * Object for requesting new CRC Service
 */
public class RequestNewCRCService {
    private String orgTicketNumber;
    private String scheduleTypeCd;
    private String scopeLevelCd;
    private String applPartyId;
    private String orgApplToPay;
    private String applicantPosn;
    private String childCareFacNm;
    private String governingBodyNm;
    private String sessionId;
    private String invoiceId;
    private String authReleaseEIVVendorYN;
    private String authConductCRCCheckYN;
    private String authReleaseToOrgYN;
    private String applIdentityVerifiedEIVYN;
    private String eivPassDetailsResults;
    private String requestGuid;

    public String getOrgTicketNumber() {
        if (!StringUtils.isEmpty(orgTicketNumber))
            return orgTicketNumber.trim();

        return null;

    }

    public void setOrgTicketNumber(String orgTicketNumber) {
        this.orgTicketNumber = orgTicketNumber;
    }

    public String getScheduleTypeCd() {
        return scheduleTypeCd;
    }

    public void setScheduleTypeCd(String scheduleTypeCd) {
        this.scheduleTypeCd = scheduleTypeCd;
    }

    public String getScopeLevelCd() {
        return scopeLevelCd;
    }

    public void setScopeLevelCd(String scopeLevelCd) {
        this.scopeLevelCd = scopeLevelCd;
    }

    public String getApplPartyId() {
        return applPartyId;
    }

    public void setApplPartyId(String applPartyId) {
        this.applPartyId = applPartyId;
    }

    public String getOrgApplToPay() {
        return orgApplToPay;
    }

    public void setOrgApplToPay(String orgApplToPay) {
        this.orgApplToPay = orgApplToPay;
    }

    public String getApplicantPosn() {
        return applicantPosn;
    }

    public void setApplicantPosn(String applicantPosn) {
        this.applicantPosn = applicantPosn;
    }

    public String getChildCareFacNm() {
        return childCareFacNm;
    }

    public void setChildCareFacNm(String childCareFacNm) {
        this.childCareFacNm = childCareFacNm;
    }

    public String getGoverningBodyNm() {
        return governingBodyNm;
    }

    public void setGoverningBodyNm(String governingBodyNm) {
        this.governingBodyNm = governingBodyNm;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getAuthReleaseEIVVendorYN() {
        return authReleaseEIVVendorYN;
    }

    public void setAuthReleaseEIVVendorYN(String authReleaseEIVVendorYN) {
        this.authReleaseEIVVendorYN = authReleaseEIVVendorYN;
    }

    public String getAuthConductCRCCheckYN() {
        return authConductCRCCheckYN;
    }

    public void setAuthConductCRCCheckYN(String authConductCRCCheckYN) {
        this.authConductCRCCheckYN = authConductCRCCheckYN;
    }

    public String getAuthReleaseToOrgYN() {
        return authReleaseToOrgYN;
    }

    public void setAuthReleaseToOrgYN(String authReleaseToOrgYN) {
        this.authReleaseToOrgYN = authReleaseToOrgYN;
    }

    public String getApplIdentityVerifiedEIVYN() {
        return applIdentityVerifiedEIVYN;
    }

    public void setApplIdentityVerifiedEIVYN(String applIdentityVerifiedEIVYN) {
        this.applIdentityVerifiedEIVYN = applIdentityVerifiedEIVYN;
    }

    public String getEivPassDetailsResults() {
        return eivPassDetailsResults;
    }

    public void setEivPassDetailsResults(String eivPassDetailsResults) {  this.eivPassDetailsResults = eivPassDetailsResults; }

    public String getRequestGuid() { return requestGuid; }

    public void setRequestGuid(String requestGuid) { this.requestGuid = requestGuid; }


    public String toQueryString() {
        return "?" +
                "OrgTicketNumber=" + orgTicketNumber +
                "&Schedule_Type_Cd=" + scheduleTypeCd +
                "&Scope_Level_Cd=" + scopeLevelCd +
                "&Appl_Party_Id=" + applPartyId +
                "&Org_Appl_To_Pay=" + orgApplToPay +
                "&Applicant_Posn=" + applicantPosn +
                "&Child_Care_Fac_Nm=" + childCareFacNm +
                "&Governing_Body_Nm=" + governingBodyNm +
                "&Session_Id=" + sessionId +
                "&Invoice_Id=" + invoiceId +
                "&Auth_Release_EIV_Vendor_YN=" + authReleaseEIVVendorYN +
                "&Auth_Conduct_CRC_Check_YN=" + authConductCRCCheckYN +
                "&Auth_Release_To_Org_YN=" + authReleaseToOrgYN +
                "&Appl_Identity_Verified_EIV_YN=" + applIdentityVerifiedEIVYN +
                "&EivPassDetailsResults=" + eivPassDetailsResults;
    }
}
