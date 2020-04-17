package ca.bc.gov.open.ecrc.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Tests for check applicant for previous crc request bean
 *  
 * @author sivakaruna
 *
 */
class RequestCheckApplicantForPrevCrcTest {

	private final String expectedQueryString = "?OrgTicketNumber=orgTicketNumber"
			+ "&Legal_Surname_Nm=legalSurnameNm"
			+ "&Legal_First_Nm=legalFirstNm"
			+ "&Birth_Dt=birthDt"
			+ "&Gender_Txt=genderTxt"
			+ "&Scope_Level_Cd=scopeLevelCd"
			+ "&Postal_Code_Txt=postalCodeTxt"
			+ "&Drivers_Lic_No=driversLicNo";
	
	@DisplayName("Success - checkApplicantForPrevCrc request queryString")
	@Test
	public void generateQueryStringTest() {
		RequestCheckApplicantForPrevCrc requestCheckApplicantForPrevCrc = new RequestCheckApplicantForPrevCrc();
		requestCheckApplicantForPrevCrc.setBirthDt("birthDt");
		requestCheckApplicantForPrevCrc.setDriversLicNo("driversLicNo");
		requestCheckApplicantForPrevCrc.setGenderTxt("genderTxt");
		requestCheckApplicantForPrevCrc.setLegalFirstNm("legalFirstNm");
		requestCheckApplicantForPrevCrc.setLegalSurnameNm("legalSurnameNm");
		requestCheckApplicantForPrevCrc.setPostalCodeTxt("postalCodeTxt");
		requestCheckApplicantForPrevCrc.setOrgTicketNumber("orgTicketNumber");
		requestCheckApplicantForPrevCrc.setScopeLevelCd("scopeLevelCd");
		requestCheckApplicantForPrevCrc.setRequestGuid("requestGuid");

		Assertions.assertEquals("birthDt", requestCheckApplicantForPrevCrc.getBirthDt());
		Assertions.assertEquals("driversLicNo", requestCheckApplicantForPrevCrc.getDriversLicNo());
		Assertions.assertEquals("genderTxt", requestCheckApplicantForPrevCrc.getGenderTxt());
		Assertions.assertEquals("legalFirstNm", requestCheckApplicantForPrevCrc.getLegalFirstNm());
		Assertions.assertEquals("legalSurnameNm", requestCheckApplicantForPrevCrc.getLegalSurnameNm());
		Assertions.assertEquals("postalCodeTxt", requestCheckApplicantForPrevCrc.getPostalCodeTxt());
		Assertions.assertEquals("orgTicketNumber", requestCheckApplicantForPrevCrc.getOrgTicketNumber());
		Assertions.assertEquals("scopeLevelCd", requestCheckApplicantForPrevCrc.getScopeLevelCd());
		Assertions.assertEquals("requestGuid", requestCheckApplicantForPrevCrc.getRequestGuid());
		
		Assertions.assertEquals(expectedQueryString, requestCheckApplicantForPrevCrc.toQueryString());
	}

}
