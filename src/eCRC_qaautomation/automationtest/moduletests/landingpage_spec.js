//import { browser, element, by } from "protractor"

require('dotenv').config();

import { needMoreInformationEmployeeOrVolunteer, whyINeedToApplyForACriminalRecordCheck, iAmAnAuthorizedContact, iAmAnEmployerOrganization, iAmAnVolunteerOrganization, criminalRecordsReviewAct, accessCode as _accessCode, validate, visitTheCriminalRecordReviewWebsite } from '../../pageobjectfactory/landingpage';

import using from 'jasmine-data-provider';

describe('landing page', function () {

    beforeAll(function () {
        browser.manage().window().maximize();
    });

    beforeEach(function () {
        browser.get(process.env.URL);
    });

    describe('I need more Information', function () {

        beforeEach(function () {
            browser.get(process.env.URL);
        });

        it('Verify if I am an employee or organization redirects to the right page', function () {

            needMoreInformationEmployeeOrVolunteer.click().then(function () {
                expect(process.env.LP_NEEDMOREINFORMATION_EMPORGNAVTITLE).toBe(browser.getTitle());
            });

        });

        it('Verify if why I need to apply for a criminal record check redirects to the right page', function () {

            whyINeedToApplyForACriminalRecordCheck.click().then(function () {
                expect(process.env.LP_WHYINEEDTOAPPLYFORCRIMINALRECORDCHECK_NAVTITLE).toBe(browser.getTitle());
            });

        });

        it('Verify if I\'m an authorized contact redirects to the right page', function () {

            iAmAnAuthorizedContact.click().then(function () {
                expect(process.env.LP_IAMANAUTHORIZEDCONTACT_NAVTITLE).toBe(browser.getTitle());
            });

        });

        it('Verify if I\'m an employer organization redirects to the right page', function () {

            iAmAnEmployerOrganization.click().then(function () {
                expect(process.env.LP_IAMANEMPLOYERORGANIZATION_NAVTITLE).toBe(browser.getTitle());
            });

        });

        it('Verify if I\'m a volunteer organization redirects to the right page', function () {

            iAmAnVolunteerOrganization.click().then(function () {
                expect(process.env.LP_IAMAVOLUNTEERORGANIZATION_NAVTITLE).toBe(browser.getTitle());
            });

        });

    });

    it('Verify if Criminal Records Review Act (CRRA) redirects to the right page', function () {

        criminalRecordsReviewAct.click().then(function () {
            expect(process.env.LP_CRIMINALRECORDSREVIEWACT_NAVTITLE).toBe(browser.getTitle());
        });

    });

    xdescribe('I need help', function () {

        xit('Verify if criminalrecords@gov.bc.ca redirects to the right page', function () {

            criminalRecordsReviewAct.click().then(function () {
                expect(properties.properties.lp_criminalrecordsreviewact_navtitle).toBe(browser.getTitle());
            });

        });
    });

    describe('I am ready', function () {

        var accessCode = require('../../input/accesscode');

        using(accessCode.accessCode.validCode, function (validCode) {
            it('Verify if the user is directed to the right page on validating a valid access code', function () {

                _accessCode.sendKeys(validCode);

                validate.click().then(function () {
                    browser.sleep(4000);
                    expect(process.env.ORGVERIFICATION_URL).toBe(browser.getCurrentUrl());
                });

            });
        });

        using(accessCode.accessCode.invalidCode, function (invalidCode) {
            it('Verify if the user is directed to the right page on validating a valid access code', function () {

                _accessCode.sendKeys(invalidCode);

                validate.click().then(function () {
                    browser.sleep(4000);
                    expect(process.env.TRANSITION_URL).toBe(browser.getCurrentUrl());
                });

            });
        });

        it('Verify if visit the criminal record review website redirects to the right page', function () {

            visitTheCriminalRecordReviewWebsite.click().then(function () {
                browser.getAllWindowHandles().then(function (windowHandle) {
                    browser.switchTo().window(windowHandle[1]);
                    expect(process.env.LP_VISITTHECRIMINALRECORDREVIEWWEBSITE_NAVTITLE).toBe(browser.getTitle());
                    browser.close();
                    browser.switchTo().window(windowHandle[0]);
                });
            });

        });

        afterEach(function () {
            browser.get(process.env.URL);
        });
    });

});