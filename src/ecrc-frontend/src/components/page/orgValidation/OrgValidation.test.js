import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import {
  render,
  fireEvent,
  getByRole,
  getByDisplayValue,
  getByText,
  wait
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import axios from "axios";

import OrgValidation from "./OrgValidation";

jest.mock("axios");

describe("OrgValidation Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const setOrg = jest.fn();
  const setTransitionReason = jest.fn();

  const page = {
    setOrg,
    setTransitionReason,
    header
  };

  window.scrollTo = jest.fn();

  test("Matches the snapshot", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: "string",
        accessCodeResponse: {
          orgNm: "Test Org Name"
        }
      })
    );

    const orgValidationPage = create(
      <MemoryRouter>
        <OrgValidation page={page} />
      </MemoryRouter>
    );
    expect(orgValidationPage.toJSON()).toMatchSnapshot();
  });

  test("redirects to Org Verification page", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: "string",
        accessCodeResponse: {
          orgNm: "Test Org Name"
        }
      })
    );

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "crce" }
    });

    expect(getByDisplayValue(container, "crce")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Validate"));

    await wait(() => {
      expect(setOrg).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/orgverification"
    );
  });

  test("redirects to Transition page", async () => {
    axios.get.mockResolvedValueOnce({ data: "secret" });
    axios.get.mockRejectedValueOnce({ response: { status: 401 } });

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "crce" }
    });

    expect(getByDisplayValue(container, "crce")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Validate"));

    await wait(() => {
      expect(setTransitionReason).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/transition"
    );
  });

  test("displays org code error", async () => {
    axios.get.mockResolvedValueOnce({ data: "secret" });
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "test" }
    });

    expect(getByDisplayValue(container, "test")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Validate"));

    await wait(() => {});

    expect(
      getByText(container, "Please enter a valid org code")
    ).toBeInTheDocument();
  });
});
