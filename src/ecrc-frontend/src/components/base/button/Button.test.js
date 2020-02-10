import React from "react";
import { create } from "react-test-renderer";
import { action } from "@storybook/addon-actions";

import { Button } from "./Button";

describe("Button Component", () => {
  test("Matches the snapshot", () => {
    const buttonTest = {
      children: "test",
      type: "reset",
      onClick: action("onButtonClicked"),
      buttonStyle: "btn--primary--solid",
      buttonSize: "btn--medium"
    };
    const button = create(<Button button={buttonTest} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
