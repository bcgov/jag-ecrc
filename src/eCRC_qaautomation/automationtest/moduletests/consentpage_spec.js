//import { browser, element, by } from "protractor"

require('dotenv').config();

var bcscRedirectPage = require('../../pageobjectfactory/bcscredirectpage');

var landingPage = require('../../pageobjectfactory/landingpage');

var bcscRedirectPage = require('../../pageobjectfactory/bcscredirectpage');

var orgVerificationPage = require('../../pageobjectfactory/orgverificationpage');

var termsOfUsePage = require('../../pageobjectfactory/termsofusepage');

var bcServicesCardLandingPage = require('../../pageobjectfactory/bcservicescardlandingpage');

var bcServicesCardLoginPage = require('../../pageobjectfactory/bcservicescardloginpage');

var bcscConsentPage = require('../../pageobjectfactory/bcscconsentpage');

var consentPage = require('../../pageobjectfactory/consentpage.js');

var applicationFormPage = require('../../pageobjectfactory/applicationformpage');

var informationReviewPage = require('../../pageobjectfactory/informationreviewpage');

var testInput = require('../../input/success');

var using = require('jasmine-data-provider');

describe('consent page', function () {

    beforeEach(function(){
        browser.get(process.env.URL);

        browser.manage().window().maximize();
        
        landingPage.accessCode.sendKeys(testInput.validAccessCode);

        landingPage.validate.click();

        browserWait=protractor.ExpectedConditions;

        browser.wait(browserWait.elementToBeClickable(orgVerificationPage.continue),10000);

        browser.sleep(4000);
        
        orgVerificationPage.continue.click();

        termsOfUsePage.readAndAcceptCheckBox.click();

        termsOfUsePage.authorizeEmailIdCheckBox.click();

        browser.executeScript('arguments[0].scrollIntoView(true)', termsOfUsePage.termsOfUseFinalParagraph);

        termsOfUsePage.continueButton.click();

        browser.wait(browserWait.elementToBeClickable(bcscRedirectPage.login),10000);

        bcscRedirectPage.login.click();

        bcServicesCardLandingPage.virtualCardTesting.click();

        bcServicesCardLoginPage.cardSerialNumber.sendKeys(testInput.bcServicesCardSerialNumber);

        bcServicesCardLoginPage.continueButton.click();
        
        bcServicesCardLoginPage.password.sendKeys(testInput.bcServicesCardPassword);

        bcServicesCardLoginPage.continueButton.click();

        bcServicesCardLoginPage.continueButton.click();

        expect(true).toBe(browser.getCurrentUrl().then(function(url){
            return url.includes(process.env.BCSC_CONSENT_URL);
        }));

        bcscConsentPage.name.count().then(function(count){
          expect(count).toBe(1);  
        });

        bcscConsentPage.yes.click();

        expect(applicationFormPage.firstName.getAttribute('value')).toBe(testInput.applicationFormFirstName);

        expect(applicationFormPage.lastName.getAttribute('value')).toBe(testInput.applicationFormLastName);

        expect(applicationFormPage.sex.getAttribute('value')).toBe(testInput.applicationFormGender);

        expect(applicationFormPage.middleName.getAttribute('value')).toBe(testInput.applicationFormMiddleName);

        expect(applicationFormPage.dateOfBirth.getAttribute('value')).toBe(testInput.applicationFormDateOfBirth);

        expect(applicationFormPage.currentAddresCountry.getAttribute('value')).toBe(testInput.applicationFormCurrentAddresCountry);

        expect(applicationFormPage.currentAddressCity.getAttribute('value')).toBe(testInput.applicationFormCurrentAddressCity);

        expect(applicationFormPage.currentAddresPostalCode.getAttribute('value')).toBe(testInput.applicationFormCurrentAddresPostalCode);

        expect(applicationFormPage.currentAddressStreet.getAttribute('value')).toBe(testInput.applicationFormCurrentAddressStreet);

        expect(applicationFormPage.currentAddressProvince.getAttribute('value')).toBe(testInput.applicationFormCurrentAddressProvince);

        applicationFormPage.currentAddressNotSameAsMailingAddressCheckBox.click();

        applicationFormPage.cityAndCountryBirth.sendKeys(testInput.applicationFormCityAndCountryBirth);

        applicationFormPage.phoneNumber.sendKeys(testInput.applicationFormPhoneNumber);

        applicationFormPage.emailAddress.sendKeys(testInput.applicationFormEmailAddress);

        applicationFormPage.applicantPosition.sendKeys(testInput.applicationFormApplicantPosition);

        applicationFormPage.organizationFacility.sendKeys(testInput.applicationFormOrganizationFacility);

        applicationFormPage.mailingAddressStreet.sendKeys(testInput.applicationFormMailingAddressStreet);

        applicationFormPage.mailingAddressCity.sendKeys(testInput.applicationFormCurrentAddressCity);

        applicationFormPage.mailingAddressProvince.sendKeys(testInput.applicationFormCurrentAddressProvince);

        applicationFormPage.mailingAddresPostalCode.sendKeys(testInput.applicationFormCurrentAddresPostalCode);

        applicationFormPage.mailingAddresCountry.sendKeys(testInput.applicationFormMailingAddresCountry);

        applicationFormPage.continueButton.click();

        informationReviewPage.cityAndCountryBirth.getText().then(function(cityAndCountryBirth){
            expect(cityAndCountryBirth).toBe(testInput.applicationFormCityAndCountryBirth);
        });

        informationReviewPage.phoneNumber.getText().then(function(phoneNumber){
            expect(phoneNumber).toBe(testInput.applicationFormPhoneNumber);
        });

        informationReviewPage.emailAddress.getText().then(function(emailAddress){
            expect(emailAddress).toBe(testInput.applicationFormEmailAddress);
        });

        informationReviewPage.applicantPosition.getText().then(function(applicantPosition){
            expect(applicantPosition).toBe(testInput.applicationFormApplicantPosition);
        });

        informationReviewPage.organizationFacility.getText().then(function(organizationFacility){
            expect(organizationFacility).toBe(testInput.applicationFormOrganizationFacility);
        });

        informationReviewPage.street.getText().then(function(street){
            expect(street).toBe(testInput.applicationFormMailingAddressStreet);
        });

        informationReviewPage.city.getText().then(function(city){
            expect(city).toBe(testInput.applicationFormCurrentAddressCity);
        });

        informationReviewPage.province.getText().then(function(province){
            expect(province).toBe(testInput.applicationFormCurrentAddressProvince);
        });

        informationReviewPage.postalCode.getText().then(function(postalCode){
            expect(postalCode).toBe(testInput.applicationFormCurrentAddresPostalCode);
        });

        informationReviewPage.country.getText().then(function(country){
            expect(country).toBe(testInput.applicationFormMailingAddresCountry);
        });

        informationReviewPage.certifyCheckBox.click();

        informationReviewPage.submitButton.click();
    });

    using([{ unchecked: 'consent' }, { unchecked: 'certify' }, { unchecked: 'unknown' }], function (unchecked) {
        it('verify if applicant name field is disabled when one ore more of the checkboxes are unchecked', function () {

            if (unchecked.unchecked === 'consent') {

                consentPage.certifyCheckBox.click();

                consentPage.unknownCheckBox.click();

            } else if (unchecked.unchecked === 'certify') {

                consentPage.consentCheckBox.click();

                consentPage.unknownCheckBox.click();


            } else {

                consentPage.consentCheckBox.click();

                consentPage.certifyCheckBox.click();

            }

            expect('true').toBe(consentPage.continueButton.getAttribute('disabled'));
        });

    });

    xit('verify if continue is disabled when the applicant name hasn\'t been entered', function(){

        consentPage.consentCheckBox.click();
        
        consentPage.certifyCheckBox.click();

        consentPage.unknownCheckBox.click();

        expect('true').toBe(consentPage.continueButton.getAttribute('disabled'));
        
    });

    it('verify if checking all the checkboxes and filling the applicant name allows to continue', function(){

        consentPage.consentCheckBox.click();
        
        consentPage.certifyCheckBox.click();

        consentPage.unknownCheckBox.click();

        consentPage.continueButton.click();

        expect(process.env.APPLICATIONFORM_NAVTITLE).toBe(browser.getTitle());
        
    });

});
