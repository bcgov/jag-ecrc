import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import TOU from "./TOU";

describe("TermOfUse Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const page = {
      header
    };

    const onContinueClick = () => jest.fn();

    const termsOfUse = create(
      <MemoryRouter>
        <TOU page={page} onContinueClick={onContinueClick} />
      </MemoryRouter>
    );
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });
});
