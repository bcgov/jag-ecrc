import React from "react";
import { create } from "react-test-renderer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, wait, getByTestId } from "@testing-library/react";

import Transition from "./Transition";

jest.setTimeout(10000);

describe("Transition Page Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const page = {
    header
  };

  window.open = jest.fn();
  window.confirm = jest.fn();

  test("Matches the default/BCSC snapshot", () => {
    const history = createMemoryHistory();

    const defaultTransition = create(
      <Router history={history}>
        <Transition page={page} />
      </Router>
    );

    expect(defaultTransition.toJSON()).toMatchSnapshot();
  });

  test("Component waits 6 seconds before automatically redirecting the user", async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Transition page={{ ...page, transitionReason: "bcsc" }} />
      </Router>
    );

    await wait(
      () => {
        expect(window.open).toHaveBeenCalled();
      },
      { timeout: 7000 }
    );
  }, 10000);

  test("Clicking redirect link opens other app page and does not show a confirmation popup", async () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Transition page={page} />
      </Router>
    );

    fireEvent.click(getByTestId(container, "exitApp"));

    await wait(() => {
      expect(window.confirm).not.toHaveBeenCalled();
    });
  });

  test("Keydown on redirect link opens other app page and does not show a confirmation popup", async () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Transition page={page} />
      </Router>
    );

    fireEvent.keyDown(getByTestId(container, "exitApp"));

    await wait(() => {
      expect(window.confirm).not.toHaveBeenCalled();
    });
  });
});
