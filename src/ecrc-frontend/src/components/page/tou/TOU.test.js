import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getAllByRole,
  getByText
} from "@testing-library/react";
import { createMemoryHistory } from "history";

import TOU from "./TOU";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

describe("TermOfUse Page Component", () => {
  window.scrollTo = jest.fn();

  const header = {
    name: "Criminal Record Check"
  };

  const page = {
    header
  };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["orgVerification"]
    });
  });

  test("Matches the snapshot", () => {
    const termsOfUse = create(
      <MemoryRouter>
        <TOU page={page} />
      </MemoryRouter>
    );
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });

  test("Validate Cancel Redirect", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <TOU page={page} />
      </Router>
    );

    fireEvent.click(getByText(container, "Cancel and Exit"));
    expect(history.location.pathname).toEqual("/hosthome");
  });

  test("Validate Continue Redirect", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <TOU page={page} />
      </Router>
    );

    expect(getByText(container, "Continue").disabled).toBeTruthy();

    fireEvent.scroll(container.querySelector("section"));
    fireEvent.click(getAllByRole(container, "checkbox")[0]);
    fireEvent.click(getAllByRole(container, "checkbox")[1]);

    expect(getByText(container, "Continue").disabled).toBeFalsy();

    fireEvent.click(getByText(container, "Continue"));
    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/bcscredirect"
    );
  });
});
