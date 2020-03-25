import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ApplicationForm from "./ApplicationForm";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

function LoadData(props) {
  if (process.env.REACT_APP_API_BASE_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  }

  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/private/getProvinceList?requestGuid=unique123";

  mock.onGet(API_REQUEST).reply(200, {
    provinces: {
      province: [
        { name: "British Columbia" },
        { name: "Ontario" },
        { name: "Alberta" }
      ]
    }
  });

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
      "consent"
    ],
    authorities: ["Authorized", "ROLE"]
  };
  generateJWTToken(newPayload);

  return props.children({ page, org });
}

storiesOf("Application Form Page", module)
  .add("Non Schedule D", () => (
    <LoadData>
      {data => (
        <MemoryRouter>
          <ApplicationForm
            page={{
              ...data.page,
              org: { ...data.org, defaultScheduleTypeCd: "WBSC" }
            }}
          />
        </MemoryRouter>
      )}
    </LoadData>
  ))
  .add("Schedule D", () => (
    <LoadData>
      {data => (
        <MemoryRouter>
          <ApplicationForm page={data.page} />
        </MemoryRouter>
      )}
    </LoadData>
  ));
