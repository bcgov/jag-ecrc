package ca.bc.gov.open.ecrc;

import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import org.springframework.stereotype.Service;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * Service Implementation class. 
 * 
 * @author shaunmillargov
 *
 */
@Service
public class EcrcServicesImpl implements EcrcServices {
	
	public DoAuthenticateUser doAuthenticateUser(String accessCode) throws EcrcServiceException {
		DoAuthenticateUser authenticateUser = new DoAuthenticateUser();
		DoAuthenticateUser.AccessCodeResponse accessCodeResponse = new DoAuthenticateUser.AccessCodeResponse();

		DoAuthenticateUser.ScopeLevels scopeLevels = new DoAuthenticateUser.ScopeLevels();

		//Setup Mock data
		accessCodeResponse.setOrgPartyId(1);
		accessCodeResponse.setOrgNm("orgNm");
		accessCodeResponse.setContactSurnameNm("contactSurnameNm");
		accessCodeResponse.setContactFirstNm("contactFirstNm");
		accessCodeResponse.setAddressLine1("addressLine1");
		accessCodeResponse.setAddressLine2("addressLine2");
		accessCodeResponse.setCityNm("cityNm");
		accessCodeResponse.setProvinceNm("provinceNm");
		accessCodeResponse.setCountryNm("countryNm");
		accessCodeResponse.setPostalCodeTxt("postalCodeTxt");
		accessCodeResponse.setContactPhoneNo("contactPhoneNo");
		accessCodeResponse.setContactFaxNo("contactFaxNo");
		accessCodeResponse.setOrgApplicantRelationship("orgApplicantRelationship");
		accessCodeResponse.setDefaultScheduleTypeCd("defaultScheduleTypeCd");
		accessCodeResponse.setDefaultCrcScopeLevelCd("defaultCrcScopeLevelCd");
		accessCodeResponse.setTicketFoundYn("Y");
		accessCodeResponse.setAlreadyUsedYn("Y");
		accessCodeResponse.setValidDateRangeYn("Y");

		DoAuthenticateUser.ScheduleTypes scheduleTypes = new DoAuthenticateUser.ScheduleTypes();


		authenticateUser.setMessage("Test");
		authenticateUser.setAccessCodeResponse(accessCodeResponse);
		authenticateUser.setResponseCode(1);
		authenticateUser.setScheduleTypes(scheduleTypes);
		authenticateUser.setScopeLevels(scopeLevels);

		return authenticateUser;
	}
	
}

