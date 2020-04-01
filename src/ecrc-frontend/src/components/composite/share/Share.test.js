import React from "react";
import { create } from "react-test-renderer";

import Share from "./Share";

describe("Share Component", () => {
  test("Matches the snapshot of Share", () => {
    const displayShare = create(<Share />);
    expect(displayShare.toJSON()).toMatchSnapshot();
  });
});
