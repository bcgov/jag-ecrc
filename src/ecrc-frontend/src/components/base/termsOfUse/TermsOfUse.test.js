import React from "react";
import { create } from "react-test-renderer";

import TermsOfUse from "./TermsOfUse";

describe("TermsOfUse Component", () => {
  test("Matches the snapshot", () => {
    const termsOfUse = create(<TermsOfUse onClick={() => jest.fn()} />);
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });
});
