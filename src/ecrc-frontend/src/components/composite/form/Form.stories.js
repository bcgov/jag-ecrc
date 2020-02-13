/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { storiesOf } from "@storybook/react";
import { Form } from "./Form";
import { action } from "@storybook/addon-actions";

const textInputs = [
  {
    label: "label1",
    id: "textInput1"
  },
  {
    label: "label2",
    id: "textInput2"
  },
  {
    label: "label3",
    id: "textInput3"
  }
];

const buttons = [
  {
    label: "button1",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit",
    onClick: action("onButtonClicked")
  },
  {
    label: "button2",
    buttonStyle: "btn btn-warning",
    buttonSize: "btn btn-lg",
    type: "button",
    onClick: action("onButtonClicked")
  }
];

storiesOf("Form", module).add("Default", () => (
  <Form textInputs={textInputs} buttons={buttons} />
));
