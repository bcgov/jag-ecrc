package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.exception.EcrcServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetServiceFeeAmountController {
    @Autowired
    EcrcServices ecrcServices;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/getServiceFeeAmount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getServiceFeeAmount(@RequestParam(required=true) String orgTicketId,
            @RequestParam(required=true) String scheduleTypeCd,
            @RequestParam(required=true) String scopeLevelCd) throws EcrcServiceException {
        return ecrcServices.getServiceFeeAmount(orgTicketId,scheduleTypeCd,scopeLevelCd);
    }
}
