import React from "react";
import { create } from "react-test-renderer";

import TOU from "./TOU";

describe("TermOfUse Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const pageLayout = {
      header
    };

    const page = {
      pageLayout
    };

    const onContinueClick = () => jest.fn();

    const termsOfUse = create(
      <TOU page={page} onContinueClick={onContinueClick} />
    );
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });
});
