class TermsOfUse {
  constructor() {
    this.readAndAcceptCheckBox = element(by.xpath("//input[@type='checkbox']"));
    this.authorizeEmailIdCheckBox = element(
      by.xpath("(//input[@type='checkbox'])[2]")
    );
    this.downloadButton = element(by.buttonText(" Download Terms of Use"));
    this.continueButton = element(by.buttonText("Continue"));
    this.cancelAndExitButton = element(by.buttonText("Cancel and Exit"));
    this.termsOfUseFinalParagraph = element(
      by.xpath(
        "//*[@class='scroll-box']/ol[@start='21']/li[contains(text(), 'You hereby consent to the exclusive jurisdiction and venue of the courts of the Province of British Columbia, sitting in Victoria')]"
      )
    );
    this.termsOfUsePayment = element(
      by.xpath("//*[@class='scroll-box']/h2[contains(text(), 'Payment:')]")
    );
  }
}

module.exports = new TermsOfUse();
