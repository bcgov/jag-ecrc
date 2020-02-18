package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;

@Service
@Configuration
@EnableConfigurationProperties(EcrcProperties.class)
public class EcrcWebMethodsServiceImpl implements EcrcWebMethodsService {
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

    public ResponseEntity<String> callWebMethodsService(String Uri, Object returnObject) {
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
            logger.error("Error in call to webMethods");
            return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                    EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR), HttpStatus.BAD_REQUEST);
        }
    }
}
