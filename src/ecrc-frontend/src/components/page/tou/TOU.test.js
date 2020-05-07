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

  const setError = jest.fn();

  const page = {
    header,
    setError
  };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("clientId", "123");
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

    window.confirm = () => true;
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

    expect(getByText(container, "Continue").disabled).toBeFalsy();

    fireEvent.click(getByText(container, "Continue"));
    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/bcscredirect"
    );
  });

  test("Validate continue button click when session expired", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <TOU page={page} />
      </Router>
    );

    expect(getByText(container, "Continue").disabled).toBeTruthy();

    fireEvent.scroll(container.querySelector("section"));
    fireEvent.click(getAllByRole(container, "checkbox")[0]);

    expect(getByText(container, "Continue").disabled).toBeFalsy();

    sessionStorage.removeItem("jwt");

    fireEvent.click(getByText(container, "Continue"));

    expect(setError).toHaveBeenCalled();
    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Redirects to error page when unauthenticated", () => {
    sessionStorage.removeItem("jwt");

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TOU page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });
});
