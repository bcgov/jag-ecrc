//import { browser, element, by } from "protractor"

require("dotenv").config();

const bcscRedirectPage = require("../../pageobjectfactory/bcscredirectpage");
const landingPage = require("../../pageobjectfactory/landingpage");
const orgVerificationPage = require("../../pageobjectfactory/orgverificationpage");
const termsOfUsePage = require("../../pageobjectfactory/termsofusepage");
const testInput = require("../../input/success");

const using = require("jasmine-data-provider");

describe("bcscRedirectPage", function() {
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

  beforeEach(() => {
    browser.get(process.env.URL);
    handleAlert();

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
  });

  it("verify if login redirects to the right page", () => {
    bcscRedirectPage.login.click().then(() => {
      expect(browser.getTitle()).toBe(process.env.BCSC_LOGIN_NAVTITLE);
    });
  });

  it("verify if 'I do not have a BC Services Card' redirects to the right page", () => {
    bcscRedirectPage.iDoNotHaveABCServicesCard.click().then(() => {
      handleAlert();
      expect(browser.getCurrentUrl()).toBe(process.env.TRANSITION_URL);
    });
  });
});
