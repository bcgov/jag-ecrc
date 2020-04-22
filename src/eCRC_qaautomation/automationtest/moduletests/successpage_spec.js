require("dotenv").config();

const fs = require("fs");
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

describe("success page", () => {
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

  beforeAll(() => {
    browser
      .manage()
      .window()
      .maximize();
  });

  beforeEach(() => {
    browser.get(testInput.BASE_URL);
    handleAlert();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000;

    landingPage.accessCode.sendKeys(testInput.validAccessCode);
    landingPage.validate.click();
    browserWait = protractor.ExpectedConditions;

    browser.wait(
      browserWait.elementToBeClickable(orgVerificationPage.continue),
      20000
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

    informationReviewPage.street.getText().then(street => {
      expect(street).toBe(testInput.applicationFormMailingAddressStreet);
    });

    informationReviewPage.city.getText().then(city => {
      expect(city).toBe(testInput.applicationFormCurrentAddressCity);
    });

    informationReviewPage.province.getText().then(province => {
      expect(province).toBe(testInput.applicationFormCurrentAddressProvince);
    });

    informationReviewPage.postalCode.getText().then(postalCode => {
      expect(postalCode).toBe(testInput.applicationFormCurrentAddresPostalCode);
    });

    informationReviewPage.country.getText().then(country => {
      expect(country).toBe(testInput.applicationFormMailingAddresCountry);
    });

    informationReviewPage.certifyCheckBox.click();
    informationReviewPage.submitButton.click();
    consentPage.consentCheckBox.click();
    consentPage.certifyCheckBox.click();
    consentPage.disclosureCheckBox.click();
    consentPage.reportChargesCheckBox.click();
    consentPage.continueButton.click();
  });

  //Test commented out for pipeline due to issues downloading PDF in headless mode
  // it("verify when download button is clicked that pdf is downloaded containing receipt info", () => {
  //   browser.wait(browserWait.elementToBeClickable(paymentPage.payNow), 20000);
  //   paymentPage.cardNumber.sendKeys(testInput.approvedCardNumber);
  //   paymentPage.cardCVD.sendKeys(testInput.approvedCardCVD);
  //   paymentPage.payNow.click();
  //   expect(paymentPage.paymentStatus.getText()).toBe(testInput.approvedStatus);

  //   expect(successPage.lastName.getText()).toBe(
  //     testInput.applicationFormLastName
  //   );
  //   expect(successPage.firstName.getText()).toBe(
  //     testInput.applicationFormFirstName
  //   );

  //   let filename = testInput.PDF_PATH.concat("\\");

  //   successPage.serviceNumber.getText().then(serviceNumberVal => {
  //     filename = filename.concat(serviceNumberVal);

  //     successPage.lastName.getText().then(lastNameVal => {
  //       filename = filename.concat(lastNameVal);

  //       successPage.firstName.getText().then(firstNameVal => {
  //         filename = filename.concat(firstNameVal, ".pdf");

  //         if (fs.existsSync(filename)) {
  //           //Delete file if it already exists
  //           fs.unlinkSync(filename);
  //         }

  //         successPage.downloadButton.click();

  //         browser.sleep(1000);

  //         browser.driver
  //           .wait(() => {
  //             //Wait until file has finished downloading.
  //             return fs.existsSync(filename);
  //           }, 10000)
  //           .then(() => {
  //             expect(fs.readFileSync(filename, { encoding: "utf8" })).toContain(
  //               testInput.applicationFormLastName
  //             );
  //           });
  //       });
  //     });
  //   });
  // });

  it("verify that after a failed payment, we can retry successfully", () => {
    browser.wait(browserWait.elementToBeClickable(paymentPage.payNow), 20000);
    browser.sleep(1000);
    paymentPage.cardNumber.sendKeys(testInput.declinedCardNumber);
    paymentPage.cardCVD.sendKeys(testInput.declinedCardCVD);
    paymentPage.payNow.click();
    expect(paymentPage.paymentStatus.getText()).toBe(testInput.declinedStatus);

    successPage.retryPaymentLink.click();
    browser.wait(browserWait.elementToBeClickable(paymentPage.payNow), 20000);
    browser.sleep(1000);
    paymentPage.cardNumber.sendKeys(testInput.approvedCardNumber);
    paymentPage.cardCVD.sendKeys(testInput.approvedCardCVD);
    paymentPage.payNow.click();
    expect(paymentPage.paymentStatus.getText()).toBe(testInput.approvedStatus);
  });
});
