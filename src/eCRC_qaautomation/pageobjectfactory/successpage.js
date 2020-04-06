class SuccessPage {
  constructor() {
    this.printButton = element(by.buttonText("Print"));
    this.downloadButton = element(by.xpath("//div[text()='Download']")); //by.buttonText("Download"));
    this.serviceNumber = element(
      by.xpath("//td[text()='Service Number']/following-sibling::td")
    );
    this.firstName = element(
      by.xpath("//td[text()='First Name']/following-sibling::td")
    );
    this.lastName = element(
      by.xpath("//td[text()='Last Name']/following-sibling::td")
    );
    this.retryPaymentLink = element(by.buttonText("Try Again"));
    this.paymentStatus = element(
      by.xpath("//div[@id='root']/div/main/div/div/h1")
    );
  }
}

module.exports = new SuccessPage();
