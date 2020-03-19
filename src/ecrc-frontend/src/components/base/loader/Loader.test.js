import React from "react";
import { create } from "react-test-renderer";

import Loader from "./Loader";

describe("Loader Component", () => {
  test("Matches the snapshot", () => {
    const loader = create(<Loader />);
    expect(loader.toJSON()).toMatchSnapshot();
  });
});
