import React from "react";
import { MemoryRouter } from "react-router-dom";

import OrgValidation from "./OrgValidation";

export default {
  title: "OrgValidation",
  component: OrgValidation
};

const header = {
  name: "Criminal Record Check"
};

const setOrg = () => {};

const page = {
  setOrg,
  header
};

export const Default = () => (
  <MemoryRouter>
    <OrgValidation page={page} />
  </MemoryRouter>
);

export const Mobile = () => (
  <MemoryRouter>
    <OrgValidation page={page} />
  </MemoryRouter>
);

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
