import React from "react";
import { create } from "react-test-renderer";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

export const buttonTest = {
  children: "test",
  type: "reset",
  onClick: action("onButtonClicked"),
  buttonStyle: "btn--primary--solid",
  buttonSize: "btn--medium"
};

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button button={buttonTest} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
