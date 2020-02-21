package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class CreateNewCRCServiceController {
    @Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(CreateNewCRCServiceController.class);

    @PostMapping(value = "/createNewCRCService", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createNewCRCService(@RequestBody(required=true) RequestNewCRCService requestNewCRCService) throws EcrcServiceException {
        //TODO: Extract guid generated from front end
        logger.info("Create new crc request received {}", UUID.randomUUID().toString());
        return  ecrcServices.createNewCRCService(requestNewCRCService);
    }
}
