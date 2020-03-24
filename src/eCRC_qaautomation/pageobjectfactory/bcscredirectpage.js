class BcscRedirectPage {
    constructor() {
        this.login = element(by.buttonText('Login with a BC Services Card'));
        this.setUpAccount = element(by.buttonText('SET UP ACCOUNT'));
        this.requestForm = element(by.buttonText('REQUEST FORM'));
        this.getBCServicesCardSectionReadMore = element(by.buttonText('READ MORE'));
        this.applicantsWithoutABCServicesCardEmail = element(by.css('a[text()=\'email\']'));
    }
}

module.exports = new BcscRedirectPage();