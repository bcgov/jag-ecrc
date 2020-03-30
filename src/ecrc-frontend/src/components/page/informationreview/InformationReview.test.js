import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getByRole,
  getByText
} from "@testing-library/react";
import { createMemoryHistory } from "history";

import InformationReview from "./InformationReview";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

// Mock axios
jest.mock("axios");

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

  const setError = jest.fn();
  window.scrollTo = jest.fn();

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["appForm"],
      authorities: ["Authorized"]
    });
  });

  test("Matches the snapshot", () => {
    const page = {
      header,
      applicant,
      setError
    };
    const infoReview = create(
      <MemoryRouter>
        <InformationReview page={page} />
      </MemoryRouter>
    );
    expect(infoReview.toJSON()).toMatchSnapshot();
  });

  test("Validate checkbox", () => {
    const page = {
      header,
      applicant,
      setError
    };
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    expect(getByText(container, "Submit").disabled).toBeTruthy();

    fireEvent.click(getByRole(container, "checkbox"));

    expect(getByText(container, "Submit").disabled).toBeFalsy();
  });

  test("Validate Back button", () => {
    const page = {
      header,
      applicant,
      setError
    };
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );
    fireEvent.click(getByText(container, "Edit Application"));
    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/applicationform"
    );
  });
});
