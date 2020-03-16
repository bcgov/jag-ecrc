import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

import TOU from "./TOU";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

describe("TermOfUse Page Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const page = {
    header
  };

  sessionStorage.setItem("validator", "secret");
  generateJWTToken({ visited: ["orgVerification"] });

  test("Matches the snapshot", () => {
    const termsOfUse = create(
      <MemoryRouter>
        <TOU page={page} />
      </MemoryRouter>
    );
    expect(termsOfUse.toJSON()).toMatchSnapshot();
  });

  test("Validate Redirect", () => {
    const termsOfUse = shallow(<TOU page={page} />);

    termsOfUse
      .find("TermsOfUse")
      .first()
      .props()
      .onContinueClick();

    expect(termsOfUse.find("Redirect")).toHaveLength(1);
    expect(termsOfUse.find("Redirect").props().to).toBe("/ecrc/bcscRedirect");
  });

  test("Validate User actions", () => {
    window.scrollTo = jest.fn();

    // Mocking UseState
    const setState = jest.fn();
    const useStateMock = initState => [initState, setState];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    // Mocking UseEffect
    const useEffect = jest.spyOn(React, "useEffect");

    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };

    // Call UseEffect twice
    mockUseEffect();
    mockUseEffect();

    // Mock Scroll Event
    const mockScrollEvent = {
      target: { scrollHeight: 80, scrollTop: 0, clientHeight: 100 }
    };

    const termsOfUse = shallow(<TOU page={page} />);

    expect(setState).toHaveBeenCalledTimes(1);

    termsOfUse
      .find("TermsOfUse")
      .first()
      .props()
      .checkFirstBox();

    termsOfUse
      .find("TermsOfUse")
      .first()
      .props()
      .checkSecondBox();

    termsOfUse
      .find("TermsOfUse")
      .first()
      .props()
      .termOfUseOnScroll(mockScrollEvent);

    expect(setState).toHaveBeenCalledTimes(4);

    jest.clearAllMocks();
  });
});
