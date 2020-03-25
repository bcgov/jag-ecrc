import React from "react";
import { action } from "@storybook/addon-actions";

import TermsOfUse from "./TermsOfUse";

export default {
  title: "Terms of Use",
  component: TermsOfUse
};

export const Default = () => (
  <TermsOfUse
    onContinueClick={action("on continue click")}
    checkFirstBox={action("check first box")}
    termOfUseOnScroll={action("terms of use scroll")}
    onClick={action("Terms of Use button clicked")}
    continueBtnEnabled={false}
    reachedEnd={false}
  />
);
