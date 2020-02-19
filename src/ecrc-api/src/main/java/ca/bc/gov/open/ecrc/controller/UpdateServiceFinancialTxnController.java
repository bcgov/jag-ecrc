package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateServiceFinancialTxnController {
    
	@Autowired
    EcrcServices ecrcServices;

    @PostMapping(value = "/updateServiceFinancialTxn", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateServiceFinancialTxn(@RequestBody(required=true) RequestUpdateServiceFinancialTxn requestUpdateServiceFinancialTxn) throws EcrcServiceException {
        return  ecrcServices.updateServiceFinancialTxn(requestUpdateServiceFinancialTxn);
    }
}
