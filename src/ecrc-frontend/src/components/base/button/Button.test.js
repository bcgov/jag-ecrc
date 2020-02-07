import React from "react";
import Button from "./Button";
import { create } from "react-test-renderer";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
