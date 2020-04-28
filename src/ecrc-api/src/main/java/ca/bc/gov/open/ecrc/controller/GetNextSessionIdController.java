package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.service.EcrcServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetNextSessionIdController {
    @Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(GetNextSessionIdController.class);

    @GetMapping(value = "/private/getNextSessionId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNextSessionId(@RequestParam(required=true) String orgTicketNumber,
                                                   @RequestParam(required=true) String requestGuid) {
        MDC.put("request.guid", requestGuid);
        MDC.put("request.endpoint",  "getNextSessionId");
        logger.info("Get next session id request received [{}]", requestGuid);

        try {
            return ecrcServices.getNextSessionId(orgTicketNumber, requestGuid);
        } catch (Exception ex) {
            logger.error("Error in ecrc service: ", ex);
            return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                    EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }
}
