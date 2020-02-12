import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { TextInput } from "./TextInput";

const textInput = {
  label: "button label",
  id: "textInputId",
  textInputStyle: "placeHolder"
};

const actionData = {
  onChange: action("onChange")
};

storiesOf("TextInput", module)
  .add("Default", () => <TextInput textInput={textInput} />)
  .add("non-editable-gray", () => (
    <TextInput
      textInput={{
        ...textInput,
        textInputStyle: "textinput_non_editable_gray",
        value: "initial value"
      }}
      {...actionData}
    />
  ))
  .add("editable-white-required", () => (
    <TextInput
      textInput={{
        ...textInput,
        textInputStyle: "textinput_editable_white",
        value: "initial value",
        isRequired: true
      }}
      {...actionData}
    />
  ))
  .add("editable-gray-required", () => (
    <TextInput
      textInput={{
        ...textInput,
        textInputStyle: "textinput_editable_gray",
        value: "initial value",
        isRequired: true
      }}
      {...actionData}
    />
  ));
