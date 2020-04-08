//import { browser, element, by } from "protractor"

require("dotenv").config();

var landingPage = require("../../pageobjectfactory/landingpage");

var using = require("jasmine-data-provider");

describe("landing page", () => {
  beforeAll(() => {
    browser
      .manage()
      .window()
      .maximize();
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

  beforeEach(() => {
    browser.get(process.env.URL);
    handleAlert();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  describe("I need more Information", () => {
    it("Verify if I am an employee or organization redirects to the right page", () => {
      landingPage.needMoreInformationEmployeeOrVolunteer.click().then(() => {
        browser.getAllWindowHandles().then(windowHandle => {
          handleAlert();
          browser.switchTo().window(windowHandle[1]);
          expect(process.env.LP_NEEDMOREINFORMATION_EMPORGNAVTITLE).toBe(
            browser.getTitle()
          );
          browser.close();
          browser.switchTo().window(windowHandle[0]);
        });
      });
    });

    it("Verify if why I need to apply for a criminal record check redirects to the right page", () => {
      landingPage.whyINeedToApplyForACriminalRecordCheck.click().then(() => {
        browser.getAllWindowHandles().then(windowHandle => {
          handleAlert();
          browser.switchTo().window(windowHandle[1]);
          expect(
            process.env.LP_WHYINEEDTOAPPLYFORCRIMINALRECORDCHECK_NAVTITLE
          ).toBe(browser.getTitle());
          browser.close();
          browser.switchTo().window(windowHandle[0]);
        });
      });
    });

    it("Verify if I'm an authorized contact redirects to the right page", () => {
      landingPage.iAmAnAuthorizedContact.click().then(() => {
        browser.getAllWindowHandles().then(windowHandle => {
          handleAlert();
          browser.switchTo().window(windowHandle[1]);
          expect(process.env.LP_IAMANAUTHORIZEDCONTACT_NAVTITLE).toBe(
            browser.getTitle()
          );
          browser.close();
          browser.switchTo().window(windowHandle[0]);
        });
      });
    });

    it("Verify if I'm an employer organization redirects to the right page", () => {
      landingPage.iAmAnEmployerOrganization.click().then(() => {
        browser.getAllWindowHandles().then(windowHandle => {
          handleAlert();
          browser.switchTo().window(windowHandle[1]);
          expect(process.env.LP_IAMANEMPLOYERORGANIZATION_NAVTITLE).toBe(
            browser.getTitle()
          );
          browser.close();
          browser.switchTo().window(windowHandle[0]);
        });
      });

      it("Verify if I'm a volunteer organization redirects to the right page", () => {
        landingPage.iAmAnVolunteerOrganization.click().then(() => {
          browser.getAllWindowHandles().then(windowHandle => {
            handleAlert();
            browser.switchTo().window(windowHandle[1]);
            expect(process.env.LP_IAMAVOLUNTEERORGANIZATION_NAVTITLE).toBe(
              browser.getTitle()
            );
            browser.close();
            browser.switchTo().window(windowHandle[0]);
          });
        });
      });

      it("Verify if Criminal Records Review Act (CRRA) redirects to the right page", () => {
        landingPage.criminalRecordsReviewAct.click().then(() => {
          browser.getAllWindowHandles().then(windowHandle => {
            handleAlert();
            browser.switchTo().window(windowHandle[1]);
            expect(process.env.LP_CRIMINALRECORDSREVIEWACT_NAVTITLE).toBe(
              browser.getTitle()
            );
            browser.close();
            browser.switchTo().window(windowHandle[0]);
          });
        });
      });
    });
    // describe("I am ready", () => {
    //   let accessCode = require("../../input/accesscode");

    //   using(accessCode.accessCode.validCode, validCode => {
    //     it("Verify if the user is directed to the right page on validating a valid access code", () => {
    //       landingPage.accessCode.sendKeys(validCode);

    //       landingPage.validate.click().then(() => {
    //         browser.sleep(4000);
    //         expect(process.env.ORGVERIFICATION_URL).toBe(browser.getCurrentUrl());
    //       });
    //     });
    //   });

    //   using(accessCode.accessCode.invalidCode, invalidCode => {
    //     it("Verify if the user is directed to the right page on validating a valid access code", () => {
    //       landingPage.accessCode.sendKeys(invalidCode);

    //       landingPage.validate.click().then(() => {
    //         browser.sleep(4000);
    //         expect(process.env.TRANSITION_URL).toBe(browser.getCurrentUrl());
    //       });
    //     });
    //   });

    //   xit("Verify if visit the criminal record review website redirects to the right page", () => {
    //     landingPage.visitTheCriminalRecordReviewWebsite.click().then(() => {
    //       browser.getAllWindowHandles().then(windowHandle => {
    //         browser.switchTo().window(windowHandle[1]);
    //         expect(
    //           process.env.LP_VISITTHECRIMINALRECORDREVIEWWEBSITE_NAVTITLE
    //         ).toBe(browser.getTitle());
    //         browser.close();
    //         browser.switchTo().window(windowHandle[0]);
    //       });
    //     });
    //   });

    afterEach(() => {
      browser.get(process.env.URL);
      handleAlert();
    });
  });
});
