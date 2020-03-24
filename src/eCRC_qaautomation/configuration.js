module.exports.config={
    seleniumAddress:'http://localhost:4444/wd/hub',
    specs:['./automationtest/moduletests/landingpage_spec.js', './automationtest/moduletests/bcscredirect_spec.js'],
    framework:'jasmine',
    onPrepare: function(){
        browser.waitForAngularEnabled(false);
        browser.driver.manage().timeouts().implicitlyWait(20000);
    },
    suites:{
        regression:'./automationtest/*/*_spec.js',
        module:'./automationtest/moduletests/landingpage_spec.js',
        consent: './automationtest/moduletests/consentpage_spec.js',
        termsofuse: './automationtest/moduletests/termsofusepage_spec.js',
        success:'./automationtest/smoketests/success_spec.js'
    },
    capabilities:{
        browserName: 'chrome',
       /* chromeOptions: {
            args: ["--headless", "--window-size=800x600"]
        }*/
    }
}