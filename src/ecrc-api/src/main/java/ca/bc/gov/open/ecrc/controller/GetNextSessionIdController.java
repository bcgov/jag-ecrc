package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetNextSessionIdController {
    @Autowired
    EcrcServicesImpl ecrcServices;

    @CrossOrigin(origins = "/**")
    @GetMapping(value = "/getNextSessionId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNextSessionId(@RequestParam(required=true) String orgTicketId) throws EcrcServiceException {
        return ecrcServices.getNextSessionId(orgTicketId);
    }
}
