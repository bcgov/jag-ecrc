package ca.bc.gov.open.ecrc.model;

/**
 * Object for requesting check applicant for previous CRC
 *  
 * @author sivakaruna
 *
 */
public class RequestCheckApplicantForPrevCrc {
	
	private String orgTicketNumber;
	private String legalSurnameNm;
	private String legalFirstNm;
	private String birthDt;
	private String genderTxt;
	private String postalCodeTxt;
	private String driversLicNo;
	private String scopeLevelCd;
	private String previousServiceId;
	private String requestGuid;

	public String getOrgTicketNumber() {
		return orgTicketNumber;
	}

	public void setOrgTicketNumber(String orgTicketNumber) {
		this.orgTicketNumber = orgTicketNumber;
	}

	public String getLegalSurnameNm() {
		return legalSurnameNm;
	}

	public void setLegalSurnameNm(String legalSurnameNm) {
		this.legalSurnameNm = legalSurnameNm;
	}

	public String getLegalFirstNm() {
		return legalFirstNm;
	}

	public void setLegalFirstNm(String legalFirstNm) {
		this.legalFirstNm = legalFirstNm;
	}

	public String getBirthDt() {
		return birthDt;
	}

	public void setBirthDt(String birthDt) {
		this.birthDt = birthDt;
	}

	public String getGenderTxt() {
		return genderTxt;
	}

	public void setGenderTxt(String genderTxt) {
		this.genderTxt = genderTxt;
	}

	public String getPostalCodeTxt() {
		return postalCodeTxt;
	}

	public void setPostalCodeTxt(String postalCodeTxt) {
		this.postalCodeTxt = postalCodeTxt;
	}

	public String getDriversLicNo() {
		return driversLicNo;
	}

	public void setDriversLicNo(String driversLicNo) {
		this.driversLicNo = driversLicNo;
	}

	public String getScopeLevelCd() {
		return scopeLevelCd;
	}

	public void setScopeLevelCd(String scopeLevelCd) {
		this.scopeLevelCd = scopeLevelCd;
	}

	public String getPreviousServiceId() {
		return previousServiceId;
	}

	public void setPreviousServiceId(String previousServiceId) {
		this.previousServiceId = previousServiceId;
	}

	public String getRequestGuid() {
		return requestGuid;
	}

	public void setRequestGuid(String requestGuid) {
		this.requestGuid = requestGuid;
	}

	public String toQueryString() {
        return 	"?OrgTicketNumber=" + orgTicketNumber +
        		"&Legal_Surname_Nm=" + legalSurnameNm +
        		"&Legal_First_Nm=" + legalFirstNm +
        		"&Birth_Dt=" + birthDt +
        		"&Gender_Txt=" + genderTxt +
        		"&Postal_Code_Txt=" + postalCodeTxt +
        		"&Drivers_Lic_No=" + driversLicNo +
        		"&Scope_Level_Cd=" + scopeLevelCd +
        		"&Previous_Service_Id=" + previousServiceId;
    }
}
