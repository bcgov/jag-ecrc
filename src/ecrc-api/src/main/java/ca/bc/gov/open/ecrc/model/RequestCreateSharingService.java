package ca.bc.gov.open.ecrc.model;

/**
 * Object for requesting create sharing service 
 *  
 * @author sivakaruna
 *
 */
public class RequestCreateSharingService {
	
	private String orgTicketNumber;
	private String applPartyId;
	private String scopeLevelCd;
	private String applicantPosn;
	private String authReleaseEivVendorYN;
	private String authReleaseToOrgYN;
	private String applIdentityVerifiedEivYN;
	private String previousServiceId;
	private String eivPassDetailsResults;
	private String requestGuid;
	
	public String getOrgTicketNumber() {
		return orgTicketNumber;
	}

	public void setOrgTicketNumber(String orgTicketNumber) {
		this.orgTicketNumber = orgTicketNumber;
	}

	public String getApplPartyId() {
		return applPartyId;
	}

	public void setApplPartyId(String applPartyId) {
		this.applPartyId = applPartyId;
	}

	public String getScopeLevelCd() {
		return scopeLevelCd;
	}

	public void setScopeLevelCd(String scopeLevelCd) {
		this.scopeLevelCd = scopeLevelCd;
	}

	public String getApplicantPosn() {
		return applicantPosn;
	}

	public void setApplicantPosn(String applicantPosn) {
		this.applicantPosn = applicantPosn;
	}

	public String getAuthReleaseEivVendorYN() {
		return authReleaseEivVendorYN;
	}

	public void setAuthReleaseEivVendorYN(String authReleaseEivVendorYN) {
		this.authReleaseEivVendorYN = authReleaseEivVendorYN;
	}

	public String getAuthReleaseToOrgYN() {
		return authReleaseToOrgYN;
	}

	public void setAuthReleaseToOrgYN(String authReleaseToOrgYN) {
		this.authReleaseToOrgYN = authReleaseToOrgYN;
	}

	public String getApplIdentityVerifiedEivYN() {
		return applIdentityVerifiedEivYN;
	}

	public void setApplIdentityVerifiedEivYN(String applIdentityVerifiedEivYN) {
		this.applIdentityVerifiedEivYN = applIdentityVerifiedEivYN;
	}

	public String getPreviousServiceId() {
		return previousServiceId;
	}

	public void setPreviousServiceId(String previousServiceId) {
		this.previousServiceId = previousServiceId;
	}

	public String getEivPassDetailsResults() {
		return eivPassDetailsResults;
	}

	public void setEivPassDetailsResults(String eivPassDetailsResults) {
		this.eivPassDetailsResults = eivPassDetailsResults;
	}

	public String getRequestGuid() {
		return requestGuid;
	}

	public void setRequestGuid(String requestGuid) {
		this.requestGuid = requestGuid;
	}

	public String toQueryString() {
        return 	"?OrgTicketNumber=" + orgTicketNumber +
        		"&Appl_Party_Id=" + applPartyId +
        		"&Scope_Level_Cd=" + scopeLevelCd +
        		"&Applicant_Posn=" + applicantPosn +
        		"&Auth_Release_EIV_Vendor_YN=" + authReleaseEivVendorYN +
        		"&Auth_Release_To_Org_YN=" + authReleaseToOrgYN +
        		"&Appl_Identity_Verified_EIV_YN=" + applIdentityVerifiedEivYN +
        		"&Previous_Service_Id=" + previousServiceId +
        		"&EivPassDetailsResults=" + eivPassDetailsResults;
    }
}
