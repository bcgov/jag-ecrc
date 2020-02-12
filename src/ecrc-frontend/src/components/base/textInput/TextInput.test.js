/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { create } from "react-test-renderer";
import { shallow } from "enzyme";

import { TextInput } from "./TextInput";

describe("TextInput Component", () => {
  const textInput = {
    label: "button label",
    id: "textInputId",
    value: "init value"
  };

  const actionData = { onClick: () => jest.fn() };

  test("Matches the snapshot", () => {
    const textInputBox = create(
      <TextInput textInput={{ ...textInput }} {...actionData} />
    );
    expect(textInputBox.toJSON()).toMatchSnapshot();
  });

  test("Renders the textInput when the style is not editable", () => {
    const textInputBox = shallow(
      <TextInput
        textInput={{
          ...textInput,
          textInputStyle: "textinput_non_editable_gray"
        }}
        {...actionData}
      />
    );
    expect(textInputBox.find("div input").prop("readOnly")).toBe(true);
  });

  test("Renders the textInput correctly when isRequired is set", () => {
    const textInputBox = shallow(
      <TextInput
        textInput={{
          ...textInput,
          isRequired: true
        }}
        {...actionData}
      />
    );
    expect(textInputBox.exists("#asterisk")).toEqual(true);
  });
});
