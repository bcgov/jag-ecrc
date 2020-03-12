import React from "react";
import { action } from "@storybook/addon-actions";

import TermsOfUse from "./TermsOfUse";

export default {
  title: "Terms of Use",
  component: TermsOfUse
};

const checkFirstBox = () => {};
const checkSecondBox = () => {};
const termOfUseOnScroll = () => {};
const continueBtnEnabled = false;

export const Default = () => (
  <TermsOfUse
    onContinueClick={action("Terms of Use button clicked")}
    checkFirstBox={checkFirstBox}
    checkSecondBox={checkSecondBox}
    termOfUseOnScroll={termOfUseOnScroll}
    continueBtnEnabled={continueBtnEnabled}
  />
);
