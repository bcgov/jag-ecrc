import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Error from "./Error";

describe("Error Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const error = { status: 403, message: "Unauthorized" };

  const page = {
    header,
    error
  };

  test("Matches the snapshot", () => {
    const ErrorPage = create(
      <MemoryRouter>
        <Error page={page} />
      </MemoryRouter>
    );
    expect(ErrorPage.toJSON()).toMatchSnapshot();
  });
});
