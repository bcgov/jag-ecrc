class ApplicationFormPage {
    constructor() {
        this.firstName = element(by.id('legalFirstNm'));
        this.lastName = element(by.id('legalSurnameNm'));
        this.middleName = element(by.id('legalSecondNm'));
        this.cityAndCountryBirth = element(by.id('birthLoc'));
        this.dateOfBirth = element(by.id('birthDt'));
        this.sex = element(by.id('genderTxt'));
        this.phoneNumber = element(by.id('phoneNumber'));
        this.emailAddress = element(by.id('emailAddress'));
        this.applicantPosition = element(by.id('applicantPosition'));
        this.organizationFacility = element(by.id('organizationFacility'));
        this.currentAddressStreet = element(by.id('addressLine1'));
        this.currentAddressCity = element(by.id('cityNm'));
        this.currentAddressProvince = element(by.id('provinceNm'));
        this.currentAddresPostalCode = element(by.id('postalCodeTxt'));
        this.currentAddresCountry = element(by.id('countryNm'));
        this.currentAddressNotSameAsMailingAddressCheckBox = element(by.xpath('//input[@type=\'checkbox\']'));
        this.mailingAddressStreet = element(by.id('mailingAddressLine1'));
        this.mailingAddressCity = element(by.id('mailingCityNm'));
        this.mailingAddressProvince = element(by.id('mailingProvinceNm'));
        this.mailingAddresPostalCode = element(by.id('mailingPostalCodeTxt'));
        this.mailingAddresCountry = element(by.id('mailingCountryNm'));
        this.serviceBC = element(by.xpath('//a[@href=\'https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc\']'));
        this.icbc = element(by.xpath('//a[@href=\'https://www.icbc.com/Pages/default.aspx\']'));
        this.addressChangeBC = element(by.xpath('//a[@href=\'https://www.addresschange.gov.bc.ca/\']'));
        this.continueButton = element(by.buttonText('Continue'));
    }
}

export default new ApplicationFormPage();