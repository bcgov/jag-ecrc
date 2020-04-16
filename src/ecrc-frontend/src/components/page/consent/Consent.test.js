/* eslint-disable prefer-promise-reject-errors */
import React from "react";
import axios from "axios";
import { create } from "react-test-renderer";
import { Router, MemoryRouter } from "react-router-dom";
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

  const applicationInfo = {};

  const setApplicationInfo = jest.fn();
  const saveApplicant = jest.fn();
  const saveOrg = jest.fn();
  const saveApplicationInfo = jest.fn();
  const setError = jest.fn();
  const share = false;

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
    mailingLine1: "432 address",
    mailingCityNm: "Toronto",
    mailingProvinceNm: "ON",
    mailingCity: "There",
    mailingProvince: "Ontario",
    mailingPostalCode: "V1V 1A1",
    mailingPostalCodeTxt: "V9V9V9",
    jobTitle: "Painter",
    organizationFacility: "PBS",
    emailAddress: "bob.ross@example.com",
    emailType: "Home"
  };

  const org = {
    orgNm: "Public Broadcast Network",
    orgApplicantRelationship: "EMPLOYEE",
    orgTicketNumber: "crce",
    defaultScheduleTypeCd: "WBSD",
    defaultCrcScopeLevelCd: "WWCH"
  };

  const page = {
    header,
    applicant,
    org,
    applicationInfo,
    setApplicationInfo,
    saveApplicant,
    saveOrg,
    saveApplicationInfo,
    setError,
    share
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
    const consent = create(
      <MemoryRouter>
        <Consent page={page} />
      </MemoryRouter>
    );
    expect(consent.toJSON()).toMatchSnapshot();
  });

  test("Validate Cancel Redirect with confirm box selected as Yes", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    window.confirm = () => true;
    fireEvent.click(getByText(container, "Cancel and Exit"));
    expect(history.location.pathname).toEqual("/hosthome");
    expect(sessionStorage.getItem("jwt")).toBeFalsy();
  });

  test("Validate Cancel Redirect with confirm box selected as No", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    window.confirm = () => false;
    fireEvent.click(getByText(container, "Cancel and Exit"));
    expect(history.location.pathname).not.toEqual("/hosthome");
    expect(sessionStorage.getItem("jwt")).toBeTruthy();
  });

  test("Validate Redirect to Error when unauthorized", () => {
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

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate Redirect to Error when expired", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          paymentUrl: "http://sample.com",
          serviceId: "123",
          partyId: "123",
          sessionId: "123",
          invoiceId: "123",
          serviceFeeAmount: "123"
        }
      })
    );

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    sessionStorage.setItem(
      "jwt",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZSIsImF1dGhvcml0aWVzIjpbIkF1dGhvcml6ZWQiXSwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.2yplvMygyadMIIhyhLtHpsZzPqAqbreDrWVmBcIh0Gg"
    );

    const checkbox = getAllByRole(container, "checkbox");

    fireEvent.click(checkbox[0]);
    fireEvent.click(checkbox[1]);
    fireEvent.click(checkbox[2]);
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate Redirect to Error when failed axios call", async () => {
    axios.post.mockImplementation(() => Promise.reject(new Error("fail")));

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
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {});

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate error case when error has appropriate response, status, data and message", async () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: { status: 400, data: { message: "This is error" } }
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
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate Employee relationship flow", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          paymentUrl: "http://sample.com",
          serviceId: "123",
          partyId: "123",
          sessionId: "123",
          invoiceId: "123",
          serviceFeeAmount: "123"
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
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
      expect(saveApplicant).toHaveBeenCalled();
      expect(saveOrg).toHaveBeenCalled();
      expect(saveApplicationInfo).toHaveBeenCalled();
    });
  });

  test("Validate Employee relationship flow with Share", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          serviceId: "123",
          partyId: "123"
        }
      })
    );

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={{ ...page, share: true }} />
      </Router>
    );

    const checkbox = getAllByRole(container, "checkbox");

    fireEvent.click(checkbox[0]);
    fireEvent.click(checkbox[1]);
    fireEvent.click(checkbox[2]);
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/success");
  });

  test("Validate Onetime relationship flow", async () => {
    org.orgApplicantRelationship = "ONETIME";

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          serviceId: "123",
          partyId: "123",
          sessionId: "123"
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
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/success");
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

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          serviceId: "123",
          partyId: "123",
          sessionId: "123"
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
    fireEvent.click(checkbox[3]);
    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/success");
  });
});
