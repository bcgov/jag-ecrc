import React from "react";
import { create } from "react-test-renderer";

import UserConfirmation from "./UserConfirmation";

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

    const userConfirmation = create(<UserConfirmation page={page} />);
    expect(userConfirmation.toJSON()).toMatchSnapshot();
  });
});
