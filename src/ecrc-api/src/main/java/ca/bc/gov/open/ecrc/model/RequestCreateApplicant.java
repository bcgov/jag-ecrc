package ca.bc.gov.open.ecrc.model;

/**
 * Object for requesting create applicant 
 *  
 * @author sivakaruna
 *
 */
public class RequestCreateApplicant {
	
	private String orgTicketNumber;
	private String callPurpose;
	private String legalSurnameNm;
	private String legalFirstNm;
	private String legalSecondNm;
	private String birthDt;
	private String genderTxt;
	private String birthPlace;
	private String alias1SurnameNm;
	private String alias1FirstNm;
	private String alias1SecondNm;
	private String alias2SurnameNm;
	private String alias2FirstNm;
	private String alias2SecondNm;
	private String alias3SurnameNm;
	private String alias3FirstNm;
	private String alias3SecondNm;
	private String phoneNumber;
	private String addressLine1;
	private String addressLine2;
	private String cityNm;
	private String provinceNm;
	private String countryNm;
	private String postalCodeTxt;
	private String driversLicNo;

	public String getOrgTicketNumber() {
		return orgTicketNumber;
	}

	public void setOrgTicketNumber(String orgTicketNumber) {
		this.orgTicketNumber = orgTicketNumber;
	}

	public String getCallPurpose() {
		return callPurpose;
	}

	public void setCallPurpose(String callPurpose) {
		this.callPurpose = callPurpose;
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

	public String getLegalSecondNm() {
		return legalSecondNm;
	}

	public void setLegalSecondNm(String legalSecondNm) {
		this.legalSecondNm = legalSecondNm;
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

	public String getBirthPlace() {
		return birthPlace;
	}

	public void setBirthPlace(String birthPlace) {
		this.birthPlace = birthPlace;
	}

	public String getAlias1SurnameNm() {
		return alias1SurnameNm;
	}

	public void setAlias1SurnameNm(String alias1SurnameNm) {
		this.alias1SurnameNm = alias1SurnameNm;
	}

	public String getAlias1FirstNm() {
		return alias1FirstNm;
	}

	public void setAlias1FirstNm(String alias1FirstNm) {
		this.alias1FirstNm = alias1FirstNm;
	}

	public String getAlias1SecondNm() {
		return alias1SecondNm;
	}

	public void setAlias1SecondNm(String alias1SecondNm) {
		this.alias1SecondNm = alias1SecondNm;
	}

	public String getAlias2SurnameNm() {
		return alias2SurnameNm;
	}

	public void setAlias2SurnameNm(String alias2SurnameNm) {
		this.alias2SurnameNm = alias2SurnameNm;
	}

	public String getAlias2FirstNm() {
		return alias2FirstNm;
	}

	public void setAlias2FirstNm(String alias2FirstNm) {
		this.alias2FirstNm = alias2FirstNm;
	}

	public String getAlias2SecondNm() {
		return alias2SecondNm;
	}

	public void setAlias2SecondNm(String alias2SecondNm) {
		this.alias2SecondNm = alias2SecondNm;
	}

	public String getAlias3SurnameNm() {
		return alias3SurnameNm;
	}

	public void setAlias3SurnameNm(String alias3SurnameNm) {
		this.alias3SurnameNm = alias3SurnameNm;
	}

	public String getAlias3FirstNm() {
		return alias3FirstNm;
	}

	public void setAlias3FirstNm(String alias3FirstNm) {
		this.alias3FirstNm = alias3FirstNm;
	}

	public String getAlias3SecondNm() {
		return alias3SecondNm;
	}

	public void setAlias3SecondNm(String alias3SecondNm) {
		this.alias3SecondNm = alias3SecondNm;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getCityNm() {
		return cityNm;
	}

	public void setCityNm(String cityNm) {
		this.cityNm = cityNm;
	}

	public String getProvinceNm() {
		return provinceNm;
	}

	public void setProvinceNm(String provinceNm) {
		this.provinceNm = provinceNm;
	}

	public String getCountryNm() {
		return countryNm;
	}

	public void setCountryNm(String countryNm) {
		this.countryNm = countryNm;
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

	public String toQueryString() {
        return "? " +
        		"& OrgTicketNumber  = " + orgTicketNumber +
        		"& Call_Purpose     = " + callPurpose +
        		"& Legal_Surname_Nm = " + legalSurnameNm +
        		"& Legal_First_Nm   = " + legalFirstNm +
        		"& Legal_Second_Nm  = " + legalSecondNm +
        		"& Birth_Dt         = " + birthDt +
        		"& Gender_Txt       = " + genderTxt +
        		"& Birth_Place      = " + birthPlace +
        		"& Alias1_Surname_Nm= " + alias1SurnameNm +
        		"& Alias1_First_Nm  = " + alias1FirstNm +
        		"& Alias1_Second_Nm = " + alias1SecondNm +
        		"& Alias2_Surname_Nm= " + alias2SurnameNm +
        		"& Alias2_First_Nm  = " + alias2FirstNm+
        		"& Alias2_Second_Nm = " + alias2SecondNm +
        		"& Alias3_Surname_Nm= " + alias3SurnameNm +
        		"& Alias3_First_Nm  = " + alias3FirstNm +
        		"& Alias3_Second_Nm = " + alias3SecondNm +
        		"& Phone_Number     = " + phoneNumber +
        		"& Address_Line1    = " + addressLine1 +
        		"& Address_Line2    = " + addressLine2 +
        		"& City_Nm          = " + cityNm +
        		"& Province_Nm      = " + provinceNm +
        		"& Country_Nm       = " + countryNm +
        		"& Postal_Code_Txt  = " + postalCodeTxt +
        		"& Drivers_Lic_No   = " + driversLicNo;
    }
}
