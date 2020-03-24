class ConsentPage {
    constructor() {
        this.consentCheckBox = element(by.xpath('//input[@type=\'checkbox\']'));
        this.certifyCheckBox = element(by.xpath('(//input[@type=\'checkbox\'])[2]'));
        this.unknownCheckBox = element(by.xpath('(//input[@type=\'checkbox\'])[3]'));
        this.applicantName = element(by.id('textInputId'));
        this.continueButton = element(by.buttonText('Continue'));
        this.cancelAndExitButton = element(by.buttonText('Cancel and Exit'));
    }
}

export default new ConsentPage();