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
  orgApplicantRelationship: "Employee",
  defaultCrcScopeLevelCd: "WWCA"
};

const setOrg = () => {};
const setError = () => {};

const page = {
  org,
  setOrg,
  header,
  setError
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

export const WorksWithAdultsAndChildren = () => (
  <MemoryRouter>
    <OrgVerification page={page} />
  </MemoryRouter>
);

export const WorksWithVulnerableAdults = () => (
  <MemoryRouter>
    <OrgVerification
      page={{ ...page, org: { ...org, defaultCrcScopeLevelCd: "WWAD" } }}
    />
  </MemoryRouter>
);

export const WorksWithChildren = () => (
  <MemoryRouter>
    <OrgVerification
      page={{ ...page, org: { ...org, defaultCrcScopeLevelCd: "WWCH" } }}
    />
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
