package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CreateNewCRCServiceController {
    @Autowired
    private EcrcServicesImpl ecrcServices;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createNewCRCService")
    public ResponseEntity<String> createNewCRCService(@RequestBody(required=true) RequestNewCRCService requestNewCRCService) throws EcrcServiceException {
        return  ecrcServices.createNewCRCService(requestNewCRCService);
    }
}
