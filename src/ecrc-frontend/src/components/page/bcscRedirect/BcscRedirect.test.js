import React from "react";
import axios from "axios";
import { MemoryRouter, Router } from "react-router-dom";
import { render, fireEvent, getByText, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

import BcscRedirect from "./BcscRedirect";

jest.mock("axios");

describe("BcscRedirect Page Component", () => {
  window.scrollTo = jest.fn();
  window.open = jest.fn().mockImplementation(() => true);

  const header = {
    name: "Criminal Record Check"
  };

  const saveOrg = jest.fn();
  const setError = jest.fn();

  const page = {
    header,
    saveOrg,
    setError
  };

  const axiosCall = {
    data: "http://test.com"
  };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["tou"],
      authorities: ["Authorized"]
    });
  });

  test("Matches the snapshot", async () => {
    axios.get.mockResolvedValueOnce(axiosCall);
    const { asFragment } = render(
      <MemoryRouter>
        <BcscRedirect page={page} />
      </MemoryRouter>
    );
    await wait(() => {});
    expect(asFragment()).toMatchSnapshot();
  });

  test("Validate Login button", async () => {
    axios.get.mockResolvedValueOnce(axiosCall);
    const { container } = render(
      <MemoryRouter>
        <BcscRedirect page={page} />
      </MemoryRouter>
    );
    await wait(() => {});
    fireEvent.click(getByText(container, "Login with a BC Services Card"));
    expect(saveOrg).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith("http://test.com", "_self");
  });

  test("Validate login button click when session expired", async () => {
    axios.get.mockResolvedValueOnce(axiosCall);
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <BcscRedirect page={page} />
      </Router>
    );
    await wait(() => {});

    sessionStorage.removeItem("jwt");

    fireEvent.click(getByText(container, "Login with a BC Services Card"));

    expect(setError).toHaveBeenCalled();
    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate Redirect to Error when unauthorized", async () => {
    axios.get.mockResolvedValueOnce(axiosCall);
    const history = createMemoryHistory();
    generateJWTToken({
      actionsPerformed: ["none"],
      authorities: ["Authorized"]
    });
    render(
      <Router history={history}>
        <BcscRedirect page={page} />
      </Router>
    );
    await wait(() => {});
    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate Redirect to Error page with error response/status", async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 400 } });
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <BcscRedirect page={page} />
      </Router>
    );
    await wait(() => {});
    expect(setError).toHaveBeenCalled();
    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Validate Redirect to Error page without error response/status", async () => {
    axios.get.mockRejectedValueOnce();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <BcscRedirect page={page} />
      </Router>
    );
    await wait(() => {});
    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });
});
