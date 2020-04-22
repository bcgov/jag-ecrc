import React from "react";
import { create } from "react-test-renderer";

import Share from "./Share";

describe("Share Component", () => {
  test("Matches the snapshot of Share", () => {
    const displayShare = create(
      <Share newOrg="New Org" clickShare={() => jest.fn()} boxChecked />
    );
    expect(displayShare.toJSON()).toMatchSnapshot();
  });
});
