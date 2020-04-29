require("dotenv").config();

const landingPage = require("../../pageobjectfactory/landingpage");
const orgVerificationPage = require("../../pageobjectfactory/orgverificationpage");
const termsOfUsePage = require("../../pageobjectfactory/termsofusepage");
const bcscRedirectPage = require("../../pageobjectfactory/bcscredirectpage");
const bcServicesCardLandingPage = require("../../pageobjectfactory/bcservicescardlandingpage");
const bcServicesCardLoginPage = require("../../pageobjectfactory/bcservicescardloginpage");
const applicationFormPage = require("../../pageobjectfactory/applicationformpage");
const informationReviewPage = require("../../pageobjectfactory/informationreviewpage");
const consentPage = require("../../pageobjectfactory/consentpage");
const errorPage = require("../../pageobjectfactory/errorpage");
const testInput = require("../../input/success");

describe("Route protection", () => {
  const routingProtectionPageUrl = testInput.BASE_URL + "/error";
  const routingTestUrls = [
    testInput.ORGVERIFICATION_URL,
    testInput.TERMSOFUSE_URL,
    testInput.BCSC_URL,
    testInput.APPLICATIONFORM_URL,
    testInput.INFORMATIONREVIEW_URL,
    testInput.CONSENT_URL,
    testInput.SUCCESS_URL
  ];

  browserWait = protractor.ExpectedConditions;

  const handleAlert = () => {
    browser
      .switchTo()
      .alert()
      .then(
        alert => {
          alert.accept();
        },
        err => {}
      );
  };

  const returnToOrgVerification = () => {
    browser.get(testInput.BASE_URL);
    handleAlert();
    landingPage.accessCode.sendKeys(testInput.validAccessCode);
    landingPage.validate.click();
  };

  const returnToTermsOfUse = () => {
    returnToOrgVerification();
    browser.wait(
      browserWait.elementToBeClickable(orgVerificationPage.continue),
      20000
    );

    orgVerificationPage.continue.click();
  };

  const returnToApplicationForm = () => {
    returnToTermsOfUse();
    termsOfUsePage.readAndAcceptCheckBox.click();
    browser.executeScript(
      "arguments[0].scrollIntoView(true)",
      termsOfUsePage.termsOfUseFinalParagraph
    );
    termsOfUsePage.continueButton.click();
    browser.wait(
      browserWait.elementToBeClickable(bcscRedirectPage.login),
      20000
    );
    browser.sleep(1000);
    bcscRedirectPage.login.click();
    bcServicesCardLandingPage.virtualCardTesting.click();
    bcServicesCardLoginPage.cardSerialNumber.sendKeys(
      testInput.bcServicesCardSerialNumber
    );
    bcServicesCardLoginPage.continueButton.click();
    bcServicesCardLoginPage.password.sendKeys(testInput.bcServicesCardPassword);
    bcServicesCardLoginPage.continueButton.click();
    bcServicesCardLoginPage.continueButton.click();

    browser.wait(
      browserWait.textToBePresentInElementValue(
        applicationFormPage.lastName,
        testInput.applicationFormLastName
      ),
      20000
    );
  };

  returnToInformationReview = () => {
    returnToApplicationForm();
    expect(applicationFormPage.firstName.getAttribute("value")).toBe(
      testInput.applicationFormFirstName
    );
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
    applicationFormPage.continueButton.click();
  };

  returnToConsent = () => {
    returnToInformationReview();
    informationReviewPage.certifyCheckBox.click();
    informationReviewPage.submitButton.click();
  };

  beforeAll(() => {
    browser
      .manage()
      .window()
      .maximize();
  });

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
    browser.get(testInput.BASE_URL);
    handleAlert();
  });

  it("verify route protection from orgvalidation page", () => {
    routingTestUrls.forEach(testUrl => {
      if (testUrl !== testInput.BASE_URL) {
        browser.get(testUrl);
        handleAlert();
        browser.wait(
          browserWait.elementToBeClickable(errorPage.homeButton),
          20000
        );
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        errorPage.homeButton.click();
      }
    });
  });

  it("verify route protection from orgverification page", () => {
    routingTestUrls.forEach(testUrl => {
      if (testUrl !== testInput.ORGVERIFICATION_URL) {
        browser.get(testUrl);
        handleAlert();
        browser.wait(
          browserWait.elementToBeClickable(errorPage.homeButton),
          20000
        );
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
        handleAlert();
        browser.wait(
          browserWait.elementToBeClickable(errorPage.homeButton),
          20000
        );
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToTermsOfUse();
      }

      if (testUrl === testInput.TERMSOFUSE_URL) {
        onSubsequentPages = true;
      }
    });
  });

  it("verify route protection from applicationform page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        handleAlert();
        browser.wait(
          browserWait.elementToBeClickable(errorPage.homeButton),
          20000
        );
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToApplicationForm();
      }

      if (testUrl === testInput.APPLICATIONFORM_URL) {
        onSubsequentPages = true;
      }
    });
  });

  it("verify route protection from informationreview page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        handleAlert();
        browser.wait(
          browserWait.elementToBeClickable(errorPage.homeButton),
          20000
        );
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToInformationReview();
      }

      if (testUrl === testInput.INFORMATIONREVIEW_URL) {
        onSubsequentPages = true;
      }
    });
  });

  it("verify route protection from consent page", () => {
    let onSubsequentPages = false;
    routingTestUrls.forEach(testUrl => {
      if (onSubsequentPages) {
        browser.get(testUrl);
        handleAlert();
        browser.wait(
          browserWait.elementToBeClickable(errorPage.homeButton),
          20000
        );
        expect(browser.getCurrentUrl()).toEqual(routingProtectionPageUrl);
        returnToConsent();
      }

      if (testUrl === testInput.CONSENT_URL) {
        onSubsequentPages = true;
      }
    });
  });
});
