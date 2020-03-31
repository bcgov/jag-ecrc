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
  orgNm: "New Org Name"
};

const setError = () => {};
const setShare = () => {};

const page = {
  header,
  applicant,
  org,
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

function LoadData(props) {
  if (process.env.REACT_APP_API_BASE_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  }

  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/private/checkShare?requestGuid=unique123";

  mock.onGet(API_REQUEST).reply(200, {
    oldOrg: "Old Org",
    oldCRCExpiration: "2021-10-22"
  });

  sessionStorage.setItem("validator", "secret");
  sessionStorage.setItem("uuid", "unique123");

  return props.children({ page });
}

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

storiesOf("Information Review", module)
  .add("Display Share Option", () => (
    <LoadData props={page}>
      {data => (
        <MemoryRouter>
          <InformationReview page={data.page} />
        </MemoryRouter>
      )}
    </LoadData>
  ))
  .add("NonSchedule D Default", () => (
    <MemoryRouter>
      <InformationReview page={page} />
    </MemoryRouter>
  ))
  .add("Schedule D Default", () => (
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
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("NonSchedule D Mobile", () => (
    <MemoryRouter>
      <InformationReview page={page} />
    </MemoryRouter>
  ))
  .add("Schedule D Mobile", () => (
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
  ));
