import React from "react";
import { create } from "react-test-renderer";

import Transition from "./Transition";

describe("Transition Page Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const page = {
    header
  };

  test("Matches the default snapshot", () => {
    const defaultTransition = create(<Transition page={page} />);
    expect(defaultTransition.toJSON()).toMatchSnapshot();
  });
  test("Matches the non-whitelisted snapshot", () => {
    const nonWhitelistTransition = create(
      <Transition page={{ ...page, transitionReason: "notwhitelisted" }} />
    );
    expect(nonWhitelistTransition.toJSON()).toMatchSnapshot();
  });
});
