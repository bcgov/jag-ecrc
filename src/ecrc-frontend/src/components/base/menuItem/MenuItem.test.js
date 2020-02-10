import React from "react";
import { create } from "react-test-renderer";

import MenuItem from "./MenuItem";

describe("MenuItem Component", () => {
  test("Matches the snapshot", () => {
    const menuItem = {
      url: "/somewhere",
      name: "Link to Somewhere"
    };

    const singleMenuItem = create(<MenuItem menuItem={menuItem} />);
    expect(singleMenuItem.toJSON()).toMatchSnapshot();
  });
});
