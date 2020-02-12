import React from "react";
import { create } from "react-test-renderer";
import { TextInput } from "./TextInput";
import { shallow } from "enzyme";

describe("TextInput Component", () => {
  const textInput = {
    label: "button label",
    id: "textInputId",
    value: "init value"
  };

  test("Matches the snapshot", () => {
    const textInputBox = create(<TextInput textInput={textInput} />);
    expect(textInputBox.toJSON()).toMatchSnapshot();
  });

  test("Renders the textInput when the style is not editable", () => {
    const textInputBox = shallow(
      <TextInput
        textInput={{
          ...textInput,
          textInputStyle: "textinput_non_editable_gray"
        }}
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
      />
    );
    expect(textInputBox.exists("#redStar")).toEqual(true);
  });
});
