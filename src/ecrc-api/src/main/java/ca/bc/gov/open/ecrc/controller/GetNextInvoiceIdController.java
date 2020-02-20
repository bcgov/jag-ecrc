package ca.bc.gov.open.ecrc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import ca.bc.gov.open.ecrc.service.EcrcServices;

@RestController
public class GetNextInvoiceIdController {
	@Autowired
    EcrcServices ecrcServices;

    @GetMapping(value = "/getNextInvoiceId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNextInvoiceId(@RequestParam(required=true) String orgTicketId) throws EcrcServiceException {
        return ecrcServices.getNextInvoiceId(orgTicketId);
    }
}
