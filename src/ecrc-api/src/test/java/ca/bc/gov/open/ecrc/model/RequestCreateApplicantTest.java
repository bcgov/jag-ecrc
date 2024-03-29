package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.util.MultiValueMap;

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
			+ "&City_Nm=cityNm"
			+ "&Province_Nm=provinceNm"
			+ "&Country_Nm=countryNm"
			+ "&Postal_Code_Txt=postalCodeTxt"
			+ "&Drivers_Lic_No=driversLicNo"
			+ "&Email_Address=emailAddress"
			+ "&Email_Type=emailType";

	private final String expectedEncodedQueryString = "?OrgTicketNumber=orgTicketNumber&Call_Purpose=callPurpose&Legal_Surname_Nm=legalSurnameNm&Legal_First_Nm=legalFirstNm&Legal_Second_Nm=legalSecondNm&Birth_Dt=birthDt&Gender_Txt=genderTxt&Birth_Place=birthPlace&Alias1_Surname_Nm=alias1SurnameNm&Alias1_First_Nm=alias1FirstNm&Alias1_Second_Nm=alias1SecondNm&Alias2_Surname_Nm=alias2SurnameNm&Alias2_First_Nm=alias2FirstNm&Alias2_Second_Nm=alias2SecondNm&Alias3_Surname_Nm=alias3SurnameNm&Alias3_First_Nm=alias3FirstNm&Alias3_Second_Nm=alias3SecondNm&Phone_Number=phoneNumber&Address_Line1=addressLine1&addressLine1&City_Nm=cityNm%26cityNm&Province_Nm=provinceNm&Country_Nm=&Postal_Code_Txt=postalCodeTxt&Drivers_Lic_No=driversLicNo&Email_Address=emailAddress&Email_Type=emailType";
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
		requestCreateApplicant.setEmailAddress("emailAddress");
		requestCreateApplicant.setEmailType("emailType");
		requestCreateApplicant.setRequestGuid("requestGuid");

		Assertions.assertEquals("addressLine1", requestCreateApplicant.getAddressLine1());
		Assertions.assertEquals("addressLine2", requestCreateApplicant.getAddressLine2());
		Assertions.assertEquals("alias1FirstNm", requestCreateApplicant.getAlias1FirstNm());
		Assertions.assertEquals("alias1SecondNm", requestCreateApplicant.getAlias1SecondNm());
		Assertions.assertEquals("alias1SurnameNm", requestCreateApplicant.getAlias1SurnameNm());
		Assertions.assertEquals("alias2FirstNm", requestCreateApplicant.getAlias2FirstNm());
		Assertions.assertEquals("alias2SecondNm", requestCreateApplicant.getAlias2SecondNm());
		Assertions.assertEquals("alias2SurnameNm", requestCreateApplicant.getAlias2SurnameNm());
		Assertions.assertEquals("alias3FirstNm", requestCreateApplicant.getAlias3FirstNm());
		Assertions.assertEquals("alias3SecondNm", requestCreateApplicant.getAlias3SecondNm());
		Assertions.assertEquals("alias3SurnameNm", requestCreateApplicant.getAlias3SurnameNm());
		Assertions.assertEquals("birthDt", requestCreateApplicant.getBirthDt());
		Assertions.assertEquals("birthPlace", requestCreateApplicant.getBirthPlace());
		Assertions.assertEquals("callPurpose", requestCreateApplicant.getCallPurpose());
		Assertions.assertEquals("cityNm", requestCreateApplicant.getCityNm());
		Assertions.assertEquals("countryNm", requestCreateApplicant.getCountryNm());
		Assertions.assertEquals("driversLicNo", requestCreateApplicant.getDriversLicNo());
		Assertions.assertEquals("genderTxt", requestCreateApplicant.getGenderTxt());
		Assertions.assertEquals("legalFirstNm", requestCreateApplicant.getLegalFirstNm());
		Assertions.assertEquals("legalSecondNm", requestCreateApplicant.getLegalSecondNm());
		Assertions.assertEquals("legalSurnameNm", requestCreateApplicant.getLegalSurnameNm());
		Assertions.assertEquals("orgTicketNumber", requestCreateApplicant.getOrgTicketNumber());
		Assertions.assertEquals("phoneNumber", requestCreateApplicant.getPhoneNumber());
		Assertions.assertEquals("postalCodeTxt", requestCreateApplicant.getPostalCodeTxt());
		Assertions.assertEquals("provinceNm", requestCreateApplicant.getProvinceNm());
		Assertions.assertEquals("emailAddress", requestCreateApplicant.getEmailAddress());
		Assertions.assertEquals("emailType", requestCreateApplicant.getEmailType());

		Assertions.assertEquals(expectedQueryString, requestCreateApplicant.toQueryString());
	}

	@DisplayName("Success - createApplicant request queryString with encoded data")
	@Test
	public void generateQueryStringTestWithAmp() {
		RequestCreateApplicant requestCreateApplicant = new RequestCreateApplicant();
		requestCreateApplicant.setAddressLine1("addressLine1&addressLine1");
		requestCreateApplicant.setAddressLine2("addressLine2&addressLine1");
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
		requestCreateApplicant.setCityNm("cityNm&cityNm");
		requestCreateApplicant.setCountryNm(null);
		requestCreateApplicant.setDriversLicNo("driversLicNo");
		requestCreateApplicant.setGenderTxt("genderTxt");
		requestCreateApplicant.setLegalFirstNm("legalFirstNm");
		requestCreateApplicant.setLegalSecondNm("legalSecondNm");
		requestCreateApplicant.setLegalSurnameNm("legalSurnameNm");
		requestCreateApplicant.setOrgTicketNumber("orgTicketNumber");
		requestCreateApplicant.setPhoneNumber("phoneNumber");
		requestCreateApplicant.setPostalCodeTxt("postalCodeTxt");
		requestCreateApplicant.setProvinceNm("provinceNm");
		requestCreateApplicant.setEmailAddress("emailAddress");
		requestCreateApplicant.setEmailType("emailType");
		requestCreateApplicant.setRequestGuid("requestGuid");

		Assertions.assertEquals(expectedEncodedQueryString, requestCreateApplicant.toQueryString());

	}


	@DisplayName("Success - createApplicant request map")
	@Test
	public void generateMapTest() {
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
		requestCreateApplicant.setEmailAddress("emailAddress");
		requestCreateApplicant.setEmailType("emailType");
		requestCreateApplicant.setRequestGuid("requestGuid");

		MultiValueMap<String, String> result = requestCreateApplicant.buildQuery();

		Assertions.assertEquals(27, result.size());
		Assertions.assertEquals("addressLine1", result.get("Address_Line1").get(0));
		Assertions.assertEquals("alias1FirstNm", result.get("Alias1_First_Nm").get(0));
		Assertions.assertEquals("alias1SecondNm", result.get("Alias1_Second_Nm").get(0));
		Assertions.assertEquals("alias1SurnameNm", result.get("Alias1_Surname_Nm").get(0));
		Assertions.assertEquals("alias2FirstNm", result.get("Alias2_First_Nm").get(0));
		Assertions.assertEquals("alias2SecondNm", result.get("Alias2_Second_Nm").get(0));
		Assertions.assertEquals("alias2SurnameNm", result.get("Alias2_Surname_Nm").get(0));
		Assertions.assertEquals("alias3FirstNm", result.get("Alias3_First_Nm").get(0));
		Assertions.assertEquals("alias3SecondNm", result.get("Alias3_Second_Nm").get(0));
		Assertions.assertEquals("alias3SurnameNm", result.get("Alias3_Surname_Nm").get(0));
		Assertions.assertEquals("birthDt", result.get("Birth_Dt").get(0));
		Assertions.assertEquals("birthPlace", result.get("Birth_Place").get(0));
		Assertions.assertEquals("callPurpose", result.get("Call_Purpose").get(0));
		Assertions.assertEquals("cityNm", result.get("City_Nm").get(0));
		Assertions.assertEquals("countryNm", result.get("Country_Nm").get(0));
		Assertions.assertEquals("driversLicNo", result.get("Drivers_Lic_No").get(0));
		Assertions.assertEquals("genderTxt", result.get("Gender_Txt").get(0));
		Assertions.assertEquals("legalFirstNm", result.get("Legal_First_Nm").get(0));
		Assertions.assertEquals("legalSecondNm", result.get("Legal_Second_Nm").get(0));
		Assertions.assertEquals("legalSurnameNm", result.get("Legal_Surname_Nm").get(0));
		Assertions.assertEquals("orgTicketNumber", result.get("OrgTicketNumber").get(0));
		Assertions.assertEquals("phoneNumber", result.get("Phone_Number").get(0));
		Assertions.assertEquals("postalCodeTxt", result.get("Postal_Code_Txt").get(0));
		Assertions.assertEquals("provinceNm", result.get("Province_Nm").get(0));
		Assertions.assertEquals("emailAddress", result.get("Email_Address").get(0));
		Assertions.assertEquals("emailType", result.get("Email_Type").get(0));

	}


}
