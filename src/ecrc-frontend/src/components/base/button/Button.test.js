import React from "react";
import { create } from "react-test-renderer";
import { Button } from "./Button";
/* eslint-disable react/jsx-props-no-spreading */
describe("Button Component", () => {
  test("Matches the snapshot", () => {
    const buttonTest = {
      label: "test",
      buttonStyle: "btn-warning",
      buttonSize: "btn-sm",
      type: "button"
    };

    const actionData = {
      onClick: () => jest.fn()
    };

    const button = create(
      <Button button={{ ...buttonTest }} {...actionData} />
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
