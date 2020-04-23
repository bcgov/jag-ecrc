require("dotenv").config();
const landingPage = require("../../pageobjectfactory/landingpage");
const orgVerificationPage = require("../../pageobjectfactory/orgverificationpage");
const termsOfUsePage = require("../../pageobjectfactory/termsofusepage");
const bcscRedirectPage = require("../../pageobjectfactory/bcscredirectpage");
const testInput = require("../../input/success");
const using = require("jasmine-data-provider");

describe("terms of use page", () => {
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
    browser.get(testInput.BASE_URL);
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
      20000
    );

    orgVerificationPage.continue.click();
  });

  it("verify that the continue button is enabled when all checkboxes are checked and the terms of use is scrolled to end of section", () => {
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
  });

  using(
    [
      { unchecked: "readAndAcceptCheckBox" },
      { unchecked: "authorizeEmailIdCheckBox" },
      { unchecked: "termsOfUse" }
    ],
    unchecked => {
      it("verify that the continue button is disabled when the checkbox is unchecked or if the terms of use is not scrolled", () => {
        if (unchecked.unchecked === "readAndAcceptCheckBox") {
          browser.executeScript(
            "arguments[0].scrollIntoView(true)",
            termsOfUsePage.termsOfUseFinalParagraph
          );
        } else {
          termsOfUsePage.readAndAcceptCheckBox.click();
        }

        expect(false).toBe(termsOfUsePage.continueButton.isEnabled());
      });
    }
  );
});
