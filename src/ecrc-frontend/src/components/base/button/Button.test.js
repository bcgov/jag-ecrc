import React from "react";
import { create } from "react-test-renderer";
import { Button } from "./Button";

describe("Button Component", () => {
  test("Matches the snapshot", () => {
    const buttonTest = {
      label: "test",
      onClick: () => jest.fn(),
      buttonStyle: "btn-warning",
      buttonSize: "btn-sm",
      type: "button"
    };

    const button = create(<Button button={buttonTest} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
