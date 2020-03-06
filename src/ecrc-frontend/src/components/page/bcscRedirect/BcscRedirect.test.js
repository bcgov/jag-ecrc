import React from "react";
import { create } from "react-test-renderer";

import BcscRedirect from "./BcscRedirect";

describe("BcscRedirect Page Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const saveOrg = () => {};

    const page = {
      header,
      saveOrg
    };

    const bcscRedirect = create(<BcscRedirect page={page} />);
    expect(bcscRedirect.toJSON()).toMatchSnapshot();
  });
});
