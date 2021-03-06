class PaymentPage {
  constructor() {
    this.cardNumber = element(by.name("trnCardNumber"));
    this.cardCVD = element(by.name("trnCardCvd"));
    this.payNow = element(by.buttonText("Pay Now"));
    this.cancel = element(by.xpath("//*[@value='Cancel']"));
    this.paymentStatus = element(
      by.xpath("//div[@id='root']/div/main/div/div/h1")
    );
  }
}

module.exports = new PaymentPage();
