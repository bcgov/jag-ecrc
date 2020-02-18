import React from "react";
import { create } from "react-test-renderer";

import BcServiceSideCard from "./BcServiceSideCard";

describe("BcServiceSideCard Component", () => {
  test("Matches the snapshot", () => {
    const bcservicesidecard = create(<BcServiceSideCard />);
    expect(bcservicesidecard.toJSON()).toMatchSnapshot();
  });
});
