package ca.bc.gov.open.ecrc;

import javax.annotation.PostConstruct;

import ca.bc.gov.open.ecrc.model.CRCService;
import ca.bc.gov.open.ecrc.objects.CreateNewCrcService;
import ca.bc.gov.open.ecrc.objects.GetNextSessionId;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import java.util.ArrayList;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import ca.bc.gov.open.ecrc.model.Link;

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

	private final Logger logger = LoggerFactory.getLogger(EcrcServicesImpl.class);

	@Autowired
	ObjectMapper objectMapper;

	@PostConstruct
	public void InitService() {

		this.webClient = WebClient.builder().baseUrl(ecrcProps.getBaseUrl())
				.defaultHeaders(header -> header.setBasicAuth(ecrcProps.getUsername(), ecrcProps.getPassword()))
				.build();
	}

	public ResponseEntity<String> doAuthenticateUser(String orgTicketNumber) {
		String _doAuthenticateUserUri = String.format(ecrcProps.getDoAuthenticateUserUri(), orgTicketNumber);
		return callWebMethodsService(_doAuthenticateUserUri, new DoAuthenticateUser());
	}

	public ArrayList<Link> getLinks() {
		//TODO: replace hard coded links with actual links
		ArrayList<Link> linkList = new ArrayList<Link>();
		Link link1 = new Link("test1", "www.google.com");
		Link link2 = new Link("test2", "www.google.ca");
		linkList.add(link1);
		linkList.add(link2);

		return linkList;
	}

	public ResponseEntity<String> getProvinceList() throws EcrcServiceException {
		return callWebMethodsService(ecrcProps.getGetProvincesListUri(), new GetProvinceList());
	}

	public ResponseEntity<String> getNextSessionId(String orgTicketNumber) throws EcrcServiceException {
		String _getNextSessionIdUri = String.format(ecrcProps.getGetNextSessionIdUri(), orgTicketNumber);
		return callWebMethodsService(_getNextSessionIdUri, new GetNextSessionId());
	}


	public ResponseEntity<String> createNewCRCService(CRCService crcService) throws EcrcServiceException {
		String _createNewCRCServiceUri = ecrcProps.getCreateNewCRCServiceUri();
		return callWebMethodsService(_createNewCRCServiceUri, new CreateNewCrcService());
	}

	private ResponseEntity<String> callWebMethodsService(String Uri, Object returnObject) {
		Mono<?> responseBody = this.webClient.get().uri(Uri).retrieve()
				.bodyToMono(returnObject.getClass());

		try {
			JSONObject obj = new JSONObject(objectMapper.writeValueAsString(responseBody.block()));
			if (obj.getInt("responseCode") == EcrcExceptionConstants.WEBSERVICE_STATUS_CODE_SUCCESS) {
				return new ResponseEntity<>(obj.toString(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
						EcrcExceptionConstants.DATA_NOT_FOUND_ERROR), HttpStatus.NOT_FOUND);
			}
		} catch (JsonProcessingException e) {
			logger.error("Failed to convert to json processing exception");
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.CONVERT_TO_JSON_ERROR), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			logger.error("Failed to convert to json general exception");
			return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
					EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR), HttpStatus.BAD_REQUEST);
		}
	}

}
