package ca.bc.gov.open.ecrc.service;

import ca.bc.gov.open.ecrc.configuration.EcrcProperties;
import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
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
            int respCode = obj.getInt("responseCode");
            if (respCode == WebServiceStatusCodes.SUCCESS.getErrorCode()) {
                return new ResponseEntity<>(obj.toString(), HttpStatus.OK);
            } else if (respCode == WebServiceStatusCodes.NOTFOUND.getErrorCode()) {
                return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                        EcrcExceptionConstants.DATA_NOT_FOUND_ERROR, respCode), HttpStatus.NOT_FOUND);
            } else if (respCode == WebServiceStatusCodes.ERROR.getErrorCode()) {
                return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                        EcrcExceptionConstants.SERVICE_UNAVAILABLE, respCode), HttpStatus.SERVICE_UNAVAILABLE);
            } else {
                return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                        EcrcExceptionConstants.UNKNOWN_RESPONSE_CODE, respCode), HttpStatus.BAD_REQUEST);
            }
        } catch (JsonProcessingException e) {
            logger.error("Failed to convert to json processing exception");
            logger.debug("DEBUG Stack: {}", e);
            return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                    EcrcExceptionConstants.CONVERT_TO_JSON_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Error in call to webMethods");
            logger.debug("DEBUG Stack: {}", e);
            return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                    EcrcExceptionConstants.WEBSERVICE_RESPONSE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }
}
