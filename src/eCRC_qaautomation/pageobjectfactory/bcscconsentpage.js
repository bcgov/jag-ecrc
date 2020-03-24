class BcscConsentPage {
    constructor() {
        this.yes = element(by.buttonText('Yes'));
        this.no = element(by.buttonText('No'));
        this.name = element.all(by.xpath('//p[text()=\'CRC THREE\']'));
    }
}

export default new BcscConsentPage();