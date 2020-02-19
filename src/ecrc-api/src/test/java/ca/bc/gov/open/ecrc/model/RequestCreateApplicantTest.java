package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for create applicant request bean
 *  
 * @author sivakaruna
 *
 */
class RequestCreateApplicantTest {

	private final String expectedQueryString = "?"
			+ "OrgTicketNumber=orgTicketNumber"
			+ "&Call_Purpose=callPurpose"
			+ "&Legal_Surname_Nm=legalSurnameNm"
			+ "&Legal_First_Nm=legalFirstNm"
			+ "&Legal_Second_Nm=legalSecondNm"
			+ "&Birth_Dt=birthDt"
			+ "&Gender_Txt=genderTxt"
			+ "&Birth_Place=birthPlace"
			+ "&Alias1_Surname_Nm=alias1SurnameNm"
			+ "&Alias1_First_Nm=alias1FirstNm"
			+ "&Alias1_Second_Nm=alias1SecondNm"
			+ "&Alias2_Surname_Nm=alias2SurnameNm"
			+ "&Alias2_First_Nm=alias2FirstNm"
			+ "&Alias2_Second_Nm=alias2SecondNm"
			+ "&Alias3_Surname_Nm=alias3SurnameNm"
			+ "&Alias3_First_Nm=alias3FirstNm"
			+ "&Alias3_Second_Nm=alias3SecondNm"
			+ "&Phone_Number=phoneNumber"
			+ "&Address_Line1=addressLine1"
			+ "&Address_Line2=addressLine2"
			+ "&City_Nm=cityNm"
			+ "&Province_Nm=provinceNm"
			+ "&Country_Nm=countryNm"
			+ "&Postal_Code_Txt=postalCodeTxt"
			+ "&Drivers_Lic_No=driversLicNo";

	@DisplayName("Success - createApplicant request queryString")
	@Test
	public void generateQueryStringTest() {
		RequestCreateApplicant requestCreateApplicant = new RequestCreateApplicant();
		requestCreateApplicant.setAddressLine1("addressLine1");
		requestCreateApplicant.setAddressLine2("addressLine2");
		requestCreateApplicant.setAlias1FirstNm("alias1FirstNm");
		requestCreateApplicant.setAlias1SecondNm("alias1SecondNm");
		requestCreateApplicant.setAlias1SurnameNm("alias1SurnameNm");
		requestCreateApplicant.setAlias2FirstNm("alias2FirstNm");
		requestCreateApplicant.setAlias2SecondNm("alias2SecondNm");
		requestCreateApplicant.setAlias2SurnameNm("alias2SurnameNm");
		requestCreateApplicant.setAlias3FirstNm("alias3FirstNm");
		requestCreateApplicant.setAlias3SecondNm("alias3SecondNm");
		requestCreateApplicant.setAlias3SurnameNm("alias3SurnameNm");
		requestCreateApplicant.setBirthDt("birthDt");
		requestCreateApplicant.setBirthPlace("birthPlace");
		requestCreateApplicant.setCallPurpose("callPurpose");
		requestCreateApplicant.setCityNm("cityNm");
		requestCreateApplicant.setCountryNm("countryNm");
		requestCreateApplicant.setDriversLicNo("driversLicNo");
		requestCreateApplicant.setGenderTxt("genderTxt");
		requestCreateApplicant.setLegalFirstNm("legalFirstNm");
		requestCreateApplicant.setLegalSecondNm("legalSecondNm");
		requestCreateApplicant.setLegalSurnameNm("legalSurnameNm");
		requestCreateApplicant.setOrgTicketNumber("orgTicketNumber");
		requestCreateApplicant.setPhoneNumber("phoneNumber");
		requestCreateApplicant.setPostalCodeTxt("postalCodeTxt");
		requestCreateApplicant.setProvinceNm("provinceNm");

		Assertions.assertEquals(expectedQueryString, requestCreateApplicant.toQueryString());
	}

}
