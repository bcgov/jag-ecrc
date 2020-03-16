import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

import OrgVerification from "./OrgVerification";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

describe("OrgVerification Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const org = {
    orgNm: "Test Org Name",
    addressLine1: "123 Somewhere Lane",
    cityNm: "Nowhere",
    provinceNm: "British Columbia",
    countryNm: "Canada",
    contactPhoneNo: "250 123 4567",
    orgApplicantRelationship: "Employee"
  };

  const page = {
    header,
    org
  };

  // Mock window function
  window.scrollTo = jest.fn();

  sessionStorage.setItem("validator", "secret");
  generateJWTToken({ visited: ["orgValidation"] });

  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    // Mocking useEffect
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
  });

  test("Matches the snapshot", () => {
    const orgVerificationPage = create(
      <MemoryRouter>
        <OrgVerification page={page} />
      </MemoryRouter>
    );
    expect(orgVerificationPage.toJSON()).toMatchSnapshot();
  });

  test("Redirect to Home", () => {
    const orgVerificationPage = shallow(<OrgVerification page={page} />);

    expect(orgVerificationPage.find("Redirect")).toHaveLength(0);

    orgVerificationPage
      .find("Button")
      .first()
      .props()
      .onClick();

    expect(orgVerificationPage.find("Redirect")).toHaveLength(1);
    expect(orgVerificationPage.find("Redirect").props().to).toBe("/");
  });

  test("Redirect to terms of use", () => {
    const orgVerificationPage = shallow(<OrgVerification page={page} />);

    expect(orgVerificationPage.find("Redirect")).toHaveLength(0);

    orgVerificationPage
      .find("Button")
      .last()
      .props()
      .onClick();

    expect(orgVerificationPage.find("Redirect")).toHaveLength(1);
    expect(orgVerificationPage.find("Redirect").props().to).toBe(
      "/ecrc/termsofuse"
    );
  });

  test("Redirect to Home on empty organization", () => {
    page.org.orgNm = "";

    const orgVerificationPage = shallow(<OrgVerification page={page} />);

    expect(orgVerificationPage.find("Redirect")).toHaveLength(1);
    expect(orgVerificationPage.find("Redirect").props().to).toBe("/");
  });
});
