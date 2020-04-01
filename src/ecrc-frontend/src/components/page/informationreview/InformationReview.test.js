import React from "react";
import { create, act } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getByRole,
  getByText,
  wait,
  act as actor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import InformationReview from "./InformationReview";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

describe("InformationReview Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const applicant = {
    legalFirstNm: "Robert",
    legalSecondNm: "Norman",
    legalSurnameNm: "Ross",
    birthPlace: "Daytona Beach, Florida",
    alias1FirstNm: "Robert",
    alias1SecondNm: "Norman",
    alias1SurnameNm: "Ross",
    alias2FirstNm: "Robert",
    alias2SecondNm: "Norman",
    alias2SurnameNm: "Ross",
    alias3FirstNm: "Robert",
    alias3SecondNm: "Norman",
    alias3SurnameNm: "Ross",
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
    organizationFacility: "Something"
  };

  const org = {
    orgNm: "Some org"
  };

  const setError = jest.fn();
  const setShare = jest.fn();
  window.scrollTo = jest.fn();

  const page = {
    header,
    applicant,
    org,
    setError,
    setShare
  };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["appForm"],
      authorities: ["Authorized"]
    });

    const mock = new MockAdapter(axios);
    const API_REQUEST_SHARE = "/ecrc/private/checkShare?requestGuid=unique123";

    mock.onGet(API_REQUEST_SHARE).reply(200, {
      oldOrg: "Old org name",
      oldCRCExpiration: "2021-10-12"
    });
  });

  test("Matches the snapshot", async () => {
    let infoReview;

    await act(async () => {
      infoReview = create(
        <MemoryRouter>
          <InformationReview page={page} />
        </MemoryRouter>
      );
    });

    await wait(() => {});

    expect(infoReview.toJSON()).toMatchSnapshot();
  });

  test("Validate checkbox", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    await wait(() => {});

    expect(getByText(container, "Submit").disabled).toBeTruthy();

    fireEvent.click(getByRole(container, "checkbox"));

    expect(getByText(container, "Submit").disabled).toBeFalsy();
  });

  test("Validate share button", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    await wait(() => {});

    expect(getByText(container, "Share").disabled).toBeTruthy();

    fireEvent.click(getByRole(container, "checkbox"));

    expect(getByText(container, "Share").disabled).toBeFalsy();
  });

  test("Validate Back button", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    await wait(() => {});

    fireEvent.click(getByText(container, "Edit Application"));

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/applicationform"
    );
  });
});
