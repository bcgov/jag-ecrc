import React from "react";
import { create } from "react-test-renderer";
import { Button } from "./Button";

describe("Button Component", () => {
  test("Matches the snapshot", () => {
    const buttonTest = {
      children: "test",
      onClick: () => jest.fn(),
      buttonStyle: "btn-warning",
      buttonSize: "btn-sm"
    };

    const button = create(<Button button={buttonTest} />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
