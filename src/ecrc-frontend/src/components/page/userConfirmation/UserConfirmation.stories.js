import React from "react";

import UserConfirmation from "./UserConfirmation";

export default {
  title: "User Confirmation Page",
  component: UserConfirmation
};

const header = {
  name: "header name"
};

const setApplicant = () => {};

const page = {
  header,
  setApplicant
};

export const Default = () => <UserConfirmation page={page} />;

export const Mobile = () => <UserConfirmation page={page} />;

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
