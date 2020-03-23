import React from "react";
import { create } from "react-test-renderer";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getAllByRole,
  getByText
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

import Consent from "./Consent";

describe("Consent Page Component", () => {
  window.scrollTo = jest.fn();

  const header = {
    name: "Criminal Record Check"
  };

  const setApplicationInfo = jest.fn();
  const saveApplicant = jest.fn();
  const saveOrg = jest.fn();
  const saveApplicationInfo = jest.fn();
  const setError = jest.fn();

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
    orgApplicantRelationship: "EMPLOYEE",
    orgTicketNumber: "crce",
    defaultScheduleTypeCd: "WBSD",
    defaultCrcScopeLevelCd: "WWCH"
  };

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

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["userConfirmation"],
      authorities: ["Authorized"]
    });
  });

  test("Matches the snapshot", () => {
    const consent = create(<Consent page={page} />);
    expect(consent.toJSON()).toMatchSnapshot();
  });

  test("Validate Cancel Redirect", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    fireEvent.click(getByText(container, "Cancel and Exit"));
    expect(history.location.pathname).toEqual("/hosthome");
  });

  test("Validate Continue Redirect", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    expect(getByText(container, "Continue").disabled).toBeTruthy();

    const checkbox = getAllByRole(container, "checkbox");

    fireEvent.click(checkbox[0]);
    fireEvent.click(checkbox[1]);
    fireEvent.click(checkbox[2]);

    expect(getByText(container, "Continue").disabled).toBeFalsy();

    fireEvent.click(getByText(container, "Continue"));
    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/applicationform"
    );
  });

  test("Validate Redirect to Home when unauthorized", () => {
    const history = createMemoryHistory();

    generateJWTToken({
      actionsPerformed: ["none"],
      authorities: ["Authorized"]
    });

    render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/");
  });
});
