import React from "react";
import { create } from "react-test-renderer";

import Consent from "./Consent";

describe("Consent Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const page = {
      header
    };

    const onContinueClick = () => jest.fn();

    const consent = create(
      <Consent page={page} onContinueClick={onContinueClick} />
    );
    expect(consent.toJSON()).toMatchSnapshot();
  });
});
