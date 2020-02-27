import React from "react";
import { create } from "react-test-renderer";

import TermsOfUse from "./TermsOfUse";

describe("TermsOfUse Component", () => {
  test("Matches the snapshot", () => {
    const termsOfUse = create(
      <TermsOfUse
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        checkSecondBox={() => jest.fn()}
        termOfUseOnScroll={() => jest.fn()}
      />
    );
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });
});
