import React from "react";
import { create } from "react-test-renderer";

import OrgValidationText from "./OrgValidationText";

describe("OrgValidationText Component", () => {
  const textInput = {
    label: "Access code",
    id: "orgId",
    textInputStyle: "placeHolder",
    isRequired: true
  };

  const button = {
    label: "Continue",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  test("Matches the snapshot", () => {
    const testOrgValidationText = create(
      <OrgValidationText
        button={button}
        textInput={textInput}
        onChange={() => jest.fn()}
        onClick={() => jest.fn()}
      />
    );
    expect(testOrgValidationText.toJSON()).toMatchSnapshot();
  });
});
