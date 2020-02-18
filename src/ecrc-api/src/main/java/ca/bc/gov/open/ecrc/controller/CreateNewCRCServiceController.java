package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CreateNewCRCServiceController {
    @Autowired
    EcrcServices ecrcServices;

    @PostMapping(value = "/createNewCRCService", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createNewCRCService(@RequestBody(required=true) RequestNewCRCService requestNewCRCService) throws EcrcServiceException {
        return  ecrcServices.createNewCRCService(requestNewCRCService);
    }
}
