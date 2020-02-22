import React from "react";
import { create } from "react-test-renderer";

import OrgValidation from "./OrgValidation";
import { MemoryRouter } from "react-router-dom";

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

    const orgValidationPage = create(
      <MemoryRouter>
        <OrgValidation page={page} />
      </MemoryRouter>
    );
    expect(orgValidationPage.toJSON()).toMatchSnapshot();
  });
});
