/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { create } from "react-test-renderer";

import { Form } from "./Form";

describe("Form Component", () => {
  const textInputs = [
    {
      label: "label1",
      id: "textInput1",
      onChange: () => jest.fn()
    },
    {
      label: "label3",
      id: "textInput3",
      textInputStyle: "textinput_editable_gray",
      isRequired: true
    }
  ];

  const buttons = [
    {
      label: "button2",
      buttonStyle: "btn btn-warning",
      buttonSize: "btn btn-lg",
      type: "button",
      onClick: () => jest.fn()
    },
    {
      label: "button3",
      buttonStyle: "btn btn-danger",
      buttonSize: "btn btn-sm",
      type: "button",
      onClick: () => jest.fn()
    }
  ];

  test("Matches the snapshot", () => {
    const form = create(
      <Form title="title" textInputs={textInputs} buttons={buttons} />
    );
    expect(form.toJSON()).toMatchSnapshot();
  });
});
