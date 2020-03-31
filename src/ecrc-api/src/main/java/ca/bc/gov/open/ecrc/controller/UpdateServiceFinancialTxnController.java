package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import ca.bc.gov.open.ecrc.model.RequestUpdateServiceFinancialTxn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateServiceFinancialTxnController {
    
	@Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(UpdateServiceFinancialTxnController.class);

    @PostMapping(value = "/private/updateServiceFinancialTxn", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateServiceFinancialTxn(@RequestBody(required=true) RequestUpdateServiceFinancialTxn requestUpdateServiceFinancialTxn) {
        logger.info("Update service transaction request received {}", requestUpdateServiceFinancialTxn.getRequestGuid());
        try {
            return  ecrcServices.updateServiceFinancialTxn(requestUpdateServiceFinancialTxn);
        } catch (Exception ex) {
            logger.error("Error in ecrc service: ", ex);
            return new ResponseEntity(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                    EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }
}
