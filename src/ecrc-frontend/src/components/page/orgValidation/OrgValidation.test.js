import React from "react";
import { create } from "react-test-renderer";

import OrgValidation from "./OrgValidation";

describe("OrgValidation Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const setOrg = () => {};

    const page = {
      setOrg,
      header
    };

    const orgValidationPage = create(<OrgValidation page={page} />);
    expect(orgValidationPage.toJSON()).toMatchSnapshot();
  });
});
