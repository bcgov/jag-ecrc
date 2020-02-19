import React from "react";
import { create } from "react-test-renderer";

import TermsOfUsePage from "./TermsOfUsePage";

describe("TermOfUsePage Component", () => {
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

    const termsOfUsePage = create(
      <TermsOfUsePage page={page} onContinueClick={onContinueClick} />
    );
    expect(termsOfUsePage.toJSON()).toMatchSnapshot();
  });
});
