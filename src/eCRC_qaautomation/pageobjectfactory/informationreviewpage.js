class InformationReviewPage {
    constructor() {
        this.firstName = element(by.xpath('//td[text()=\'First Name\']/following-sibling::td'));
        this.lastName = element(by.xpath('//td[text()=\'First Name\']/following-sibling::td'));
        this.cityAndCountryBirth = element(by.xpath('//td[text()=\'City and Country of Birth\']/following-sibling::td'));
        this.birthAndDate = element(by.xpath('//td[text()=\'Birth Date\']/following-sibling::td'));
        this.sex = element(by.xpath('//td[text()=\'Sex\']/following-sibling::td'));
        this.applicantPosition = element(by.xpath('//td[text()=\'Your Position/Job Title\']/following-sibling::td'));
        this.organizationFacility = element(by.xpath('//td[text()=\'Organization Facility\']/following-sibling::td'));
        this.street = element(by.xpath('//td[text()=\'Street\']/following-sibling::td'));
        this.city = element(by.xpath('//td[text()=\'City\']/following-sibling::td'));
        this.province = element(by.xpath('//td[text()=\'Province\']/following-sibling::td'));
        this.postalCode = element(by.xpath('//td[text()=\'Postal Code\']/following-sibling::td'));
        this.country = element(by.xpath('//td[text()=\'Country\']/following-sibling::td'));
        this.phoneNumber = element(by.xpath('//td[text()=\'Primary Phone Number\']/following-sibling::td'));
        this.emailAddress = element(by.xpath('//td[text()=\'Personal Email Address\']/following-sibling::td'));
        this.certifyCheckBox = element(by.xpath('//input[@type=\'checkbox\']'));
        this.submitButton = element(by.buttonText('SUBMIT'));
    }
}

export default new InformationReviewPage();