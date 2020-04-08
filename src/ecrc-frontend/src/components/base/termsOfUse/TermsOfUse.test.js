import React from "react";
import { create } from "react-test-renderer";
import { Router } from "react-router-dom";
import { render, fireEvent, getByText, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";

import TermsOfUse from "./TermsOfUse";

describe("TermsOfUse Component", () => {
  window.print = jest.fn();
  window.confirm = jest.fn();
  window.open = jest.fn();

  test("Matches the snapshot", () => {
    const termsOfUse = create(
      <TermsOfUse
        onContinueClick={() => jest.fn()}
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        reachedEnd={false}
        termOfUseOnScroll={() => jest.fn()}
      />
    );
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });

  test("Validate print terms of use (click)", async () => {
    const { container } = render(
      <TermsOfUse
        onContinueClick={() => jest.fn()}
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        reachedEnd={false}
        termOfUseOnScroll={() => jest.fn()}
      />
    );

    fireEvent.click(getByText(container, "Print"));

    await wait(() => {
      expect(window.print).toHaveBeenCalled();
    });
  });

  test("Validate print terms of use (keydown)", async () => {
    const { container } = render(
      <TermsOfUse
        onContinueClick={() => jest.fn()}
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        reachedEnd={false}
        termOfUseOnScroll={() => jest.fn()}
      />
    );

    fireEvent.keyDown(getByText(container, "Print"));

    await wait(() => {
      expect(window.print).toHaveBeenCalled();
    });
  });

  test("Validate download terms of use (click)", async () => {
    const { container } = render(
      <TermsOfUse
        onContinueClick={() => jest.fn()}
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        reachedEnd={false}
        termOfUseOnScroll={() => jest.fn()}
      />
    );

    fireEvent.click(getByText(container, "Download"));

    await wait(() => {
      expect(window.open).toHaveBeenCalledWith(
        "https://www2.gov.bc.ca/assets/download/66CA082E49F740D69D54C6EB8AE65820",
        "_blank"
      );
    });
  });

  test("Validate download terms of use (keydown)", async () => {
    const { container } = render(
      <TermsOfUse
        onContinueClick={() => jest.fn()}
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        reachedEnd={false}
        termOfUseOnScroll={() => jest.fn()}
      />
    );

    fireEvent.keyDown(getByText(container, "Download"));

    await wait(() => {
      expect(window.open).toHaveBeenCalledWith(
        "https://www2.gov.bc.ca/assets/download/66CA082E49F740D69D54C6EB8AE65820",
        "_blank"
      );
    });
  });

  test("Validate cancel click causes a confirm popup to open", async () => {
    const { container } = render(
      <TermsOfUse
        onContinueClick={() => jest.fn()}
        onCancelClick={() => jest.fn()}
        checkFirstBox={() => jest.fn()}
        reachedEnd={false}
        termOfUseOnScroll={() => jest.fn()}
      />
    );

    fireEvent.click(getByText(container, "Cancel and Exit"));

    await wait(() => {
      expect(window.confirm).toHaveBeenCalled();
    });
  });

  test("Validate cancel click causes a redirect back to host home", async () => {
    window.confirm = () => {
      return true;
    };
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <TermsOfUse
          onContinueClick={() => jest.fn()}
          onCancelClick={() => jest.fn()}
          checkFirstBox={() => jest.fn()}
          reachedEnd={false}
          termOfUseOnScroll={() => jest.fn()}
        />
      </Router>
    );

    fireEvent.click(getByText(container, "Cancel and Exit"));

    await wait(() => {
      expect(history.location.pathname).toEqual("/hosthome");
    });
  });
});
