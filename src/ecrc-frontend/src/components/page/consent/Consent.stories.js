import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Consent from "./Consent";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

const header = {
  name: "Criminal Record Check"
};

const applicant = {
  legalFirstNm: "Robert",
  legalSecondNm: "Norman",
  legalSurnameNm: "Ross",
  birthPlace: "Daytona Beach, Florida",
  birthDt: "1942-10-29",
  genderTxt: "Male",
  driversLicNo: "1234567",
  phoneNumber: "2501234567",
  emailAddress: "bob.ross@example.com",
  addressLine1: "123 Somewhere",
  cityNm: "Here",
  provinceNm: "British Columbia",
  postalCodeTxt: "V9V 9V9",
  countryNm: "Canada",
  mailingLine1: "456 Elsewhere",
  mailingCityNm: "There",
  mailingProvinceNm: "Ontario",
  mailingPostalCodeTxt: "V1V 1A1",
  jobTitle: "Painter",
  organizationFacility: "PBS",
  emailType: "HOEM"
};

const org = {
  orgNm: "Org Name",
  orgApplicantRelationship: "EMPLOYEE",
  orgTicketNumber: "crce",
  defaultScheduleTypeCd: "WBSD",
  defaultCrcScopeLevelCd: "WWCH"
};

const applicationInfo = {};
const setApplicationInfo = () => {};
const saveApplicant = () => {};
const saveOrg = () => {};
const saveApplicationInfo = () => {};
const setError = () => {};
const share = false;

const page = {
  header,
  applicant,
  org,
  applicationInfo,
  setApplicationInfo,
  saveApplicant,
  saveOrg,
  saveApplicationInfo,
  setError,
  share
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

const newPayload = {
  actionsPerformed: [
    "infoReview",
    "appForm",
    "tou",
    "bcscRedirect",
    "orgVerification",
    "consent"
  ],
  authorities: ["Authorized", "ROLE"]
};
generateJWTToken(newPayload);

const onContinueClick = action("onButtonContinueClicked");

storiesOf("Consent page", module)
  .add("Default", () => (
    <MemoryRouter>
      <Consent page={page} onContinueClick={onContinueClick} />
    </MemoryRouter>
  ))
  .add("Sharing", () => (
    <MemoryRouter>
      <Consent
        page={{ ...page, share: true }}
        onContinueClick={onContinueClick}
      />
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <Consent page={page} onContinueClick={onContinueClick} />
    </MemoryRouter>
  ))
  .add("MobileSharing", () => (
    <MemoryRouter>
      <Consent
        page={{ ...page, share: true }}
        onContinueClick={onContinueClick}
      />
    </MemoryRouter>
  ));
