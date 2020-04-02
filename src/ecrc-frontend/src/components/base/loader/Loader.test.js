import React from "react";
import { create } from "react-test-renderer";

import Loader from "./Loader";

describe("Loader Component", () => {
  test("Page loader matches the snapshot", () => {
    const page = true;
    const loader = create(<Loader page={page} />);
    expect(loader.toJSON()).toMatchSnapshot();
  });

  test("Btn loader matches the snapshot", () => {
    const page = false;
    const loader = create(<Loader page={page} />);
    expect(loader.toJSON()).toMatchSnapshot();
  });
});
