class SuccessInput {
  constructor() {
    this.validAccessCode = process.env.VALID_ACCESS_CODE;
    this.validVolunteerAccessCode = process.env.VALID_VOLUNTEER_ACCESS_CODE;
    this.bcServicesCardSerialNumber = process.env.BCSERVIES_CARD_SERIAL_NUMBER;
    this.bcServicesCardPassword = process.env.BCSERVIES_CARD_PASSWORD;
    this.applicationFormCityAndCountryBirth = "Victoria, Canada";
    this.applicationFormPhoneNumber = "444 444-4444";
    this.applicationFormEmailAddress = "gmail@gmail.com";
    this.applicationFormApplicantPosition = "automation";
    this.applicationFormOrganizationFacility = "QA";
    this.applicationFormMailingAddressStreet = "Street";
    this.applicationFormCurrentAddressCity = "City";
    this.applicationFormCurrentAddressProvince = "PRINCE EDWARD ISLAND";
    this.applicationFormCurrentAddresPostalCode = "V8W 1C3";
    this.applicationFormMailingAddresCountry = "CANADA";
    this.applicationFormFirstName = "CRC";
    this.applicationFormMiddleName = "Elsy";
    this.applicationFormLastName = "THREE";
    this.applicationFormDateOfBirth = "2000/07/19";
    this.applicationFormGender = "F";
    this.applicationFormCurrentAddressStreet = "918-1658 LITTLE GROVE";
    this.applicationFormCurrentAddressCity = "REVELSTOKE";
    this.applicationFormCurrentAddressProvince = "BRITISH COLUMBIA";
    this.applicationFormCurrentAddresPostalCode = "V0E 8T8";
    this.applicationFormCurrentAddresCountry = "CANADA";
    this.approvedCardNumber = "4030000010001234";
    this.approvedCardCVD = "123";
    this.approvedStatus = "Payment Approved";
    this.approvedStatusVolunteer = "Application Submitted";
    this.declinedCardNumber = "4003050500040005";
    this.declinedCardCVD = "123";
    this.declinedStatus = "Payment Declined/Cancelled";
    this.declinedNoResponseCardNumber = "4872385877270993";
    this.declinedNoResponseCardCVD = "123";
    this.declinedTimeoutCardNumber = "4294215026184763";
    this.declinedTimeoutCardCVD = "123";
    this.declinedNoDeviceCardNumber = "4104631199283796";
    this.declinedNoDeviceCVD = "123";

    //Previous env file values
    this.LP_NEEDMOREINFORMATION_EMPORGNAVTITLE =
      "Criminal Records Review Program Online Services - Province of British Columbia";
    this.LP_WHYINEEDTOAPPLYFORCRIMINALRECORDCHECK_NAVTITLE =
      "Types of criminal background checks | Royal Canadian Mounted Police";
    this.LP_IAMANAUTHORIZEDCONTACT_NAVTITLE =
      "Authorized Contact Criminal Record Check Requirement - Province of British Columbia";
    this.LP_IAMANEMPLOYERORGANIZATION_NAVTITLE =
      "Employer Organizations Enrolled with the CRRP - Province of British Columbia";
    this.LP_IAMAVOLUNTEERORGANIZATION_NAVTITLE =
      "Volunteer Organizations & Criminal Record Checks - Province of British Columbia";
    this.LP_CRIMINALRECORDSREVIEWACT_NAVTITLE = "Criminal Records Review Act";
    this.LP_ACCESSCODE_ERROR = "Please enter a valid org code";
    this.LP_VALIDATE_NAVTITLE = "Criminal Record Check";
    this.LP_VISITTHECRIMINALRECORDREVIEWWEBSITE_NAVTITLE =
      "Criminal Record Check BC - Province of British Columbia";
    this.BCSC_LOGIN_NAVTITLE = "BC Services Card Login";
    this.BCSC_SETUPACCOUNT_NAVTITLE =
      "Login with a Card - Province of British Columbia";
    this.BCSC_READMORE_NAVTITLE =
      "BC Services Card - Province of British Columbia";
    this.TERMSOFUSE_CONTINUE_NAVTITLE = "Criminal Record Check";
    this.ORGVERIFICATION_CONTINUE_NAVTITLE = "Criminal Record Check";

    //env file urls
    this.BASE_URL = process.env.URL;
    this.BCSC_URL = this.BASE_URL + "/bcscRedirect";
    this.CONSENT_URL = this.BASE_URL + "/consent";
    this.TERMSOFUSE_URL = this.BASE_URL + "/termsofuse";
    this.TRANSITION_URL = this.BASE_URL + "/transition";
    this.ORGVERIFICATION_URL = this.BASE_URL + "/orgverification";
    this.CONSENT_URL = this.BASE_URL + "/consent";
    this.APPLICATIONFORM_URL = this.BASE_URL + "/applicationform";
    this.INFORMATIONREVIEW_URL = this.BASE_URL + "/informationreview";
    this.SUCCESS_URL = this.BASE_URL + "/success";
    this.TRANSITION_URL_RELATIVE = "criminalrecordcheck/transition";
  }
}

module.exports = new SuccessInput();
