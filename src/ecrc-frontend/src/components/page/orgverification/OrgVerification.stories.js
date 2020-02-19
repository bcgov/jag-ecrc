import React from "react";

import OrgVerification from "./OrgVerification";

export default {
  title: "OrgVerification",
  component: OrgVerification
};

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

export const Default = () => <OrgVerification page={page} />;

export const Mobile = () => <OrgVerification page={page} />;

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
