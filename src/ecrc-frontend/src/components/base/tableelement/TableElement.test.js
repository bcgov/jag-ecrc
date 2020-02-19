import React from "react";
import { create } from "react-test-renderer";

import TableElement from "./TableElement";

describe("TableElement Component", () => {
  test("Matches the snapshot", () => {
    const element = {
      name: "Somewhere",
      value: "Some value"
    };

    const singleElement = create(<TableElement element={element} />);
    expect(singleElement.toJSON()).toMatchSnapshot();
  });
});
