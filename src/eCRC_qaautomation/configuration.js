module.exports.config = {
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: [
    "./automationtest/moduletests/landingpage_spec.js",
    "./automationtest/moduletests/bcscredirect_spec.js"
  ],
  framework: "jasmine",
  onPrepare: () => {
    browser.waitForAngularEnabled(false);
    browser.driver
      .manage()
      .timeouts()
      .implicitlyWait(200000);
  },
  suites: {
    regression: "./automationtest/*/*_spec.js",
    module: "./automationtest/moduletests/termsofusepage_spec.js",
    consent: "./automationtest/moduletests/consentpage_spec.js",
    termsofuse: "./automationtest/moduletests/termsofusepage_spec.js",
    success: "./automationtest/smoketests/success_spec.js",
    routing: "./automationtest/routingtests/routingtests.js",
    volunteer: "./automationtest/smoketests/success_volunteer_spec.js",
    successpage: "./automationtest/moduletests/successpage_spec.js"
  },
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      //args: ["--headless", "--window-size=800x600"]
      prefs: {
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory: "/tmp/pdfdownloads"
        }
      }
    }
  }
};
