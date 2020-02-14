import React from "react";
import { create } from "react-test-renderer";

import OrgVerificationText from "./OrgVerificationText";

describe("OrgVerificationText Component", () => {
  test("Matches the snapshot", () => {
    const org = {
      orgNm: "Test Org Name",
      addressLine1: "123 Somewhere Lane",
      cityNm: "Nowhere",
      provinceNm: "British Columbia",
      countryNm: "Canada",
      orgApplicantRelationship: "Employee"
    };

    const testOrgVerificationText = create(<OrgVerificationText org={org} />);
    expect(testOrgVerificationText.toJSON()).toMatchSnapshot();
  });
});
