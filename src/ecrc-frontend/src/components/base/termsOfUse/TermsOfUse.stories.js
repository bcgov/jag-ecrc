import React from "react";
import { action } from "@storybook/addon-actions";

import TermsOfUse from "./TermsOfUse";

export default {
  title: "Terms of Use",
  component: TermsOfUse
};

export const Default = () => (
  <TermsOfUse onClick={action("Terms of Use button clicked")} />
);
