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
    routing: "./automationtest/routingtests/routing_spec.js",
    volunteer: "./automationtest/smoketests/success_volunteer_spec.js",
    successpage: "./automationtest/moduletests/successpage_spec.js",
    landing: "./automationtest/moduletests/landingpage_spec.js",
    bcscredirect: "./automationtest/moduletests/bcscredirectpage_spec.js",
    termsofuse: "./automationtest/moduletests/termsofusepage_spec.js",
    smoke: "./automationtest/smoketests/*_spec.js"
  },
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      prefs: {
        download: {
          default_directory: "/tmp/pdfdownloads",
          directory_upgrade: true,
          prompt_for_download: false
        }
      }
    }
  }
};
