import React from "react";
import { create } from "react-test-renderer";

import OrgValidationText from "./OrgValidationText";

describe("OrgValidationText Component", () => {
  test("Matches the snapshot", () => {
    const testOrgValidationText = create(<OrgValidationText />);
    expect(testOrgValidationText.toJSON()).toMatchSnapshot();
  });
});
