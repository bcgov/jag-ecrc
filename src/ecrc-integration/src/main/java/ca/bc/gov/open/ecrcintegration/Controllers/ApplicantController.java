package ca.bc.gov.open.ecrcintegration.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/rest")
public class ApplicantController {

    @Autowired
    public ApplicantController() {}

    @GetMapping("/VCRC/Source/CheckApplicantForPrevCRC/Services")
    public Object checkApplicantForPrevCrc(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNum,
            @RequestParam(value = "Legal_Surname_Nm") String surname,
            @RequestParam(value = "Legal_First_Nm") String firstName,
            @RequestParam(value = "Birth_Dt") String birthDate,
            @RequestParam(value = "Gender_Txt") String gender,
            @RequestParam(value = "Postal_Code_Txt") String postalCode,
            @RequestParam(value = "Drivers_Lic_No") Long driversLicNum,
            @RequestParam("Scope_level_Cd") String scopeCode,
            @RequestParam(value = "Previous_Service_Id") Long prevServiceId) {

        return null;
    }

    @GetMapping("/VCRC/Source/CheckApplicantForPrevCRCEx/Services")
    public Object checkApplicantForPrevCrcEx(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNum,
            @RequestParam(value = "Legal_Surname_Nm") String surname,
            @RequestParam(value = "Legal_First_Nm") String firstName,
            @RequestParam(value = "Birth_Dt") String birthDate,
            @RequestParam(value = "Gender_Txt") String gender,
            @RequestParam(value = "Postal_Code_Txt") String postalCode,
            @RequestParam(value = "Drivers_Lic_No") Long driversLicNum,
            @RequestParam("Scope_level_Cd") String scopeCode) {
        return null;
    }

    @GetMapping("/VCRC/Source/CreateApplicant/Services")
    public Object createApplicant(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Call_Purpose") String purposeParam,
            @RequestParam(value = "Legal_Surname_Nm") String surname,
            @RequestParam(value = "Legal_First_Nm") String firstName,
            @RequestParam(value = "Legal_Second_Nm") String secondName,
            @RequestParam(value = "Birth_Dt") String birthDate,
            @RequestParam(value = "Gender_Txt") String gender,
            @RequestParam(value = "Birth_Place") String birthPlace,
            @RequestParam(value = "Alias1_Surname_Nm") String aliasOneSurname,
            @RequestParam(value = "Alias1_First_Nm") String aliasOneFirstName,
            @RequestParam(value = "Alias1_Second_Nm") String aliasOneSecondName,
            @RequestParam(value = "Alias2_First_Nm") String aliasTwoFirstName,
            @RequestParam(value = "Alias2_Second_Nm") String aliasTwoSecondName,
            @RequestParam(value = "Alias3_Surname_Nm") String aliasThreeSurname,
            @RequestParam(value = "Alias3_First_Nm") String aliasThreeFirstName,
            @RequestParam(value = "Alias3_Second_Nm") String aliasThreeSecondName,
            @RequestParam(value = "Phone_Number") String phoneNumber,
            @RequestParam(value = "Address_Line1") String addressOne,
            @RequestParam(value = "Address_Line2") String addressTwo,
            @RequestParam(value = "City_N,") String cityName,
            @RequestParam(value = "Province_Nm") String provinceName,
            @RequestParam(value = "Country_Nm") String countryName,
            @RequestParam(value = "Postal_Code_Txt") String postalCode,
            @RequestParam(value = "Drivers_Lic_No") Long driversLicNum) {
        return null;
    }

    @GetMapping("/VCRC/Source/CreateApplicantEx/Services")
    public Object createApplicantEx(
            @RequestParam(value = "OrgTicketNumber") Long orgTicketNumber,
            @RequestParam(value = "Call_Purpose") String purposeParam,
            @RequestParam(value = "Legal_Surname_Nm") String surname,
            @RequestParam(value = "Legal_First_Nm") String firstName,
            @RequestParam(value = "Legal_Second_Nm") String secondName,
            @RequestParam(value = "Birth_Dt") String birthDate,
            @RequestParam(value = "Gender_Txt") String gender,
            @RequestParam(value = "Birth_Place") String birthPlace,
            @RequestParam(value = "Alias1_Surname_Nm") String aliasOneSurname,
            @RequestParam(value = "Alias1_First_Nm") String aliasOneFirstName,
            @RequestParam(value = "Alias1_Second_Nm") String aliasOneSecondName,
            @RequestParam(value = "Alias2_First_Nm") String aliasTwoFirstName,
            @RequestParam(value = "Alias2_Second_Nm") String aliasTwoSecondName,
            @RequestParam(value = "Alias3_Surname_Nm") String aliasThreeSurname,
            @RequestParam(value = "Alias3_First_Nm") String aliasThreeFirstName,
            @RequestParam(value = "Alias3_Second_Nm") String aliasThreeSecondName,
            @RequestParam(value = "Phone_Number") String phoneNumber,
            @RequestParam(value = "Address_Line1") String addressOne,
            @RequestParam(value = "Address_Line2") String addressTwo,
            @RequestParam(value = "City_N,") String cityName,
            @RequestParam(value = "Province_Nm") String provinceName,
            @RequestParam(value = "Country_Nm") String countryName,
            @RequestParam(value = "Postal_Code_Txt") String postalCode,
            @RequestParam(value = "Drivers_Lic_No") Long driversLicNum,
            @RequestParam(value = "Email_Address") String emailAddress,
            @RequestParam(value = "Email_Type") String emailType) {
        return null;
    }
}
