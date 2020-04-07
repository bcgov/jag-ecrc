import React from "react";
import { create } from "react-test-renderer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, getAllByRole, wait } from "@testing-library/react";

import Header, { goHome } from "./Header";

describe("Header Component", () => {
  const header = {
    name: "eCRC"
  };

  window.confirm = jest.fn();

  test("Matches the snapshot", () => {
    const history = createMemoryHistory();

    const headerComponent = create(
      <Router history={history}>
        <Header header={header} />
      </Router>
    );
    expect(headerComponent.toJSON()).toMatchSnapshot();
  });

  test("Clicking header from a screen such as consent opens a confirmation popup", async () => {
    const history = createMemoryHistory();

    history.location.pathname = "/criminalrecordcheck/consent";

    const { container } = render(
      <Router history={history}>
        <Header header={header} />
      </Router>
    );

    fireEvent.click(getAllByRole(container, "button")[0]);

    await wait(() => {
      expect(window.confirm).toHaveBeenCalled();
    });
  });

  test("Go Home function works as expected", () => {
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    const history = createMemoryHistory();

    history.location.pathname = "/criminalrecordcheck";

    jest.spyOn(event, "preventDefault");
    jest.spyOn(event, "stopPropagation");

    let result = goHome(event, history);

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
    expect(result).toEqual(false);

    history.location.pathname = "/criminalrecordcheck/error";

    result = goHome(event, history);

    expect(result).toEqual(true);
    expect(history.location.pathname).toEqual("/");
    expect(sessionStorage.length).toEqual(0);

    history.location.pathname = "/criminalrecordcheck/consent";
    window.confirm = () => {
      return true;
    };

    result = goHome(event, history);

    expect(result).toEqual(true);
    expect(history.location.pathname).toEqual("/");
    expect(sessionStorage.length).toEqual(0);
  });
});
