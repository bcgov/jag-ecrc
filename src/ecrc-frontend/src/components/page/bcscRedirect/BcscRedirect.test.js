import React from "react";
import { create } from "react-test-renderer";

import BcscRedirect from "./BcscRedirect";

describe("Consent Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const page = {
      header
    };

    const consent = create(<BcscRedirect page={page} />);
    expect(consent.toJSON()).toMatchSnapshot();
  });
});
