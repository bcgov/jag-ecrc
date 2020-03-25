require("dotenv").config();

var bcscRedirectPage = require("../../pageobjectfactory/bcscredirectpage");

var landingPage = require("../../pageobjectfactory/landingpage");

var bcscRedirectPage = require("../../pageobjectfactory/bcscredirectpage");

var orgVerificationPage = require("../../pageobjectfactory/orgverificationpage");

var termsOfUsePage = require("../../pageobjectfactory/termsofusepage");

var bcServicesCardLandingPage = require("../../pageobjectfactory/bcservicescardlandingpage");

var bcServicesCardLoginPage = require("../../pageobjectfactory/bcservicescardloginpage");

var bcscConsentPage = require("../../pageobjectfactory/bcscconsentpage");

var consentPage = require("../../pageobjectfactory/consentpage.js");

var applicationFormPage = require("../../pageobjectfactory/applicationformpage");

var paymentPage = require("../../pageobjectfactory/paymentpage");

var informationReviewPage = require("../../pageobjectfactory/informationreviewpage");

var testInput = require("../../input/success");

describe("Route protection", () => {
  const routingProtectionPageUrl = process.env.URL;
  const routingTestUrls = [
    process.env.ORGVERIFICATION_URL,
    process.env.TERMSOFUSE_URL,
    process.env.BCSC_URL,
    process.env.BCSC_CONSENT_URL,
    process.env.APPLICATIONFORM_URL,
    process.env.INFORMATIONREVIEW_URL,
    process.env.USERCONFIRMATION_URL,
    process.env.SUCCESS_URL
  ];

  const returnToOrgVerification = () => {
    landingPage.accessCode.sendKeys(testInput.validAccessCode);
    landingPage.validate.click();
    browserWait = protractor.ExpectedConditions;
  };

  const returnToTermsOfUse = () => {
    returnToOrgVerification();
    browser.wait(
      browserWait.elementToBeClickable(orgVerificationPage.continue),
      10000
    );
    browser.sleep(4000);
    orgVerificationPage.continue.click();
  };

  const returnToConsent = () => {
    returnToTermsOfUse();
    termsOfUsePage.readAndAcceptCheckBox.click();
    browser.executeScript(
      "arguments[0].scrollIntoView(true)",
      termsOfUsePage.termsOfUseFinalParagraph
    );
    termsOfUsePage.continueButton.click();
    browser.wait(
      browserWait.elementToBeClickable(bcscRedirectPage.login),
      10000
    );
    bcscRedirectPage.login.click();
    bcServicesCardLandingPage.virtualCardTesting.click();
    bcServicesCardLoginPage.cardSerialNumber.sendKeys(
      testInput.bcServicesCardSerialNumber
    );
    bcServicesCardLoginPage.continueButton.click();
    bcServicesCardLoginPage.password.sendKeys(testInput.bcServicesCardPassword);
    bcServicesCardLoginPage.continueButton.click();
    bcServicesCardLoginPage.continueButton.click();
  };

  const returnToApplicationForm = () => {
    returnToConsent();
    bcscConsentPage.name.count().then(count => {
      expect(count).toBe(1);
    });
    bcscConsentPage.yes.click();
  };

  returnToInformationReview = () => {
    returnToApplicationForm();
    applicationFormPage.cityAndCountryBirth.sendKeys(
      testInput.applicationFormCityAndCountryBirth
    );
    applicationFormPage.phoneNumber.sendKeys(
      testInput.applicationFormPhoneNumber
    );
    applicationFormPage.emailAddress.sendKeys(
      testInput.applicationFormEmailAddress
    );
    applicationFormPage.applicantPosition.sendKeys(
      testInput.applicationFormApplicantPosition
    );
    applicationFormPage.organizationFacility.sendKeys(
      testInput.applicationFormOrganizationFacility
    );
    applicationFormPage.continueButton.click();
  };

  beforeAll(() => {
    browser
      .manage()
      .window()
      .maximize();
  });

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    browser.get(process.env.URL);
  });

  it("verify route protection from orgvalidation page", () => {
    routingTestUrls.forEach(testUrl => {
      if (testUrl !== process.env.URL) {
        browser.get(testUrl);
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
      }
    });
  });

  it("verify route protection from orgverification page", () => {
    routingTestUrls.forEach(testUrl => {
      if (testUrl !== process.env.ORGVERIFICATION_URL) {
        browser.get(testUrl);
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToOrgVerification();
      }
    });
  });

  it("verify route protection from termsofuse page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToTermsOfUse();
      }

      if (testUrl === process.env.TERMSOFUSE_URL) {
        onSubsequentPages = true;
      }
    });
  });

  it("verify route protection from consent page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToConsent();
      }

      if (testUrl === process.env.BCSC_CONSENT_URL) {
        onSubsequentPages = true;
      }
    });
  });

  it("verify route protection from applicationform page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToApplicationForm();
      }

      if (testUrl === process.env.APPLICATIONFORM_URL) {
        onSubsequentPages = true;
      }
    });
  });

  it("verify route protection from informationreview page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToInformationReview();
      }

      if (testUrl === process.env.INFORMATIONREVIEW_URL) {
        onSubsequentPages = true;
      }
    });
  });
});
