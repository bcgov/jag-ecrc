//import { browser, element, by } from "protractor"

require('dotenv').config();

var bcscRedirectPage = require('../../pageobjectfactory/bcscredirectpage');

var using = require('jasmine-data-provider');

describe('bcscRedirectPage', function () {

    beforeEach(function(){
        browser.get(process.env.BCSC_URL);
    });
    
    it('verify if login redirects to the right page', function(){
        bcscRedirectPage.login.click().then(function(){
            browser.getAllWindowHandles().then(function(windowHandle){
                browser.switchTo().window(windowHandle[1]);
                expect(process.env.BCSC_LOGIN_NAVTITLE).toBe(browser.getTitle());
                browser.close();
                browser.switchTo().window(windowHandle[0]);
            });
        });

    });

    it('verify if setup account redirects to the right page', function(){
        bcscRedirectPage.setUpAccount.click().then(function(){
            browser.getAllWindowHandles().then(function(windowHandle){
                browser.switchTo().window(windowHandle[1]);
                expect(process.env.BCSC_SETUPACCOUNT_NAVTITLE).toBe(browser.getTitle());
                browser.close();
                browser.switchTo().window(windowHandle[0]);
            });
        });

    });

    xit('verify if request form redirects to the right page', function(){
        bcscRedirectPage.requestForm.click().then(function(){
            browser.getAllWindowHandles().then(function(windowHandle){
                browser.switchTo().window(windowHandle[1]);
                expect(process.env.BCSC_LOGIN_NAVTITLE).toBe(browser.getTitle());
                browser.close();
                browser.switchTo().window(windowHandle[0]);
            });
        });

    });

    it('verify if read more redirects to the right page', function(){
        bcscRedirectPage.getBCServicesCardSectionReadMore.click().then(function(){
            browser.getAllWindowHandles().then(function(windowHandle){
                browser.switchTo().window(windowHandle[1]);
                expect(process.env.BCSC_READMORE_NAVTITLE).toBe(browser.getTitle());
                browser.close();
                browser.switchTo().window(windowHandle[0]);
            });
        });

    });
});