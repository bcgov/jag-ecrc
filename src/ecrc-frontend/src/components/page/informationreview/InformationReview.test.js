import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import InformationReview from "./InformationReview";

describe("InformationReview Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const page = {
      header
    };

    const infoReview = create(
      <MemoryRouter>
        <InformationReview page={page} />
      </MemoryRouter>
    );
    expect(infoReview.toJSON()).toMatchSnapshot();
  });
});
