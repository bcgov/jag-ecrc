/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { create } from "react-test-renderer";

import Declaration from "./Declaration";

describe("Declaration Component", () => {
  test("Matches the snapshot", () => {
    const declaration = create(<Declaration />);
    expect(declaration.toJSON()).toMatchSnapshot();
  });
});
