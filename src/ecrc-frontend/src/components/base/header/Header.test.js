import React from "react";
import { create } from "react-test-renderer";

import Header from "./Header";

describe("Header Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "eCRC"
    };

    const testHeader = create(<Header header={header} />);
    expect(testHeader.toJSON()).toMatchSnapshot();
  });
});
