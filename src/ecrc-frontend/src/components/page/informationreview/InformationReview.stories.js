import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import InformationReview from "./InformationReview";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

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
  mailingLine1: "456 Elsewhere",
  mailingCityNm: "There",
  mailingProvinceNm: "Ontario",
  mailingPostalCodeTxt: "V1V 1A1",
  jobTitle: "Painter",
  organizationFacility: ""
};

const org = {
  orgNm: "New Org Name",
  orgTicketNumber: "wsde",
  defaultCrcScopeLevelCd: "WWCH"
};

const setError = () => {};
const setShare = () => {};
const setApplicationInfo = () => {};

const page = {
  header,
  applicant,
  org,
  setApplicationInfo,
  setError,
  setShare
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

const FailData = props => {
  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/private/checkApplicantForPrevCRC";

  mock.onPost(API_REQUEST).reply(400, { message: "No share available." });

  sessionStorage.setItem("validator", "secret");
  sessionStorage.setItem("uuid", "unique123");

  return props.children({ page });
};

const LoadData = props => {
  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/private/checkApplicantForPrevCRC";

  mock.onPost(API_REQUEST).reply(200, {
    serviceId: "1234"
  });

  sessionStorage.setItem("validator", "secret");
  sessionStorage.setItem("uuid", "unique123");

  return props.children({ page });
};

function NonScheduleD() {
  return (
    <FailData props={page}>
      {data => (
        <MemoryRouter>
          <InformationReview page={data.page} />
        </MemoryRouter>
      )}
    </FailData>
  );
}

function DisplayShareOption() {
  return (
    <LoadData props={page}>
      {data => (
        <MemoryRouter>
          <InformationReview page={data.page} />
        </MemoryRouter>
      )}
    </LoadData>
  );
}

function ScheduleD() {
  return (
    <FailData props={page}>
      {data => (
        <MemoryRouter>
          <InformationReview
            page={{
              ...data.page,
              applicant: {
                ...applicant,
                organizationFacility: "PBS WIPB"
              }
            }}
          />
        </MemoryRouter>
      )}
    </FailData>
  );
}

storiesOf("Information Review", module)
  .add("Display Share Option", () => <DisplayShareOption />)
  .add("NonSchedule D Default", () => <NonScheduleD />)
  .add("Schedule D Default", () => <ScheduleD />)
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("NonSchedule D Mobile", () => <NonScheduleD />)
  .add("Schedule D Mobile", () => <ScheduleD />)
  .add("Display Share Mobile", () => <DisplayShareOption />);
