import React from "react";
import { create } from "react-test-renderer";
import { TextInput } from "./TextInput";

describe("TextInput Component", () => {
  test("Matches the snapshot", () => {
    const textInput = {
      label: "button label",
      id: "textInputId",
      value: "init value",
      isRequired: true
    };

    const textInputBox = create(<TextInput textInput={textInput} />);
    expect(textInputBox.toJSON()).toMatchSnapshot();
  });
});
