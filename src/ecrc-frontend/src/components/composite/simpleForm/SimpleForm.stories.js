/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { SimpleForm } from "./SimpleForm";

const textInputs = [
  {
    label: "label1",
    id: "textInput1",
    onChange: action("onInputText1_Changed")
  },
  {
    label: "label2",
    id: "textInput2",
    value: "initValue",
    textInputStyle: "textinput_non_editable_gray",
    onChange: action("onInputText2_Changed")
  },
  {
    label: "label3",
    id: "textInput3",
    textInputStyle: "textinput_editable_gray",
    isRequired: true
  }
];

const buttons = [
  {
    label: "button1",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "reset",
    onClick: action("onButton1Clicked")
  },
  {
    label: "button2",
    buttonStyle: "btn btn-warning",
    buttonSize: "btn btn-lg",
    type: "button",
    onClick: action("onButton2Clicked")
  },
  {
    label: "button3",
    buttonStyle: "btn btn-danger",
    buttonSize: "btn btn-sm",
    type: "button",
    onClick: action("onButton3Clicked")
  }
];

const simpleForm = {
  title: "simple form title",
  textInputs,
  buttons
};

storiesOf("SimpleForm", module)
  .add("3texts_3buttons", () => (
    <SimpleForm simpleForm={{ ...simpleForm, title: null }} />
  ))
  .add("Title_3texts_3buttons", () => <SimpleForm simpleForm={simpleForm} />);
