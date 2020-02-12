/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Button } from "./Button";

const button = {
  label: "button label",
  buttonStyle: "btn btn-primary",
  buttonSize: "btn btn-sm",
  type: "submit"
};

const actionData = {
  onClick: action("onButtonClicked")
};

storiesOf("Button", module)
  .add("Default", () => <Button button={button} actionData />)
  .add("Warning", () => (
    <Button
      button={{
        ...button,
        buttonStyle: "btn btn-warning",
        buttonSize: "btn btn-sm"
      }}
      {...actionData}
    />
  ));
