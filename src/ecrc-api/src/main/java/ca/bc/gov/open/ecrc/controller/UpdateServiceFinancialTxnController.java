package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class UpdateServiceFinancialTxnController {
    
	@Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(UpdateServiceFinancialTxnController.class);

    @PostMapping(value = "/updateServiceFinancialTxn", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateServiceFinancialTxn(@RequestBody(required=true) RequestUpdateServiceFinancialTxn requestUpdateServiceFinancialTxn) throws EcrcServiceException {
        //TODO: Extract guid generated from front end
        logger.info("Update service transaction request received {}", UUID.randomUUID().toString());
        return  ecrcServices.updateServiceFinancialTxn(requestUpdateServiceFinancialTxn);
    }
}
