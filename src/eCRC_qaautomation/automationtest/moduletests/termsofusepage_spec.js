//import { browser, element, by } from "protractor"

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

var using = require("jasmine-data-provider");

describe("terms of use page", () => {
  beforeEach(() => {
    browser.get(process.env.URL);

    browser
      .manage()
      .window()
      .maximize();

    landingPage.accessCode.sendKeys(testInput.validAccessCode);

    landingPage.validate.click();

    browserWait = protractor.ExpectedConditions;

    browser.wait(
      browserWait.elementToBeClickable(orgVerificationPage.continue),
      10000
    );

    browser.sleep(4000);

    orgVerificationPage.continue.click();
  });

  it("verify that the continue button is enabled when all checkboxes are checked and the terms of use is scrolled to end of section", function() {
    termsOfUsePage.readAndAcceptCheckBox.click();

    termsOfUsePage.authorizeEmailIdCheckBox.click();

    browser
      .actions()
      .mouseMove(termsOfUsePage.termsOfUseFinalParagraph)
      .perform();

    termsOfUsePage.continueButton.click();

    // bcscRedirectPage.login.click();
  });

  using(
    [
      { unchecked: "readAndAcceptCheckBox" },
      { unchecked: "authorizeEmailIdCheckBox" },
      { unchecked: "termsOfUse" }
    ],
    function(unchecked) {
      it("verify that the continue button is disabled when one or more checkboxes are unchecked or if the terms of use is not scrolled", function() {
        if (unchecked.unchecked === "readAndAcceptCheckBox") {
          termsOfUsePage.authorizeEmailIdCheckBox.click();

          browser
            .actions()
            .mouseMove(termsOfUsePage.termsOfUseFinalParagraph)
            .perform();
        } else if (unchecked.unchecked === "authorizeEmailIdCheckBox") {
          termsOfUsePage.readAndAcceptCheckBox.click();

          browser
            .actions()
            .mouseMove(termsOfUsePage.termsOfUseFinalParagraph)
            .perform();
        } else {
          termsOfUsePage.readAndAcceptCheckBox.click();

          termsOfUsePage.authorizeEmailIdCheckBox.click();
        }

        expect(false).toBe(termsOfUsePage.continueButton.isEnabled());
      });
    }
  );
});
