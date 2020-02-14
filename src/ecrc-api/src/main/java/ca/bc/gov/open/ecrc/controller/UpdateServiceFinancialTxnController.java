package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.EcrcServicesImpl;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestNewCRCService;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateServiceFinancialTxnController {
    @Autowired
    private EcrcServicesImpl ecrcServices;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/updateServiceFinancialTxn")
    public ResponseEntity<String> updateServiceFinancialTxn(@RequestBody(required=true) RequestUpdateServiceFinancialTxn requestUpdateServiceFinancialTxn) throws EcrcServiceException {
        return  ecrcServices.updateServiceFinancialTxn(requestUpdateServiceFinancialTxn);
    }
}
