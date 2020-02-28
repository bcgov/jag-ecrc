package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class GetNextSessionIdController {
    @Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(GetNextSessionIdController.class);

    @GetMapping(value = "/getNextSessionId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNextSessionId(@RequestParam(required=true) String orgTicketNumber) throws EcrcServiceException {
        //TODO: Extract guid generated from front end
        logger.info("Get next session id request received {}", UUID.randomUUID().toString());
        return ecrcServices.getNextSessionId(orgTicketNumber);
    }
}
