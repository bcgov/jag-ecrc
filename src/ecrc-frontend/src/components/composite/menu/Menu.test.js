import React from "react";
import { create } from "react-test-renderer";

import Menu from "./Menu";

describe("Menu Component", () => {
  test("Matches the snapshot", () => {
    const menuItems = [
      {
        name: "Home",
        url: "/"
      },
      {
        name: "Somewhere",
        url: "/somewhere"
      },
      {
        name: "Somewhere else",
        url: "/somewhereelse"
      },
      {
        name: "Somewhere with a long name for no reason",
        url: "/here"
      }
    ];

    const menu = create(<Menu menuItems={menuItems} />);
    expect(menu.toJSON()).toMatchSnapshot();
  });
});
