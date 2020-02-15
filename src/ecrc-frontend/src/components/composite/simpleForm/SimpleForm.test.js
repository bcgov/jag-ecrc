/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { create } from "react-test-renderer";

import { SimpleForm } from "./SimpleForm";

describe("SimpleForm Component", () => {
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

  const simpleForm = { title: "title", textInputs, buttons };

  test("Matches the snapshot", () => {
    const form = create(<SimpleForm simpleForm={simpleForm} />);
    expect(form.toJSON()).toMatchSnapshot();
  });
});
