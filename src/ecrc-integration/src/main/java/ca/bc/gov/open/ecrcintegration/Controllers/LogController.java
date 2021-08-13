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
public class LogController {
    @Autowired
    public LogController() {}

    @GetMapping("/VCRC/Source/LogEivFailure/Services")
    public Object logEivFailure(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Session_Id") String sessionId,
            @RequestParam(value = "Legal_Surname_Nm") String surname,
            @RequestParam(value = "Legal_First_Nm") String firstName,
            @RequestParam(value = "Legal_Second_Nm") String secondName,
            @RequestParam(value = "Birth_Dt") String birthDate,
            @RequestParam(value = "Gender_Txt") String gender,
            @RequestParam(value = "EIV_Vendor_Error_Msg") String eivErrorMsg) {
        return null;
    }

    @GetMapping("/VCRC/Source/LogPaymentFailure/Services")
    public Object logPaymentFailure(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Service_Id") String serviceId,
            @RequestParam(value = "Appl_Party_Id") String applParyId,
            @RequestParam(value = "Session_Id") String sessionId,
            @RequestParam(value = "Invoice_Id") String invoiceId,
            @RequestParam(value = "Service_Fee_Amount") String feeAmount,
            @RequestParam(value = "BCEP_Error_Msg") String BCRPErrorMsg) {
        return null;
    }
}
