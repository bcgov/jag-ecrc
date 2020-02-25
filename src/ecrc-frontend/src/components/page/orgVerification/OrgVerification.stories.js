import React from "react";
import { MemoryRouter } from "react-router-dom";

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

export const Default = () => (
  <MemoryRouter>
    <OrgVerification page={page} />
  </MemoryRouter>
);

export const Mobile = () => (
  <MemoryRouter>
    <OrgVerification page={page} />
  </MemoryRouter>
);

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
