import React from "react";
import { create } from "react-test-renderer";

import Header from "./Header";

describe("Header Component", () => {
  test("Matches the snapshot", () => {
    const name = "eCRC";

    const header = create(<Header name={name} />);
    expect(header.toJSON()).toMatchSnapshot();
  });
});
