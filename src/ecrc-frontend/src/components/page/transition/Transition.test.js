import React from "react";
import { create } from "react-test-renderer";

import Transition from "./Transition";

describe("Transition Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const transition = create(<Transition header={header} />);
    expect(transition.toJSON()).toMatchSnapshot();
  });
});
