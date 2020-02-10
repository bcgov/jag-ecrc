import React from "react";
import { create } from "react-test-renderer";

import Menu from "./Menu";

describe("Menu Component", () => {
  test("Matches the snapshot of empty menu", () => {
    const emptyMenu = create(<Menu />);
    expect(emptyMenu.toJSON()).toMatchSnapshot();
  });
  test("Matches the snapshot of populated menu", () => {
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

    const populatedMenu = create(<Menu menuItems={menuItems} />);
    expect(populatedMenu.toJSON()).toMatchSnapshot();
  });
});
