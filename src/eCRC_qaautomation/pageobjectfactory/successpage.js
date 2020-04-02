class SuccessPage {
  constructor() {
    this.printButton = element(by.buttonText("Print"));
    this.downloadButton = element(by.buttonText("Download"));
    this.serviceNumber = element(
      by.xpath("//td[text()='Service Number']/following-sibling::td")
    );
    this.firstName = element(
      by.xpath("//td[text()='First Name']/following-sibling::td")
    );
    this.lastName = element(
      by.xpath("//td[text()='Last Name']/following-sibling::td")
    );
    this.retryPaymentLink = element(by.buttonText("Click here to try again"));
  }
}

module.exports = new SuccessPage();
