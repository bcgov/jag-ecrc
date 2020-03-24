//import { browser, element, by } from "protractor"

require('dotenv').config();

var termsOfUsePage = require('../../pageobjectfactory/termsofusepage');

var using = require('jasmine-data-provider');

describe('terms of use page', function () {

    beforeEach(function () {
        browser.get(process.env.TERMSOFUSE_URL);
    });

    it('verify that the continue button is enabled when all checkboxes are checked and the terms of use is scrolled to end of section', function () {

        termsOfUsePage.readAndAcceptCheckBox.click();

        termsOfUsePage.authorizeEmailIdCheckBox.click();

        browser.actions().mouseMove(termsOfUsePage.termsOfUseFinalParagraph).perform();

        termsOfUsePage.continueButton.click();

        expect(process.env.TERMSOFUSE_CONTINUE_NAVTITLE).toBe(browser.getTitle());
    });


    using([{ unchecked: 'readAndAcceptCheckBox' }, { unchecked: 'authorizeEmailIdCheckBox' }, { unchecked: 'termsOfUse' }], function (unchecked) {
        it('verify that the continue button is disabled when one or more checkboxes are unchecked or if the terms of use is not scrolled', function () {

            if (unchecked.unchecked === 'readAndAcceptCheckBox') {

                termsOfUsePage.authorizeEmailIdCheckBox.click();

                browser.actions().mouseMove(termsOfUsePage.termsOfUseFinalParagraph).perform();

            }
            else if (unchecked.unchecked === 'authorizeEmailIdCheckBox') {

                termsOfUsePage.readAndAcceptCheckBox.click();

                browser.actions().mouseMove(termsOfUsePage.termsOfUseFinalParagraph).perform();

            }
            else {

                termsOfUsePage.readAndAcceptCheckBox.click();

                termsOfUsePage.authorizeEmailIdCheckBox.click();
            }

            expect(false).toBe(termsOfUsePage.continueButton.isEnabled());
        });
    })

});
