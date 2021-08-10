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
  const setError = jest.fn();

  const page = {
    setOrg,
    setTransitionReason,
    header,
    setError
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

  test("Sets org error when no org ticket number provided", async () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "" }
    });

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(
        getByText(container, "An access code is required to continue")
      ).toBeInTheDocument();
    });
  });

  test("Redirects to Org Verification page", async () => {
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

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setOrg).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/orgverification"
    );
  });

  test("Redirects to Error page on 401 response", async () => {
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

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Redirects to error page under case where error has no response", async () => {
    axios.get.mockResolvedValueOnce({ data: "secret" });
    axios.get.mockRejectedValueOnce();

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "somebadvalue123" }
    });

    expect(getByDisplayValue(container, "somebadvalue123")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {});

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Redirects to error page under circumstance where error has response with status but no data", async () => {
    axios.get.mockResolvedValueOnce({ data: "secret" });
    axios.get.mockRejectedValueOnce({
      response: { status: 400 }
    });

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "somebadvalue123" }
    });

    expect(getByDisplayValue(container, "somebadvalue123")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {});

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Redirects to error page under circumstance where error has response with status, data, and message", async () => {
    axios.get.mockResolvedValueOnce({ data: "secret" });
    axios.get.mockRejectedValueOnce({
      response: { status: 400, data: { message: "Error is here" } }
    });

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <OrgValidation page={page} />
      </Router>
    );

    expect(getByText(container, "I'm ready")).toBeInTheDocument();

    fireEvent.change(getByRole(container, "textbox"), {
      target: { value: "somebadvalue123" }
    });

    expect(getByDisplayValue(container, "somebadvalue123")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {
      expect(setError).toHaveBeenCalled();
    });

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Displays org code error", async () => {
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

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {});

    expect(
      getByText(container, "The access code is invalid")
    ).toBeInTheDocument();
  });
});
