class OrgVerificationPage {
    constructor() {
        this.continue = element(by.buttonText('Continue'));
        this.back = element(by.buttonText('Back'));
        this.learMoreAboutBCServicesCard = element(by.xpath('//a[@href=\'https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card\']'));
        this.learnMoreAboutBCServicesCardEligibility = element(by.xpath('//a[@href=\'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible\']'));
        this.bcServiceCardWebsite = element(by.xpath('//a[@href=\'https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card\']'));
        this.iAmAnEmployeeOrVounteer = element(by.xpath('//a[@href=\'/tbd\']'));
        this.electronicIdentityVerification = element(by.xpath('//a[@href=\'https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/electronic-identity-verification-eiv\']'));
        this.resultsAndConsideration = element(by.xpath('//a[@href=\'https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/results-and-reconsiderations\']'));
    }
}

export default new OrgVerificationPage();