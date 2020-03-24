class BcServicesCardLandingPage {
    constructor() {
        this.virtualCardTesting = element(by.xpath('//h2[text()=\'Virtual card testing\']'));
    }
}

export default new BcServicesCardLandingPage();