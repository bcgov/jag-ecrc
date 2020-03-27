import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import InformationReview from "./InformationReview";
import {
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

export default {
  title: "InformationReview",
  component: InformationReview
};

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
  organizationFacility: ""
};

const org = {
  orgNm: "New Org Name"
};

const setError = () => {};
const setShare = () => {};

function LoadData(props) {
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
    organizationFacility: ""
  };

  const org = {
    orgNm: "New Org Name"
  };

  const setError = () => {};
  const setShare = () => {};

  const mock = new MockAdapter(axios);
  const API_REQUEST = "/private/checkShare";

  mock.onGet(API_REQUEST).reply(200, {
    oldOrg: "Old Org Name",
    oldCRCExpiration: "2021-10-01"
  });

  const page = {
    header,
    applicant,
    org,
    setError,
    setShare
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

  return props.children({ page });
}

const page = {
  header,
  applicant,
  org,
  setError,
  setShare
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

export const NonScheduleD = () => (
  <MemoryRouter>
    <InformationReview page={page} />
  </MemoryRouter>
);

export const ScheduleD = () => (
  <MemoryRouter>
    <InformationReview
      page={{
        ...page,
        applicant: {
          ...applicant,
          organizationFacility: "PBS WIPB"
        }
      }}
    />
  </MemoryRouter>
);

export const AvailableShare = () => (
  <LoadData>
    {data => (
      <MemoryRouter>
        <InformationReview page={data.page} />
      </MemoryRouter>
    )}
  </LoadData>
);

// TODO: Add more stories for aliases
