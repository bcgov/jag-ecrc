class BcServicesCardLoginPage {
  constructor() {
    this.cardSerialNumber = element(by.id("csn"));
    this.password = element(by.id("passcode"));
    this.continueButton = element(by.buttonText("Continue"));
  }
}

module.exports = new BcServicesCardLoginPage();
