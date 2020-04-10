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

  const onChange = jest.fn();

  test("Matches the snapshot", () => {
    const textInputBox = create(
      <TextInput textInput={{ ...textInput }} onChange={onChange} />
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
        onChange={onChange}
      />
    );
    expect(textInputBox.find("div input").prop("readOnly")).toBe(true);
  });

  test("Renders the textInput when options provided", () => {
    const textInputBox = shallow(
      <TextInput
        textInput={{
          ...textInput,
          options: [{ name: "name1" }, { name: "name2" }]
        }}
        onChange={onChange}
      />
    );

    const event = { target: { value: "val" } };
    textInputBox.find("select").simulate("change", event);

    expect(onChange).toHaveBeenCalled();
  });

  test("Renders the textInput correctly when isRequired is set", () => {
    const textInputBox = shallow(
      <TextInput
        textInput={{
          ...textInput,
          isRequired: true
        }}
        onChange={onChange}
      />
    );
    expect(textInputBox.exists("#asterisk")).toEqual(true);
  });
});
