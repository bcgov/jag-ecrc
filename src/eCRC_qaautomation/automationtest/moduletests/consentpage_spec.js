//import { browser, element, by } from "protractor"

require('dotenv').config();

var consentPage = require('../../pageobjectfactory/consentpage.js');

var using = require('jasmine-data-provider');

describe('consent page', function () {

    beforeEach(function(){
        browser.get(process.env.CONSENT_URL);
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

            expect('true').toBe(consentPage.applicantName.getAttribute('readonly'));
        });

    });

    it('verify if continue is disabled when the applicant name hasn\'t been entered', function(){

        consentPage.consentCheckBox.click();
        
        consentPage.certifyCheckBox.click();

        consentPage.unknownCheckBox.click();

        expect('true').toBe(consentPage.continueButton.getAttribute('disabled'));
        
    });

    it('verify if checking all the checkboxes and filling the applicant name allows to continue', function(){

        consentPage.consentCheckBox.click();
        
        consentPage.certifyCheckBox.click();

        consentPage.unknownCheckBox.click();

        consentPage.applicantName.sendKeys('QaAutomation');

        consentPage.continueButton.click();

        expect(process.env.APPLICATIONFORM_NAVTITLE).toBe(browser.getTitle());
        
    });

});
