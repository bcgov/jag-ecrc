/* eslint-disable no-console */
import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ApplicationForm from "./ApplicationForm";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

console.error = () => {}; // for async storyshot errors, due to lack of support

function LoadData(props) {
  if (process.env.REACT_APP_API_BASE_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  }

  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/protected/getProvinceList?requestGuid=unique123";

  mock.onGet(API_REQUEST).reply(200, {
    provinces: {
      province: [
        { name: "British Columbia" },
        { name: "Ontario" },
        { name: "Alberta" }
      ]
    }
  });

  const API_REQUEST_JWT =
    "/ecrc/protected/login?code=code&requestGuid=unique123";

  const tokenPayload = {
    userInfo: {
      birthdate: "04/04/04",
      address: {
        street_address: "123 addy",
        locality: "local",
        region: "ab",
        postal_code: "v9n1d4"
      },
      gender: "M",
      given_name: "given",
      given_names: "givens",
      family_name: "fam",
      identity_assurance_level: 3
    },
    authorities: ["Authorized", "ROLE"]
  };
  const token = generateJWTToken(tokenPayload);

  mock.onGet(API_REQUEST_JWT).reply(200, token);

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
  const [sameAddress, setSameAddress] = useState(true);

  const org = {
    defaultScheduleTypeCd: "WBSD"
  };

  const page = {
    header,
    applicant,
    org,
    setApplicant,
    setError,
    sameAddress,
    setSameAddress
  };

  sessionStorage.setItem("validator", "secret");
  sessionStorage.setItem("uuid", "unique123");

  return props.children({ page, org });
}

storiesOf("Application Form Page", module)
  .add("Non Schedule D", () => (
    <LoadData>
      {data => (
        <MemoryRouter initialEntries={["/applicationform?code=code"]}>
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
        <MemoryRouter initialEntries={["/applicationform?code=code"]}>
          <ApplicationForm page={data.page} />
        </MemoryRouter>
      )}
    </LoadData>
  ));
