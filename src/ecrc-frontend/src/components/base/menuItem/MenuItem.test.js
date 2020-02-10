import React from "react";
import { create } from "react-test-renderer";

import MenuItem from "./MenuItem";

describe("MenuItem Component", () => {
  test("Matches the snapshot", () => {
    const link = {
      url: "/somewhere",
      name: "Link to Somewhere"
    };

    const menuItem = create(<MenuItem menuItem={link} />);
    expect(menuItem.toJSON()).toMatchSnapshot();
  });
});
