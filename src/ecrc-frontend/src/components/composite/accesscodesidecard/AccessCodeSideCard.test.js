import React from "react";
import { create } from "react-test-renderer";

import AccessCodeSideCard from "./AccessCodeSideCard";

describe("AccessCodeSideCard Component", () => {
  test("Matches the snapshot", () => {
    const accessCode = create(<AccessCodeSideCard />);
    expect(accessCode.toJSON()).toMatchSnapshot();
  });
});
