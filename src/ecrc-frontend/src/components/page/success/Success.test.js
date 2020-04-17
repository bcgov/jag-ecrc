/* eslint-disable prefer-promise-reject-errors */
import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { render, fireEvent, getByText, wait } from "@testing-library/react";

import Success from "./Success";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

jest.mock("axios");

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
    listen: jest.fn()
  })
}));

describe("Success Page Component", () => {
  window.scrollTo = jest.fn();

  // Mock browser print
  window.print = jest.fn();
  window.open = jest.fn();

  // Mock window location
  const mockWindow = jest.fn();
  delete window.location;
  window.location = { assign: mockWindow };

  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: {
        invoiceId: "123"
      }
    })
  );

  axios.post.mockImplementation(() =>
    Promise.resolve({
      data: {
        urlResponse: "http://sample.com"
      }
    })
  );

  const header = {
    name: "Criminal Record Check"
  };

  const applicant = {
    legalFirstNm: "Robert",
    legalSurnameNm: "Ross"
  };

  const org = {
    orgApplicantRelationship: "EMPLOYEE",
    orgTicketNumber: "pbs",
    orgNm: "Public Broadcast Network"
  };

  const applicationInfo = {
    partyId: 123,
    sessionId: 456,
    invoiceId: 789,
    serviceFeeAmount: 60,
    serviceId: 987
  };

  const saveApplicationInfo = jest.fn();
  const setError = jest.fn();

  const page = {
    header,
    applicant,
    org,
    applicationInfo,
    saveApplicationInfo,
    setError
  };

  const successUrl =
    "/success?trnApproved=1&trnId=10001213&messageId=1&messageText=Approved&authCode=TEST&responseType=T&trnAmount=28.00&trnDate=3%2F4%2F2020+1%3A01%3A36+PM&trnOrderNumber=2991&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=U&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+information+is+unavailable%2E&cvdId=1&cardType=VI&trnType=P&paymentMethod=CC&ref1=Service+Id%3A+22522&ref2=CRRP+%2D+Org+Party+Id%3A+49119&ref3=&ref4=&ref5=";
  const failureUrl =
    "/success?trnApproved=0&trnId=&messageId=804&messageText=Declined+%2D+Entered+Information+Cannot+Be+Authenticated&authCode=&responseType=T&trnAmount=&trnDate=3%2F2%2F2020+8%3A43%3A52+AM&trnOrderNumber=2946&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=0&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+Verification+not+performed+for+this+transaction%2E&cardType=&trnType=&paymentMethod=&ref1=Service+Id%3A+22478&ref2=CRRP+%2D+Org+Party+Id%3A+49074&ref3=&ref4=&ref5=";

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["consent"],
      authorities: ["Authorized"]
    });
  });

  test("Matches the Volunteer snapshot", () => {
    const successVolunteer = create(
      <MemoryRouter initialEntries={["/success"]}>
        <Success
          page={{
            ...page,
            org: { ...org, orgApplicantRelationship: "VOLUNTEER" }
          }}
        />
      </MemoryRouter>
    );
    expect(successVolunteer.toJSON()).toMatchSnapshot();
  });

  test("Matches the SuccessfulPayment snapshot", () => {
    const successPayment = create(
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );
    expect(successPayment.toJSON()).toMatchSnapshot();
  });

  test("Matches the FailedPayment snapshot", () => {
    const failedPayment = create(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );
    expect(failedPayment.toJSON()).toMatchSnapshot();
  });

  test("Validate Retry payment", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Try Again"));

    await wait(() => {
      expect(saveApplicationInfo).toHaveBeenCalled();
    });
  });

  test("Validate Print (on click)", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Print"));
    expect(window.print).toHaveBeenCalled();
  });

  test("Validate Print (on keydown)", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    fireEvent.keyDown(getByText(container, "Print"));
    expect(window.print).toHaveBeenCalled();
  });

  test("Validate Email", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Email"));
    expect(window.open).toHaveBeenCalled();
  });

  test("Redirects to error page when not authorized on page load", async () => {
    sessionStorage.clear();

    render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    await wait(() => {
      expect(setError).toHaveBeenCalledTimes(1);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });

  test("Error case for getNextInvoiceId failing without response data and message", async () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400
        }
      })
    );

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          urlResponse: "http://sample.com"
        }
      })
    );

    const { container } = render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Try Again"));

    await wait(() => {
      expect(setError).toHaveBeenCalledTimes(2);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
    expect(mockHistoryPush).toHaveBeenCalledTimes(2);
  });

  test("Error case for getNextInvoiceId failing with response data and message", async () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            message: "This is bad request error"
          }
        }
      })
    );

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          urlResponse: "http://sample.com"
        }
      })
    );

    const { container } = render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Try Again"));

    await wait(() => {
      expect(setError).toHaveBeenCalledTimes(3);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
    expect(mockHistoryPush).toHaveBeenCalledTimes(3);
  });

  test("Failing logPaymentFailure causes handle error to be called", async () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            message: "This is bad request error"
          }
        }
      })
    );

    render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    await wait(() => {
      expect(setError).toHaveBeenCalledTimes(4);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
    expect(mockHistoryPush).toHaveBeenCalledTimes(4);
  });

  test("Failing updateServiceFinancialTxn causes handle error to be called", async () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            message: "This is bad request error"
          }
        }
      })
    );

    render(
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    await wait(() => {
      expect(setError).toHaveBeenCalledTimes(5);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
    expect(mockHistoryPush).toHaveBeenCalledTimes(5);
  });

  test("Redirects to host home on cancel click when confirm is selected as Yes", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    window.confirm = () => true;

    fireEvent.click(getByText(container, "Cancel and Exit"));

    expect(sessionStorage.getItem("jwt")).toBeFalsy();
    expect(mockHistoryPush).toHaveBeenCalledWith("/hosthome");
    expect(mockHistoryPush).toHaveBeenCalledTimes(6);
  });

  test("Does not redirect to host home on cancel click when confirm is selected as No", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={page} />
      </MemoryRouter>
    );

    window.confirm = () => false;

    fireEvent.click(getByText(container, "Cancel and Exit"));

    expect(sessionStorage.getItem("jwt")).toBeTruthy();
  });
});
