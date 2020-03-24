import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import UserConfirmation from "./UserConfirmation";

describe("User Confirmation Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const setApplicant = () => jest.fn();
    const setError = () => jest.fn();

    const page = {
      header,
      setApplicant,
      setError
    };

    const userConfirmation = create(
      <MemoryRouter>
        <UserConfirmation page={page} />
      </MemoryRouter>
    );
    expect(userConfirmation.toJSON()).toMatchSnapshot();
  });
});
