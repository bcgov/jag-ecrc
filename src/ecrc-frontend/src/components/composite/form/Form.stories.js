/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { storiesOf } from "@storybook/react";
import { Form } from "./Form";

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

storiesOf("Form", module).add("Default", () => (
  <Form textInputs={textInputs} />
));
