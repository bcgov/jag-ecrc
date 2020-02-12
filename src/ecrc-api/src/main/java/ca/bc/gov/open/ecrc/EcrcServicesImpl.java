package ca.bc.gov.open.ecrc;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.objects.DoAuthenticateUser;
import ca.bc.gov.open.ecrc.objects.GetProvinceList;
import reactor.core.publisher.Mono;

/**
 * 
 * Service Implementation class.
 * 
 * @author shaunmillargov
 *
 */
@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class EcrcServicesImpl implements EcrcServices {

	@Autowired
	private EcrcProperties ecrcProps;

	private WebClient webClient = null;

	Logger logger = LoggerFactory.getLogger(EcrcServicesImpl.class);

	@Autowired
	ObjectMapper objectMapper;

	@PostConstruct
	public void InitService() {

		this.webClient = WebClient.builder().baseUrl(ecrcProps.getBaseUrl())
				.defaultHeaders(header -> header.setBasicAuth(ecrcProps.getUsername(), ecrcProps.getPassword()))
				.build();
	}

	public String doAuthenticateUser(String accessCode) throws EcrcServiceException {
		
		String _doAuthenticateUserUri = String.format(ecrcProps.getDoAuthenticateUserUri(), accessCode);
		
		Mono<DoAuthenticateUser> responseBody = this.webClient.get().uri(_doAuthenticateUserUri).retrieve()
				.bodyToMono(DoAuthenticateUser.class);

		try {
			if (responseBody.block().getResponseCode() == EcrcExceptionConstants.WEBSERVICE_STATUS_CODE_SUCCESS) {
				return objectMapper.writeValueAsString(responseBody.block());
			} else {
				return null;
			}
		} catch (JsonProcessingException e) {
			logger.error("Failed to convert to json processing exception");
			throw new EcrcServiceException(EcrcExceptionConstants.CONVERT_TO_JSON_ERROR, e);
		} catch (Exception e) {
			logger.error("Failed to convert to json general exception");
			throw new EcrcServiceException(EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR, e);
		}
	}

	public String getProvinceList() throws EcrcServiceException {
		Mono<GetProvinceList> responseBody = this.webClient.get().uri(ecrcProps.getGetProvincesListUri()).retrieve()
				.bodyToMono(GetProvinceList.class);
		String response;
		try {
			response = objectMapper.writeValueAsString(responseBody.block());
		} catch (JsonProcessingException e) {
			logger.error(e.getMessage());
			throw new EcrcServiceException(EcrcExceptionConstants.CONVERT_TO_JSON_ERROR, e);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new EcrcServiceException(EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR, e);
		}
		return response;
	}
}
