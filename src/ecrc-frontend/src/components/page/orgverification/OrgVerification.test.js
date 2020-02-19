import React from "react";
import { create } from "react-test-renderer";

import OrgVerification from "./OrgVerification";

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
      orgApplicantRelationship: "Employee"
    };

    const setOrg = () => {};

    const page = {
      org,
      setOrg,
      header
    };

    const orgValidationPage = create(<OrgVerification page={page} org={org} />);
    expect(orgValidationPage.toJSON()).toMatchSnapshot();
  });
});
