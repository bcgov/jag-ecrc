import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getByRole,
  getByText,
  wait
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import axios from "axios";

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
    jobTitle: "Painter",
    organizationFacility: "Something"
  };

  const org = {
    orgApplicantRelationship: "EMPLOYEE",
    orgTicketNumber: "crce",
    defaultScheduleTypeCd: "WBSD",
    defaultCrcScopeLevelCd: "WWCH"
  };

  const setApplicationInfo = jest.fn();
  const saveApplicant = jest.fn();
  const saveOrg = jest.fn();
  const saveApplicationInfo = jest.fn();

  window.scrollTo = jest.fn();

  // Mock window location
  const mockWindow = jest.fn();
  delete window.location;
  window.location = { assign: mockWindow };

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
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
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
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    expect(getByText(container, "SUBMIT").disabled).toBeTruthy();

    fireEvent.click(getByRole(container, "checkbox"));

    expect(getByText(container, "SUBMIT").disabled).toBeFalsy();
  });

  test("Validate Back button", () => {
    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );
    fireEvent.click(getByText(container, "EDIT APPLICATION"));
    expect(history.location.pathname).toEqual("/ecrc/applicationform");
  });

  test("Validate Employee relationship flow", async () => {
    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };
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
        <InformationReview page={page} />
      </Router>
    );
    fireEvent.click(getByRole(container, "checkbox"));
    fireEvent.click(getByText(container, "SUBMIT"));

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

    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };

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
        <InformationReview page={page} />
      </Router>
    );
    fireEvent.click(getByRole(container, "checkbox"));
    fireEvent.click(getByText(container, "SUBMIT"));

    await wait(() => {
      expect(setApplicationInfo).toHaveBeenCalled();
      expect(history.location.pathname).toEqual("/ecrc/success");
    });
  });
});
