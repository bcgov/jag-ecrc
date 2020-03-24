class PaymentPageObjects {
    constructor() {
        this.cardNumber = element(by.name('trnCardNumber'));
        this.cardCVD = element(by.name('trnCardCvd'));
        this.payNow = element(by.xpath('//*[@value=\'Pay Now\']'));
        this.cancel = element(by.xpath('//*[@value=\'Cancel\']'));
    }
}

export default new PaymentPageObjects();