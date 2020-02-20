/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Declaration from "./Declaration";

storiesOf("Declaration", module).add("Default", () => (
  <Declaration onApplicantNameChange={action("Applicant Name changed")} />
));
