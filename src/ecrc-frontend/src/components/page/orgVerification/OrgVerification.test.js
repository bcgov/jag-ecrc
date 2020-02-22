import React from "react";
import { create } from "react-test-renderer";

import OrgVerification from "./OrgVerification";
import { MemoryRouter } from "react-router-dom";

describe("OrgVerification Component", () => {
  test("Matches the snapshot", () => {
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

    const setOrg = () => {};

    const page = {
      org,
      setOrg,
      header
    };

    const orgValidationPage = create(
      <MemoryRouter>
        <OrgVerification page={page} org={org} />
      </MemoryRouter>
    );
    expect(orgValidationPage.toJSON()).toMatchSnapshot();
  });
});
