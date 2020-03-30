import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Consent from "./Consent";
import {
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

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
  mailingAddressLine1: "456 Elsewhere",
  mailingCity: "There",
  mailingProvince: "Ontario",
  mailingPostalCode: "V1V 1A1",
  jobTitle: "Painter",
  emailType: "Home"
};

const org = {
  orgApplicantRelationship: "EMPLOYEE",
  orgTicketNumber: "crce",
  defaultScheduleTypeCd: "WBSD",
  defaultCrcScopeLevelCd: "WWCH"
};

const setApplicationInfo = () => {};
const saveApplicant = () => {};
const saveOrg = () => {};
const saveApplicationInfo = () => {};
const setError = () => {};

const page = {
  header,
  applicant,
  org,
  setApplicationInfo,
  saveApplicant,
  saveOrg,
  saveApplicationInfo,
  setError
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
const newPayload = {
  ...currentPayload,
  actionsPerformed: [
    "infoReview",
    "appForm",
    "tou",
    "bcscRedirect",
    "orgVerification",
    "consent",
    "userConfirmation"
  ],
  authorities: ["Authorized"]
};
generateJWTToken(newPayload);

const onContinueClick = action("onButtonContinueClicked");

storiesOf("Consent page", module)
  .add("Default", () => (
    <MemoryRouter>
      <Consent page={page} onContinueClick={onContinueClick} />
    </MemoryRouter>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <MemoryRouter>
      <Consent page={page} onContinueClick={onContinueClick} />
    </MemoryRouter>
  ));
