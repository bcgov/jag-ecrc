import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  getByText
} from "@testing-library/react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import ApplicationForm from "./ApplicationForm";
import { shallow } from "enzyme";

describe("ApplicationForm Component", () => {
  window.scrollTo = jest.fn();

  const header = {
    name: "Criminal Record Check"
  };

  const applicant = {
    legalFirstNm: "Robert",
    legalSecondNm: "Norman",
    legalSurnameNm: "Ross",
    birthPlace: "",
    birthDt: "1942-10-29",
    genderTxt: "Male",
    driversLicNo: "",
    phoneNumber: "",
    emailAddress: "",
    addressLine1: "123 Somewhere",
    cityNm: "Here",
    provinceNm: "British Columbia",
    postalCodeTxt: "V9V 9V9",
    countryNm: "Canada",
    jobTitle: "",
    organizationFacility: ""
  };

  const setApplicant = () => {};
  const org = {
    defaultScheduleTypeCd: "WBSD"
  };

  const page = {
    header,
    applicant,
    org,
    setApplicant
  };

  test("Matches the snapshot", () => {
    const applicationPage = create(
      <MemoryRouter>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    expect(applicationPage.toJSON()).toMatchSnapshot();
  });

  test("Displays user information", () => {
    const { getByDisplayValue } = render(<ApplicationForm page={page} />);

    // waitForElement(() => getByText("First Name"));

    expect(getByDisplayValue("Robert"));
  });

  test("Displays Organization Facility when Schedule D Org", () => {
    const { getByText } = render(<ApplicationForm page={page} />);

    expect(getByText("Organization Facility")).toBeInTheDocument();
  });

  test("Prevents navigation without required fields", () => {
    const { container } = render(<ApplicationForm page={page} />);

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your city and country of birth")
    ).toBeInTheDocument();
  });

  test("Redirect to Home", () => {
    const applicationForm = shallow(<ApplicationForm page={page} />);

    expect(applicationForm.find("Redirect")).toHaveLength(0);

    applicationForm
      .find("Button")
      .first()
      .props()
      .onClick();

    expect(applicationForm.find("Redirect")).toHaveLength(1);
    expect(applicationForm.find("Redirect").props().to).toBe("/");
  });
});
