import React from "react";
import { create } from "react-test-renderer";

import UserConfirmation from "./UserConfirmation";
import { MemoryRouter } from "react-router-dom";

describe("User Confirmation Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const setApplicant = () => {};

    const page = {
      header,
      setApplicant
    };

    const userConfirmation = create(
      <MemoryRouter>
        <UserConfirmation page={page} />
      </MemoryRouter>
    );
    expect(userConfirmation.toJSON()).toMatchSnapshot();
  });
});
