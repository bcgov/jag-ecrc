package ca.bc.gov.open.ecrc.service;

import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

public interface EcrcWebMethodsService {
    ResponseEntity<String> callWebMethodsService(String uri, Object returnObject, String requestGuid);

    ResponseEntity<String> callWebMethodsService(String uri, MultiValueMap<String, String> queryParams, Object returnObject, String requestGuid);
}
