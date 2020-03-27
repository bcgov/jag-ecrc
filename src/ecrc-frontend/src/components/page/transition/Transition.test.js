import React from "react";
import { create } from "react-test-renderer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Transition from "./Transition";

describe("Transition Page Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const page = {
    header
  };

  test("Matches the default/BCSC snapshot", () => {
    const history = createMemoryHistory();

    const defaultTransition = create(
      <Router history={history}>
        <Transition page={page} />
      </Router>
    );

    expect(defaultTransition.toJSON()).toMatchSnapshot();
  });

  test("Matches the non-whitelisted snapshot", () => {
    const history = createMemoryHistory();

    const nonWhitelistTransition = create(
      <Router history={history}>
        <Transition page={{ ...page, transitionReason: "notwhitelisted" }} />
      </Router>
    );
    expect(nonWhitelistTransition.toJSON()).toMatchSnapshot();
  });
});
