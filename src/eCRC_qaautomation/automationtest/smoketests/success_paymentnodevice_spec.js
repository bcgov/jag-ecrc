//import { browser, element, by } from "protractor"

require("dotenv").config();

const bcscRedirectPage = require("../../pageobjectfactory/bcscredirectpage");
const landingPage = require("../../pageobjectfactory/landingpage");
const orgVerificationPage = require("../../pageobjectfactory/orgverificationpage");
const termsOfUsePage = require("../../pageobjectfactory/termsofusepage");
const bcServicesCardLandingPage = require("../../pageobjectfactory/bcservicescardlandingpage");
const bcServicesCardLoginPage = require("../../pageobjectfactory/bcservicescardloginpage");
const consentPage = require("../../pageobjectfactory/consentpage.js");
const applicationFormPage = require("../../pageobjectfactory/applicationformpage");
const paymentPage = require("../../pageobjectfactory/paymentpage");
const informationReviewPage = require("../../pageobjectfactory/informationreviewpage");
const successPage = require("../../pageobjectfactory/successpage");
const testInput = require("../../input/success");

describe("success", () => {
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

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

  it("verify that application flow works as expected when payment provider returns no available device error", () => {
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
      5000
    );
    expect(applicationFormPage.firstName.getAttribute("value")).toBe(
      testInput.applicationFormFirstName
    );

    expect(applicationFormPage.lastName.getAttribute("value")).toBe(
      testInput.applicationFormLastName
    );

    expect(applicationFormPage.sex.getAttribute("value")).toBe(
      testInput.applicationFormGender
    );

    expect(applicationFormPage.middleName.getAttribute("value")).toBe(
      testInput.applicationFormMiddleName
    );

    expect(applicationFormPage.dateOfBirth.getAttribute("value")).toBe(
      testInput.applicationFormDateOfBirth
    );

    expect(applicationFormPage.currentAddresCountry.getAttribute("value")).toBe(
      testInput.applicationFormCurrentAddresCountry
    );

    expect(applicationFormPage.currentAddressCity.getAttribute("value")).toBe(
      testInput.applicationFormCurrentAddressCity
    );

    expect(
      applicationFormPage.currentAddresPostalCode.getAttribute("value")
    ).toBe(testInput.applicationFormCurrentAddresPostalCode);

    expect(applicationFormPage.currentAddressStreet.getAttribute("value")).toBe(
      testInput.applicationFormCurrentAddressStreet
    );
    expect(
      applicationFormPage.currentAddressProvince.getAttribute("value")
    ).toBe(testInput.applicationFormCurrentAddressProvince);
    applicationFormPage.currentAddressNotSameAsMailingAddressCheckBox.click();

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
    applicationFormPage.mailingAddressStreet.sendKeys(
      testInput.applicationFormMailingAddressStreet
    );
    applicationFormPage.mailingAddressCity.sendKeys(
      testInput.applicationFormCurrentAddressCity
    );
    applicationFormPage.mailingAddressProvince.sendKeys(
      testInput.applicationFormCurrentAddressProvince
    );
    applicationFormPage.mailingAddresPostalCode.sendKeys(
      testInput.applicationFormCurrentAddresPostalCode
    );
    applicationFormPage.mailingAddresCountry.sendKeys(
      testInput.applicationFormMailingAddresCountry
    );
    applicationFormPage.continueButton.click();

    informationReviewPage.cityAndCountryBirth
      .getText()
      .then(cityAndCountryBirth => {
        expect(cityAndCountryBirth).toBe(
          testInput.applicationFormCityAndCountryBirth
        );
      });
    informationReviewPage.phoneNumber.getText().then(phoneNumber => {
      expect(phoneNumber).toBe(testInput.applicationFormPhoneNumber);
    });
    informationReviewPage.emailAddress.getText().then(emailAddress => {
      expect(emailAddress).toBe(testInput.applicationFormEmailAddress);
    });
    informationReviewPage.applicantPosition
      .getText()
      .then(applicantPosition => {
        expect(applicantPosition).toBe(
          testInput.applicationFormApplicantPosition
        );
      });
    informationReviewPage.street.getText().then(function(street) {
      expect(street).toBe(testInput.applicationFormMailingAddressStreet);
    });
    informationReviewPage.city.getText().then(function(city) {
      expect(city).toBe(testInput.applicationFormCurrentAddressCity);
    });
    informationReviewPage.province.getText().then(function(province) {
      expect(province).toBe(testInput.applicationFormCurrentAddressProvince);
    });
    informationReviewPage.postalCode.getText().then(function(postalCode) {
      expect(postalCode).toBe(testInput.applicationFormCurrentAddresPostalCode);
    });
    informationReviewPage.country.getText().then(function(country) {
      expect(country).toBe(testInput.applicationFormMailingAddresCountry);
    });
    informationReviewPage.certifyCheckBox.click();
    informationReviewPage.submitButton.click();

    consentPage.consentCheckBox.click();
    consentPage.certifyCheckBox.click();
    consentPage.disclosureCheckBox.click();
    consentPage.reportChargesCheckBox.click();
    consentPage.continueButton.click();

    paymentPage.cardNumber.sendKeys(testInput.declinedNoDeviceCardNumber);
    paymentPage.cardCVD.sendKeys(testInput.declinedNoDeviceCVD);
    paymentPage.payNow.click();

    expect(paymentPage.paymentStatus.getText()).toBe(testInput.declinedStatus);
  });
});
