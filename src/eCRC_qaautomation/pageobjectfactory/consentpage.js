class ConsentPage {
  constructor() {
    this.consentCheckBox = element(by.xpath("//input[@type='checkbox']"));
    this.certifyCheckBox = element(by.xpath("(//input[@type='checkbox'])[2]"));
    this.disclosureCheckBox = element(
      by.xpath("(//input[@type='checkbox'])[3]")
    );
    this.reportChargesCheckBox = element(
      by.xpath("(//input[@type='checkbox'])[4]")
    );
    this.applicantName = element(by.id("textInputId"));
    this.continueButton = element(by.buttonText("Continue"));
    this.cancelAndExitButton = element(by.buttonText("Cancel and Exit"));
  }
}

module.exports = new ConsentPage();
