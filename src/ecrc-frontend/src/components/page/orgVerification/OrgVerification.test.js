import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import { render, fireEvent, getByText } from "@testing-library/react";
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

  const page = {
    header,
    org
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
    expect(history.location.pathname).toEqual("/ecrc/termsofuse");
  });

  test("Redirect to Home on empty organization", () => {
    page.org.orgNm = "";
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <OrgVerification page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/");
  });
});
