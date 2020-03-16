import React from "react";
import {
  render,
  fireEvent,
  getByText,
  queryByText,
  queryAllByText,
  getByPlaceholderText,
  getByLabelText
} from "@testing-library/react";
import { create } from "react-test-renderer";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import ApplicationForm from "./ApplicationForm";

describe("ApplicationForm Component", () => {
  window.scrollTo = jest.fn();

  const header = {
    name: "Criminal Record Check"
  };

  const applicant = {
    legalFirstNm: "Robert",
    legalSecondNm: "Norman",
    legalSurnameNm: "Ross",
    birthDt: "1942-10-29",
    genderTxt: "Male",
    addressLine1: "123 Somewhere",
    cityNm: "Here",
    provinceNm: "British Columbia",
    postalCodeTxt: "V9V 9V9",
    countryNm: "Canada"
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

  test("Displays Organization Facility when Schedule D Org", () => {
    const { getByText } = render(<ApplicationForm page={page} />);

    expect(getByText("Organization Facility")).toBeInTheDocument();
  });

  test("Does not display Organization Facility when not Schedule D Org", () => {
    const { queryByText } = render(
      <ApplicationForm
        page={{ ...page, org: { defaultScheduleTypeCd: "WBSC" } }}
      />
    );

    expect(queryByText("Organization Facility")).toBeNull();
  });

  test("Displays Additional Aliases", () => {
    const { container } = render(<ApplicationForm page={page} />);

    expect(queryAllByText(container, "First Name")).toHaveLength(2);

    fireEvent.click(getByText(container, "click here to add them"));

    expect(queryAllByText(container, "First Name")).toHaveLength(3);

    fireEvent.click(getByText(container, "click here to add them"));

    expect(queryAllByText(container, "First Name")).toHaveLength(4);
    expect(queryByText(container, "click here to add them")).toBeNull();
  });

  test("Displays Previously Set Values on returning", () => {
    const returningApplicant = {
      ...applicant,
      alias1FirstNm: "Bob",
      alias2FirstNm: "Rob",
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const { getByDisplayValue } = render(
      <ApplicationForm
        page={{ ...page, applicant: { ...returningApplicant } }}
      />
    );

    expect(getByDisplayValue("Bob")).toBeInTheDocument();
    expect(getByDisplayValue("Rob")).toBeInTheDocument();
    expect(getByDisplayValue("1234567890")).toBeInTheDocument();
    expect(getByDisplayValue("PBS")).toBeInTheDocument();
  });

  test("Prevents navigation if different address checked but not set", () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );

    fireEvent.click(
      getByLabelText(
        container,
        "Is your mailing address different from your current street address?"
      )
    );

    expect(getByText(container, "Current Mailing Address")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your PO box or street address")
    ).toBeInTheDocument();
  });

  test("Only accepts valid email addresses", () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your personal email address")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "example@test.com"), {
      target: { value: "bob@.com" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(
        container,
        "Please enter a valid email address eg. name@company.ca"
      )
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "example@test.com"), {
      target: { value: "bob@ross.com" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(history.location.pathname).toEqual("/ecrc/informationreview");
  });

  test("Only accepts valid phone numbers", () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your primary phone number")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "123 456 7890"), {
      target: { value: "123456" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(
        container,
        "Please enter a phone number in the form XXX XXX-XXXX"
      )
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "123 456 7890"), {
      target: { value: "1234567890" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(history.location.pathname).toEqual("/ecrc/informationreview");
  });

  test("Prevents navigation without required fields", () => {
    const { getByText } = render(<ApplicationForm page={page} />);

    fireEvent.click(getByText("Continue"));

    expect(
      getByText("Please enter your city and country of birth")
    ).toBeInTheDocument();
  });

  test("Redirect to Home", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={page} />
      </Router>
    );

    expect(
      getByText(container, "Criminal Record Check - Application")
    ).toBeInTheDocument();

    fireEvent.click(getByText(container, "Cancel"));

    expect(history.location.pathname).toEqual("/");
  });
});
