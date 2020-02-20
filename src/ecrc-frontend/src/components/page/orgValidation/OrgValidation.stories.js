import React from "react";

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

export const Default = () => <OrgValidation page={page} />;

export const Mobile = () => <OrgValidation page={page} />;

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
