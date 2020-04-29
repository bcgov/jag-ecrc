/* eslint-disable no-console */
import React from "react";
import { create, act } from "react-test-renderer";
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
    orgNm: "Some org",
    orgTicketNumber: "wsde",
    defaultCrcScopeLevelCd: "WWCH"
  };

  const setApplicationInfo = jest.fn();
  const setError = jest.fn();
  const setShare = jest.fn();
  window.scrollTo = jest.fn();

  const page = {
    header,
    applicant,
    org,
    setApplicationInfo,
    setError,
    setShare
  };

  const mock = new MockAdapter(axios);
  const API_REQUEST_SHARE = "/ecrc/private/checkApplicantForPrevCRC";

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["appForm"],
      authorities: ["Authorized"]
    });

    mock.onPost(API_REQUEST_SHARE).reply(400, {
      message: "This is an expected failure."
    });
  });

  test("Matches the snapshot for no share", async () => {
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

  // test("Matches the snapshot for share", async () => {
  //   mock.onPost(API_REQUEST_SHARE).reply(200, {
  //     serviceId: "1234"
  //   });

  //   let infoReview;

  //   await act(async () => {
  //     infoReview = create(
  //       <MemoryRouter>
  //         <InformationReview page={page} />
  //       </MemoryRouter>
  //     );
  //   });

  //   await wait(() => {});

  //   expect(infoReview.toJSON()).toMatchSnapshot();
  // });

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

  // test("Validate share button", async () => {
  //   mock.onPost(API_REQUEST_SHARE).reply(200, {
  //     serviceId: "1234"
  //   });

  //   const history = createMemoryHistory();
  //   const { container } = render(
  //     <Router history={history}>
  //       <InformationReview page={page} />
  //     </Router>
  //   );

  //   await wait(() => {
  //     expect(setApplicationInfo).toHaveBeenCalled();
  //   });

  //   expect(getByText(container, "Share Previous CRC").disabled).toBeTruthy();

  //   fireEvent.click(getByRole(container, "checkbox"));

  //   expect(getByText(container, "Share Previous CRC").disabled).toBeFalsy();

  //   fireEvent.click(getByText(container, "Share Previous CRC"));

  //   expect(setShare).toHaveBeenCalled();
  // });

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

  test("Clicking submit takes you to consent page when checkbox selected and session not expired", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    await wait(() => {});

    fireEvent.click(getByRole(container, "checkbox"));
    fireEvent.click(getByText(container, "Submit"));

    expect(history.location.pathname).toEqual("/criminalrecordcheck/consent");
  });

  // test("Clicking share takes you to consent page when checkbox selected and session not expired", async () => {
  //   mock.onPost(API_REQUEST_SHARE).reply(200, {
  //     serviceId: "1234"
  //   });

  //   const history = createMemoryHistory();
  //   const { container } = render(
  //     <Router history={history}>
  //       <InformationReview page={page} />
  //     </Router>
  //   );

  //   await wait(() => {
  //     expect(setApplicationInfo).toHaveBeenCalled();
  //   });

  //   fireEvent.click(getByRole(container, "checkbox"));
  //   fireEvent.click(getByText(container, "Share Previous CRC"));

  //   expect(history.location.pathname).toEqual("/criminalrecordcheck/consent");
  // });

  test("Clicking submit sets error when checkbox selected and session is expired", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    fireEvent.click(getByRole(container, "checkbox"));

    sessionStorage.removeItem("jwt");

    fireEvent.click(getByText(container, "Submit"));

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Sets error and redirects to error page when not authorized on landing on page", async () => {
    sessionStorage.removeItem("jwt");

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  // test("Sets error and redirects to error page when checkApplicantForPrevCRC fails with something other than 400 and data/message are present", async () => {
  //   mock.onPost(API_REQUEST_SHARE).reply(500, {
  //     message: "This is an expected failure."
  //   });

  //   const history = createMemoryHistory();
  //   render(
  //     <Router history={history}>
  //       <InformationReview page={page} />
  //     </Router>
  //   );

  //   await wait(() => {
  //     expect(setError).toHaveBeenCalled();
  //   });

  //   expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  // });

  test("Sets error and redirects to error page when checkApplicantForPrevCRC fails with something other than 400 and data/message are not present", async () => {
    mock.onPost(API_REQUEST_SHARE).reply(500);

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <InformationReview page={page} />
      </Router>
    );

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate drivers licence number conditional rendering", async () => {
    console.error = jest.fn();

    const newApplicant = {
      ...applicant,
      driversLicNo: null
    };

    const newPage = {
      ...page,
      applicant: newApplicant
    };

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <InformationReview page={newPage} />
      </Router>
    );

    await expect(() => {
      getByText(container, "BC Driver's Licence");
    }).toThrow();
  });
});
