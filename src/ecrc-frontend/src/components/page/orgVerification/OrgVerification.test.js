import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getByText,
  findByText
} from "@testing-library/react";
import { createMemoryHistory } from "history";

import OrgVerification from "./OrgVerification";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

describe("OrgVerification Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const org = {
    orgNm: "Test Org Name",
    addressLine1: "123 Somewhere Lane",
    cityNm: "Nowhere",
    provinceNm: "British Columbia",
    countryNm: "Canada",
    contactPhoneNo: "250 123 4567",
    orgApplicantRelationship: "Employee"
  };

  const setError = jest.fn();

  const page = {
    header,
    org,
    setError
  };

  // Mock window function
  window.scrollTo = jest.fn();

  sessionStorage.setItem("validator", "secret");
  sessionStorage.setItem("uuid", "unique123");
  generateJWTToken({ key: "val" });

  test("Matches the snapshot", () => {
    const orgVerificationPage = create(
      <MemoryRouter>
        <OrgVerification page={page} />
      </MemoryRouter>
    );
    expect(orgVerificationPage.toJSON()).toMatchSnapshot();
  });

  test("It updates the works with field as required when scope level code is WWCA", async () => {
    const newOrg = {
      ...org,
      defaultCrcScopeLevelCd: "WWCA"
    };

    const newPage = {
      ...page,
      org: newOrg
    };

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <OrgVerification page={newPage} />
      </Router>
    );

    await expect(() => {
      getByText(container, "wrongtext");
    }).toThrow();

    expect(getByText(container, "Children & Vulnerable Adults")).toBeTruthy();
  });

  test("It updates the works with field as required when scope level code is WWAD", async () => {
    const newOrg = {
      ...org,
      defaultCrcScopeLevelCd: "WWAD"
    };

    const newPage = {
      ...page,
      org: newOrg
    };

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <OrgVerification page={newPage} />
      </Router>
    );

    await expect(() => {
      getByText(container, "wrongtext");
    }).toThrow();

    expect(getByText(container, "Vulnerable Adults")).toBeTruthy();
  });

  test("It updates the works with field as required when scope level code is WWCH", async () => {
    const newOrg = {
      ...org,
      defaultCrcScopeLevelCd: "WWCH"
    };

    const newPage = {
      ...page,
      org: newOrg
    };

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <OrgVerification page={newPage} />
      </Router>
    );

    await expect(() => {
      getByText(container, "wrongtext");
    }).toThrow();

    expect(getByText(container, "Children")).toBeTruthy();
  });

  test("Redirect to Home", () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgVerification page={page} />
      </Router>
    );
    fireEvent.click(getByText(container, "Cancel"));
    expect(history.location.pathname).toEqual("/");
  });

  test("Redirect to terms of use", () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgVerification page={page} />
      </Router>
    );
    fireEvent.click(getByText(container, "Continue"));
    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/termsofuse"
    );
  });

  test("Redirect to Error on empty organization", () => {
    page.org.orgNm = "";
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <OrgVerification page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Redirects to error page when unauthenticated", () => {
    sessionStorage.removeItem("jwt");

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <OrgVerification page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });
});
