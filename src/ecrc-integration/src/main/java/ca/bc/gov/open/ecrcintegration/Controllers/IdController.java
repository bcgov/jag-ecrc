package ca.bc.gov.open.ecrcintegration.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
@Slf4j
public class IdController {
    @Autowired
    public IdController() {}

    @GetMapping("/VCRC/Source/GetNextInvoiceId/Services")
    public Object getNextInvoiceId(@RequestParam(value = "OrgTicketNumber") Long orgTicketNumber) {
        return null;
    }

    @GetMapping("/VCRC/Source/GetNextSessionId/Services")
    public Object getNestSessionId(@RequestParam(value = "OrgTicketNumber") Long orgTicketNumber) {
        return null;
    }
}
