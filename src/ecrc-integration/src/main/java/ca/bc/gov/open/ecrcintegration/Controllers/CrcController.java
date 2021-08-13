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
public class CrcController {

    @Autowired
    public CrcController() {}

    @GetMapping("/VCRC/Source/CreateNewCRCService/Services")
    public Object createNewCrc(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Schedule_Type_Cd") String scheduleCode,
            @RequestParam(value = "Scope_Level_Cd") String scopeLevelCode,
            @RequestParam(value = "Appl_Party_Id") String applPartyId,
            @RequestParam(value = "Org_Appl_To_Pay") String orgApplToPay,
            @RequestParam(value = "Applicant_Posn") String applicantPos,
            @RequestParam(value = "Child_Care_Fac_Nm") String careFacName,
            @RequestParam(value = "Governing_Body_Nm") String govBodyName,
            @RequestParam(value = "Session_Id") String sessionId,
            @RequestParam(value = "Invoice_Id") String invoiceId,
            @RequestParam(value = "Auth_Release_EIV_Vendor_YN") String authReleaseEIVVendor,
            @RequestParam(value = "Auth_Conduct_CRC_Check_YN") String authConductCRCCheck,
            @RequestParam(value = "Auth_Release_To_Org_YN") String authReleaseToOrg,
            @RequestParam(value = "Appl_Identity_Verified_EIV_YN") String applIdentityVerifiedEIV,
            @RequestParam(value = "EivPassDetailsResults") String EivPassDetailsResults) {
        return null;
    }

    @GetMapping("/VCRC/Source/CreateSharingService/Services")
    public Object shareCrc(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Appl_Party_Id") String applPartyId,
            @RequestParam(value = "Scope_Level_Cd") String scopeLevel,
            @RequestParam(value = "Applicant_Posn") String applicantPos,
            @RequestParam(value = "Auth_Release_EIV_Vendor_YN") String authReleaseEIVVendor,
            @RequestParam(value = "Auth_Release_To_Org_YN") String authReleaseToOrg,
            @RequestParam(value = "Appl_Identity_Verified_EIV_YN") String applIdentityVerifiedEIV,
            @RequestParam(value = "EivPassDetailsResults") String EivPassDetailsResults) {
        return null;
    }

    @GetMapping("/VCRC/Source/GetServiceFeeAmount/Services")
    public Object getServiceFees(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "ScheduleTypeCd") String scheduleTypeCode,
            @RequestParam(value = "ScopeLevelCd") String scopeLevelCode) {
        return null;
    }

    @GetMapping("/VCRC/Source/UpdateServiceFinancialTxn/Services")
    public Object updateServiceFinancialTxn(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Appl_Party_Id") String applPartyId,
            @RequestParam(value = "Service_Id") String serviceId,
            @RequestParam(value = "CC_Authorization") String ccAuth,
            @RequestParam(value = "Payment_Date") String paymentDate,
            @RequestParam(value = "Payor_Type_Cd") String payorType,
            @RequestParam(value = "Payment_Status_Cd") String paymentStatus,
            @RequestParam(value = "Session_Id") String sessionId,
            @RequestParam(value = "Invoice_Id") String invoiceId,
            @RequestParam(value = "Transaction_Id") String transId,
            @RequestParam(value = "Transaction_Amount") String transAmount) {
        return null;
    }
}
