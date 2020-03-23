import React from "react";
import { create } from "react-test-renderer";
import { Router, MemoryRouter } from "react-router-dom";
import {
  render,
  fireEvent,
  getAllByRole,
  getByText
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

import Consent from "./Consent";

describe("Consent Page Component", () => {
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
      actionsPerformed: ["userConfirmation"],
      authorities: ["Authorized"]
    });
  });

  test("Matches the snapshot", () => {
    const consent = create(
      <MemoryRouter>
        <Consent page={page} />
      </MemoryRouter>
    );
    expect(consent.toJSON()).toMatchSnapshot();
  });

  test("Validate Cancel Redirect", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    fireEvent.click(getByText(container, "Cancel and Exit"));
    expect(history.location.pathname).toEqual("/hosthome");
  });

  test("Validate Continue Redirect", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    expect(getByText(container, "Continue").disabled).toBeTruthy();

    const checkbox = getAllByRole(container, "checkbox");

    fireEvent.click(checkbox[0]);
    fireEvent.click(checkbox[1]);
    fireEvent.click(checkbox[2]);

    expect(getByText(container, "Continue").disabled).toBeFalsy();

    fireEvent.click(getByText(container, "Continue"));
    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/applicationform"
    );
  });

  test("Validate Redirect to Home when unauthorized", () => {
    const history = createMemoryHistory();

    generateJWTToken({
      actionsPerformed: ["none"],
      authorities: ["Authorized"]
    });

    render(
      <Router history={history}>
        <Consent page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/");
  });
});
