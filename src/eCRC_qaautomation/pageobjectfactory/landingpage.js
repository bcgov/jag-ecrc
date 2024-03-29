class LandingPageObjects {
  constructor() {
    this.needMoreInformationEmployeeOrVolunteer = element(
      by.css(
        "a[href='https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/online-service-information']"
      )
    );
    this.whyINeedToApplyForACriminalRecordCheck = element(
      by.css(
        "a[href='http://www.rcmp-grc.gc.ca/en/types-criminal-background-checks']"
      )
    );
    this.iAmAnAuthorizedContact = element(
      by.css(
        "a[href='https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/authorized-contacts']"
      )
    );
    this.iAmAnEmployerOrganization = element(
      by.css(
        "a[href='https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/employer-organizations']"
      )
    );
    this.iAmAnVolunteerOrganization = element(
      by.css(
        "a[href='https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/volunteer-organizations']"
      )
    );
    this.criminalRecordsReviewAct = element(
      by.css(
        "a[href='http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/00_96086_01']"
      )
    );
    this.accessCode = element(by.id("orgId"));
    this.error = element(by.className("error"));
    this.validate = element(by.buttonText("Continue"));
    this.visitTheCriminalRecordReviewWebsite = element(
      by.buttonText("VISIT THE CRIMINAL RECORD REVIEW WEBSITE")
    );
  }
}

module.exports = new LandingPageObjects();
