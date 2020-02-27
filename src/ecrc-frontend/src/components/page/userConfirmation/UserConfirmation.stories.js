import React from "react";

import UserConfirmation from "./UserConfirmation";

export default {
  title: "User Confirmation Page",
  component: UserConfirmation
};

const header = {
  name: "header name"
};

export const Default = () => <UserConfirmation header={header} />;

export const Mobile = () => <UserConfirmation header={header} />;

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
