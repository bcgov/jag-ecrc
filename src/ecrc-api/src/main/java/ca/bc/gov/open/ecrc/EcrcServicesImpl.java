package ca.bc.gov.open.ecrc;

import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.objects.GetProvinceList;
import reactor.core.publisher.Mono;

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

	private final WebClient webClient;

	@Autowired
	ObjectMapper objectMapper;

	@Value("${rest.getProvincesList}")
	private String provinceListUri;

	public EcrcServicesImpl(@Value("${rest.baseUrl}") final String baseUrl,
			@Value("${rest.userName}") final String userName, @Value("${rest.password}") final String password) {
		this.webClient = WebClient.builder().baseUrl(baseUrl)
				.defaultHeaders(header -> header.setBasicAuth(userName, password)).build();
	}

	public String doAuthenticateUser(String accessCode) throws EcrcServiceException {
		//TODO - code to be added here and change response object. 
		return null; 
	}

	public String getProvinceList() throws EcrcServiceException {
		Mono<GetProvinceList> responseBody = this.webClient.get().uri(provinceListUri).retrieve()
				.bodyToMono(GetProvinceList.class);
		String response;
		try {
			response = objectMapper.writeValueAsString(responseBody.block());
		} catch (JsonProcessingException e) {
			// TODO - Log exception
			throw new EcrcServiceException(EcrcExceptionConstants.CONVERT_TO_JSON_ERROR, e);
		} catch (Exception e) {
			// TODO - Log exception
			throw new EcrcServiceException(EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR, e);
		}
		return response;
	}

}
