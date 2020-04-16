# QA Automation for eCRC

In the project directory run

## `npm install`

Installs all the required dependencies to run protractor tests.

To run the protractor tests

Create a file named .env in the format of the file .env.template and replace the values for the keys with the appropriate values.

## `npm run webdriver-manager-update`

Installs the latest webdrivers for the browser

## `npm run webdriver-manager-start`

Starts the selenium webdriver server in http://localhost:4444/wd/hub

## `npm run **test-suite**`

Runs the specified test suite declared in configuration.js and package.json. Below are some example commands:

`npm run success` to run a single end to end test for a regular user.

`npm run smoke` to run all of the end to end tests.

`npm run regression` to run all tests.
