import React from "react";
import { action } from "@storybook/addon-actions";

import OrgValidationText from "./OrgValidationText";

export default {
  title: "OrgValidationText",
  component: OrgValidationText
};

const onClick = action("onButtonClicked");
const onChange = action("onChange");

const textInput = {
  label: "Access code",
  id: "orgId",
  textInputStyle: "placeHolder",
  isRequired: true
};

const button = {
  label: "Validate",
  buttonStyle: "btn btn-primary",
  buttonSize: "btn btn-sm",
  type: "submit"
};

export const Default = () => (
  <OrgValidationText
    textInput={textInput}
    button={button}
    onChange={onChange}
    onClick={onClick}
  />
);
