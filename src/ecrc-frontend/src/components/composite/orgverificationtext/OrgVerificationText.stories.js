import React from "react";

import OrgVerificationText from "./OrgVerificationText";

export default {
  title: "OrgVerificationText",
  component: OrgVerificationText
};

const org = {
  orgNm: "Test Org Name",
  addressLine1: "123 Somewhere Lane",
  cityNm: "Nowhere",
  provinceNm: "British Columbia",
  countryNm: "Canada",
  orgApplicantRelationship: "Employee"
};

export const Default = () => <OrgVerificationText org={org} />;
