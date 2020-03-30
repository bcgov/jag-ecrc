package ca.bc.gov.open.ecrc.service;

import org.springframework.http.ResponseEntity;

public interface EcrcWebMethodsService {
    public ResponseEntity<String> callWebMethodsService(String Uri, Object returnObject, String requestGuid);
}
