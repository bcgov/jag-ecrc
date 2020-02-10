package ca.bc.gov.open.ecrc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
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
public class EcrcServicesImpl implements EcrcServices {

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
		// TODO - code to be added here and change response object.
		return null;
	}

	public String getProvinceList() throws EcrcServiceException {
		Mono<GetProvinceList> responseBody = this.webClient.get().uri(provinceListUri).retrieve()
				.bodyToMono(GetProvinceList.class);
		String response;
		try {
			response = objectMapper.writeValueAsString(responseBody.block());
		} catch (JsonProcessingException e) {
			throw new EcrcServiceException("JsonProcessingException");
		}
		return response;
	}

}
