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
  }
}

module.exports = new SuccessInput();
