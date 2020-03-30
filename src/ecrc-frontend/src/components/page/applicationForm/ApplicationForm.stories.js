import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";

import ApplicationForm from "./ApplicationForm";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

export default {
  title: "ApplicationForm",
  component: ApplicationForm
};

const header = {
  name: "Criminal Record Check"
};

const applicant = {
  legalFirstNm: "Robert",
  legalSecondNm: "Norman",
  legalSurnameNm: "Ross",
  birthPlace: "",
  birthDt: "1942-10-29",
  genderTxt: "Male",
  driversLicNo: "",
  phoneNumber: "",
  emailAddress: "",
  addressLine1: "123 Somewhere",
  cityNm: "Here",
  provinceNm: "British Columbia",
  postalCodeTxt: "V9V 9V9",
  countryNm: "Canada",
  jobTitle: "",
  organizationFacility: ""
};

const setApplicant = () => {};
const setError = () => {};
// const sameAddress = true;
// const setSameAddress = () => {};

const [sameAddress, setSameAddress] = useState(true);

const org = {
  defaultScheduleTypeCd: "WBSD"
};

const page = {
  header,
  applicant,
  org,
  setApplicant,
  setError
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
    "consent",
    "userConfirmation"
  ],
  authorities: ["Authorized"]
};
generateJWTToken(newPayload);

export const NonScheduleD = () => (
  <MemoryRouter>
    <ApplicationForm
      page={{ ...page, org: { defaultScheduleTypeCd: "WBSC" } }}
    />
  </MemoryRouter>
);

export const ScheduleD = () => (
  <MemoryRouter>
    <ApplicationForm page={page} />
  </MemoryRouter>
);
