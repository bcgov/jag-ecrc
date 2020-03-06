package ca.bc.gov.open.ecrc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.service.EcrcServices;

import java.util.UUID;

@RestController
public class GetNextInvoiceIdController {
	@Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(GetNextInvoiceIdController.class);

    @GetMapping(value = "/private/getNextInvoiceId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNextInvoiceId(@RequestParam(required=true) String orgTicketNumber) throws EcrcServiceException {
        //TODO: Extract guid generated from front end
        logger.info("Get next invoice id request received {}", UUID.randomUUID());
        return ecrcServices.getNextInvoiceId(orgTicketNumber);
    }
}
