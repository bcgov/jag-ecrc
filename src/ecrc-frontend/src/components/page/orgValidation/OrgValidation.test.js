import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import OrgValidation from "./OrgValidation";

describe("OrgValidation Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const setOrg = () => {};
    const setTransitionReason = () => {};

    const page = {
      setOrg,
      setTransitionReason,
      header
    };

    const orgValidationPage = create(
      <MemoryRouter>
        <OrgValidation page={page} />
      </MemoryRouter>
    );
    expect(orgValidationPage.toJSON()).toMatchSnapshot();
  });
});
