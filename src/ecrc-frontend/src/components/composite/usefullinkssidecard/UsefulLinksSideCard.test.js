import React from "react";
import { create } from "react-test-renderer";

import UsefulLinksSideCard from "./UsefulLinksSideCard";

describe("UsefulLinksSideCard Component", () => {
  test("Matches the snapshot", () => {
    const links = [
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

    const usefulLinks = create(<UsefulLinksSideCard sideCardLinks={links} />);
    expect(usefulLinks.toJSON()).toMatchSnapshot();
  });
});
