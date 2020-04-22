package ca.bc.gov.open.ecrc.controller;

import ca.bc.gov.open.ecrc.exception.EcrcExceptionConstants;
import ca.bc.gov.open.ecrc.exception.WebServiceStatusCodes;
import ca.bc.gov.open.ecrc.model.RequestCRCShare;
import ca.bc.gov.open.ecrc.service.EcrcServices;
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
public class ShareCRCController {
    @Autowired
    EcrcServices ecrcServices;

    Logger logger = LoggerFactory.getLogger(ShareCRCController.class);

    @PostMapping(value = "/private/shareCRCService", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> shareCRCService(@RequestBody(required=true) RequestCRCShare requestCRCShare) {
        logger.info("Share crc request received [{}]", requestCRCShare.getRequestCreateApplicant().getRequestGuid());
        try {
            return ecrcServices.createCRCShare(requestCRCShare);
        } catch (Exception ex) {
            logger.error("Error in ecrc service: ", ex);
            return new ResponseEntity<>(String.format(EcrcExceptionConstants.WEBSERVICE_ERROR_JSON_RESPONSE,
                    EcrcExceptionConstants.INTERNAL_SERVICE_ERROR, WebServiceStatusCodes.ERROR.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }
}
