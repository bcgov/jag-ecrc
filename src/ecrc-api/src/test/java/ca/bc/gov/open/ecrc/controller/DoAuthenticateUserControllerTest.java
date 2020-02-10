package ca.bc.gov.open.ecrc.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import ca.bc.gov.open.ecrc.controller.DoAuthenticateUserController;

public class DoAuthenticateUserControllerTest {

	DoAuthenticateUserController auth = new DoAuthenticateUserController();
	
	@Test
	public void testOddValidOrg() {
		ResponseEntity<String> result = auth.doAuthenticateUser("Test");
		Assertions.assertEquals("{\"AccessCodeResponse\":{\"org_party_id\":1,\"org_nm\":\"orgNm\",\"contact_surname_nm\":\"contactSurnameNm\",\"contact_first_nm\":\"contactFirstNm\",\"address_line_1\":\"addressLine1\",\"address_line_2\":\"addressLine2\",\"city_nm\":\"cityNm\",\"province_nm\":\"provinceNm\",\"country_nm\":\"countryNm\",\"postal_code_txt\":\"postalCodeTxt\",\"contact_phone_no\":\"contactPhoneNo\",\"contact_fax_no\":\"contactFaxNo\",\"org_applicant_relationship\":\"orgApplicantRelationship\",\"default_schedule_type_cd\":\"defaultScheduleTypeCd\",\"default_crc_scope_level_cd\":\"defaultCrcScopeLevelCd\",\"ticket_found_yn\":\"Y\",\"already_used_yn\":\"Y\",\"valid_date_range_yn\":\"Y\"},\"ScopeLevels\":{},\"ScheduleTypes\":{},\"Message\":\"Test\",\"ResponseCode\":1}",result.getBody().toString());
	}
}
