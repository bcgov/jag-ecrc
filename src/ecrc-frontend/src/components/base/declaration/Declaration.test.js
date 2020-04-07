/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { create } from "react-test-renderer";

import Declaration from "./Declaration";

describe("Declaration Component", () => {
  test("Matches the default snapshot", () => {
    const declaration = create(<Declaration shareConsent={false} />);
    expect(declaration.toJSON()).toMatchSnapshot();
  });
  test("Matches the sharing snapshot", () => {
    const declaration = create(<Declaration shareConsent />);
    expect(declaration.toJSON()).toMatchSnapshot();
  });
});
