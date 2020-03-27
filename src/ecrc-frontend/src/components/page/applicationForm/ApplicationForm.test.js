import React from "react";
import {
  render,
  fireEvent,
  getByText,
  queryByText,
  queryAllByText,
  queryAllByDisplayValue,
  getByPlaceholderText,
  getByTestId,
  getByDisplayValue,
  wait
} from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";

import ApplicationForm from "./ApplicationForm";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

jest.mock("axios");

describe("ApplicationForm Component", () => {
  window.scrollTo = jest.fn();

  const axiosCall = {
    data: {
      provinces: {
        province: [
          { name: "British Columbia" },
          { name: "Ontario" },
          { name: "Alberta" }
        ]
      }
    }
  };

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

  const setApplicant = jest.fn();
  const setError = jest.fn();
  const org = {
    defaultScheduleTypeCd: "WBSD"
  };

  const page = {
    header,
    applicant,
    org,
    setApplicant,
    setError
  };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    generateJWTToken({
      actionsPerformed: ["userConfirmation"],
      authorities: ["Authorized"]
    });
    axios.get.mockResolvedValueOnce(axiosCall);
  });

  test("Matches the snapshot", async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(asFragment()).toMatchSnapshot();
  });

  test("Displays Organization Facility when Schedule D Org", async () => {
    const { container } = render(
      <MemoryRouter>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(getByText(container, "Organization Facility")).toBeInTheDocument();
  });

  test("Does not display Organization Facility when not Schedule D Org", async () => {
    const { container } = render(
      <MemoryRouter>
        <ApplicationForm
          page={{ ...page, org: { defaultScheduleTypeCd: "WBSC" } }}
        />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(queryByText(container, "Organization Facility")).toBeNull();
  });

  test("Displays Additional Aliases", async () => {
    const { container } = render(
      <MemoryRouter>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(queryAllByText(container, "First Name")).toHaveLength(3);

    fireEvent.click(getByText(container, "click here to add them"));

    expect(queryAllByText(container, "First Name")).toHaveLength(4);

    fireEvent.click(getByText(container, "click here to add them"));

    expect(queryAllByText(container, "First Name")).toHaveLength(5);
    expect(queryByText(container, "click here to add them")).toBeNull();
  });

  test("Displays Previously Set Values on returning", async () => {
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

    const { container } = render(
      <MemoryRouter>
        <ApplicationForm
          page={{ ...page, applicant: { ...returningApplicant } }}
        />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(getByDisplayValue(container, "Bob")).toBeInTheDocument();
    expect(getByDisplayValue(container, "Rob")).toBeInTheDocument();
    expect(getByDisplayValue(container, "1234567890")).toBeInTheDocument();
    expect(getByDisplayValue(container, "PBS")).toBeInTheDocument();
  });

  test("Prevents navigation if different address checked but not set", async () => {
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
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    expect(getByText(container, "Current Mailing Address")).toBeInTheDocument();

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your PO box or street address")
    ).toBeInTheDocument();
  });

  test("Only accepts valid email addresses", async () => {
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
    await wait(() => {});

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

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/informationreview"
    );
  });

  test("Only accepts valid phone numbers", async () => {
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
    await wait(() => {});

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

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/informationreview"
    );
  });

  test("Only accepts valid postal codes", async () => {
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
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(
        container,
        "Please enter a valid postal code in the form V9V 9V9"
      )
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "V9V 9V9"), {
      target: { value: "V99 9V9" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(
        container,
        "Please enter a valid postal code in the form V9V 9V9"
      )
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "V9V 9V9"), {
      target: { value: "V9V9V9" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      queryByText(
        container,
        "Please enter a valid postal code in the form V9V 9V9"
      )
    ).toBeNull();
  });

  test("Requires city and country of birth", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "",
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
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your city and country of birth")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "City, Country"), {
      target: { value: "Daytona Beach, Florida" }
    });

    expect(
      queryByText(container, "Please enter your city and country of birth")
    ).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/informationreview"
    );
  });

  test("Requires applicant's position/job title", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your position/job title")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Position/Job Title"), {
      target: { value: "Painter" }
    });

    expect(
      queryByText(container, "Please enter your position/job title")
    ).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/informationreview"
    );
  });

  test("Requires organization facility if schedule D", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: ""
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your organization facility")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Organization Facility"), {
      target: { value: "PBS" }
    });

    expect(
      queryByText(container, "Please enter your organization facility")
    ).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(history.location.pathname).toEqual(
      "/criminalrecordcheck/informationreview"
    );
  });

  test("Requires street if different mailing address selected", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: ""
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Please enter your PO box or street address")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Street or PO Box"), {
      target: { value: "234 Here St" }
    });

    expect(
      queryByText(container, "Please enter your PO box or street address")
    ).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(
      queryByText(container, "Please enter your PO box or street address")
    ).toBeNull();
  });

  test("Requires city if different mailing address selected", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: ""
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    fireEvent.click(getByText(container, "Continue"));

    expect(getByText(container, "Please enter your city")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "City"), {
      target: { value: "Nowhere" }
    });

    expect(queryByText(container, "Please enter your city")).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(queryByText(container, "Please enter your city")).toBeNull();
  });

  test("Select province if different mailing address selected", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "1234567890",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: ""
    };

    axios.get.mockResolvedValueOnce(axiosCall);

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );

    fireEvent.click(getByTestId(container, "differentAddress"));

    await wait(() => {});

    const provinces = queryAllByDisplayValue(container, "British Columbia");

    expect(provinces).toHaveLength(2);

    fireEvent.mouseDown(provinces[1]);

    expect(getByText(container, "Ontario")).toBeInTheDocument();

    fireEvent.change(provinces[1], {
      target: { value: "Ontario" }
    });

    expect(getByDisplayValue(container, "Ontario")).toBeInTheDocument();
  });

  test("Redirect to Home", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <ApplicationForm page={page} />
      </Router>
    );
    await wait(() => {});

    expect(
      getByText(container, "Criminal Record Check - Application")
    ).toBeInTheDocument();

    fireEvent.click(getByText(container, "Cancel"));

    expect(history.location.pathname).toEqual("/");
  });
});
