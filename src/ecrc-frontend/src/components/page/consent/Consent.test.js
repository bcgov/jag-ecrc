import React from "react";
import axios from "axios";
import { create } from "react-test-renderer";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getAllByRole,
  getByText,
  wait
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

import Consent from "./Consent";

jest.mock("axios");

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
    alias1FirstNm: "Alias1firstnm",
    alias1SecondNm: "Alias1secondnm",
    alias1SurnameNm: "Alias1surnamenm",
    alias2FirstNm: "Alias2firstnm",
    alias2SecondNm: "Alias2secondnm",
    alias2SurnameNm: "Alias2surnamenm",
    alias3FirstNm: "Alias3firstnm",
    alias3SecondNm: "Alias3secondnm",
    alias3SurnameNm: "Alias3surnamenm",
    birthPlace: "Daytona Beach, Florida",
    birthDt: "1942-10-29",
    genderTxt: "Male",
    driversLicNo: "1234567",
    phoneNumber: "2501234567",
    countryNm: "Canada",
    mailingAddressLine1: "456 Elsewhere",
    mailingCity: "There",
    mailingProvince: "Ontario",
    mailingPostalCode: "V1V 1A1",
    jobTitle: "Painter"
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

  // Mock window location
  const mockWindow = jest.fn();
  delete window.location;
  window.location = { assign: mockWindow };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["infoReview"],
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

  test("Validate Employee relationship flow", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          sessionId: "123",
          invoiceId: "123",
          serviceFeeAmount: "123"
        }
      })
    );

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          partyId: "123",
          serviceId: "123",
          urlResponse: "http://sample.com"
        }
      })
    );

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    const checkbox = getAllByRole(container, "checkbox");

    fireEvent.click(checkbox[0]);
    fireEvent.click(checkbox[1]);
    fireEvent.click(checkbox[2]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
      expect(saveApplicant).toHaveBeenCalled();
      expect(saveOrg).toHaveBeenCalled();
      expect(saveApplicationInfo).toHaveBeenCalled();
    });
  });

  test("Validate Volunteer relationship flow", async () => {
    applicant.driversLicNo = "";
    applicant.alias1FirstNm = "";
    applicant.alias1SecondNm = "";
    applicant.alias1SurnameNm = "";
    applicant.alias2FirstNm = "";
    applicant.alias2SecondNm = "";
    applicant.alias2SurnameNm = "";
    applicant.alias3FirstNm = "";
    applicant.alias3SecondNm = "";
    applicant.alias3SurnameNm = "";

    applicant.organizationFacility = "";

    org.orgApplicantRelationship = "VOLUNTEER";

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          sessionId: "123",
          invoiceId: "123",
          serviceFeeAmount: "123"
        }
      })
    );

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          partyId: "123",
          serviceId: "123",
          urlResponse: "http://sample.com"
        }
      })
    );

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    const checkbox = getAllByRole(container, "checkbox");

    fireEvent.click(checkbox[0]);
    fireEvent.click(checkbox[1]);
    fireEvent.click(checkbox[2]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/success");
  });
});
