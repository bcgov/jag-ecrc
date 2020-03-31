/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import BcscRedirect from "./BcscRedirect";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

function LoadData(props) {
  if (process.env.REACT_APP_API_BASE_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  }

  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/protected/getBCSCUrl?requestGuid=unique123";

  mock.onGet(API_REQUEST).reply(200, "bcscurl.com");

  const header = {
    name: "BC Services Card"
  };

  const saveOrg = () => {};
  const setError = () => {};

  const page = {
    header,
    saveOrg,
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

  return props.children(page);
}

storiesOf("BcscRedirect page", module)
  .add("Default", () => (
    <LoadData>
      {page => (
        <MemoryRouter>
          <BcscRedirect page={page} />
        </MemoryRouter>
      )}
    </LoadData>
  ))
  .addParameters({ viewport: { defaultViewport: "mobile2" } })
  .add("Mobile", () => (
    <LoadData>
      {page => (
        <MemoryRouter>
          <BcscRedirect page={page} />
        </MemoryRouter>
      )}
    </LoadData>
  ));
