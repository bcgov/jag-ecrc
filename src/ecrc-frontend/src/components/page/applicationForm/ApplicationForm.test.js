/* eslint-disable no-console */
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
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ApplicationForm from "./ApplicationForm";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

describe("ApplicationForm Component", () => {
  window.scrollTo = jest.fn();
  window.confirm = jest.fn();

  // to silence [react-phone-number-input] Phone number +12345678901 corresponds to country US but CA was specified instead error
  // uncomment when adding new tests to ensure no new errors are produced
  console.error = jest.fn();

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

  const sameAddress = true;
  const setSameAddress = jest.fn();

  const provinces = [
    { name: "British Columbia" },
    { name: "Ontario" },
    { name: "Alberta" }
  ];

  const setProvinces = jest.fn();

  const page = {
    header,
    applicant,
    org,
    setApplicant,
    setError,
    sameAddress,
    setSameAddress,
    provinces,
    setProvinces
  };

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    sessionStorage.setItem("org", org);

    const mock = new MockAdapter(axios);
    const API_REQUEST_PROVINCES =
      "/ecrc/protected/getProvinceList?requestGuid=unique123";
    const API_REQUEST_JWT =
      "/ecrc/protected/login?code=code&requestGuid=unique123";

    mock.onGet(API_REQUEST_PROVINCES).reply(200, {
      provinces: {
        province: [
          { name: "British Columbia" },
          { name: "Ontario" },
          { name: "Alberta" }
        ]
      }
    });

    const newPayload = {
      userInfo: {
        birthdate: "04/04/04",
        address: {
          street_address: "123 addy",
          locality: "local",
          region: "British Columbia",
          postal_code: "v9n1d4"
        },
        gender: "M",
        given_name: "given",
        given_names: "givens",
        family_name: "fam",
        identity_assurance_level: 3
      },
      authorities: ["Authorized"]
    };
    const token = generateJWTToken(newPayload);

    mock.onGet(API_REQUEST_JWT).reply(200, token);
  });

  test("Matches the snapshot", async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(asFragment()).toMatchSnapshot();
  });

  test("Validate Redirect to Error when unauthorized", () => {
    const history = createMemoryHistory();

    sessionStorage.clear();

    render(
      <Router history={history}>
        <ApplicationForm page={page} />
      </Router>
    );

    expect(history.location.pathname).toEqual("/criminalrecordcheck/error");
  });

  test("Displays Organization Facility when Schedule D Org", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(getByText(container, "Organization Facility")).toBeInTheDocument();
  });

  test("Does not display Organization Facility when not Schedule D Org", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
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
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
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
      phoneNumber: "234 567-8901",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: { ...returningApplicant } }}
        />
      </MemoryRouter>
    );
    await wait(() => {});

    expect(getByDisplayValue(container, "Bob")).toBeInTheDocument();
    expect(getByDisplayValue(container, "Rob")).toBeInTheDocument();
    expect(getByDisplayValue(container, "PBS")).toBeInTheDocument();
    expect(getByDisplayValue(container, "(234) 567-8901")).toBeInTheDocument();
  });

  test("Prevents navigation if different address checked but not set", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "2345678901",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    expect(
      getByPlaceholderText(container, "Street or PO Box")
    ).toBeInTheDocument();

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Street or PO box is required")
    ).toBeInTheDocument();
  });

  test("Only accepts valid email addresses", async () => {
    const completeApplicant = {
      ...applicant,
      birthPlace: "Daytona Beach, Florida",
      driversLicNo: "123456",
      phoneNumber: "2345678901",
      emailAddress: "",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Personal email address is required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "example@test.com"), {
      target: { value: "bob@.com" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Email address must be in the form name@company.ca")
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
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Primary phone number is required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "250 555-1234"), {
      target: { value: "123456" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Phone number must be in the form XXX XXX-XXXX")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "250 555-1234"), {
      target: { value: "2345678901" }
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
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    fireEvent.click(getByText(container, "Continue"));

    expect(getByText(container, "Postal code is required")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "V9V 9V9"), {
      target: { value: "V9999V9" }
    });

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Postal code must be in the form V9V 9V9")
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
      phoneNumber: "2345678901",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "City and country of birth are required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "City, Country"), {
      target: { value: "Daytona Beach, Florida" }
    });

    expect(
      queryByText(container, "City and country of birth are required")
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
      phoneNumber: "2505551234",
      emailAddress: "bob@ross.com",
      jobTitle: "",
      organizationFacility: "PBS"
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Position/job title is required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Position/Job Title"), {
      target: { value: "Painter" }
    });

    expect(queryByText(container, "Position/job title is required")).toBeNull();

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
      phoneNumber: "2345678901",
      emailAddress: "bob@ross.com",
      jobTitle: "Painter",
      organizationFacility: ""
    };

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Organization facility is required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Organization Facility"), {
      target: { value: "PBS" }
    });

    expect(
      queryByText(container, "Organization facility is required")
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
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Street or PO box is required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Street or PO Box"), {
      target: { value: "234 Here St" }
    });

    expect(queryByText(container, "Street or PO box is required")).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(queryByText(container, "Street or PO box is required")).toBeNull();
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
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </Router>
    );
    await wait(() => {});

    fireEvent.click(getByTestId(container, "differentAddress"));

    await wait(() => {});

    fireEvent.click(getByText(container, "Continue"));

    expect(getByText(container, "City is required")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "City"), {
      target: { value: "Nowhere" }
    });

    expect(queryByText(container, "City is required")).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(queryByText(container, "City is required")).toBeNull();
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

    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </Router>
    );

    fireEvent.click(getByTestId(container, "differentAddress"));

    await wait(() => {});

    const displayedProvinces = queryAllByDisplayValue(
      container,
      "British Columbia"
    );

    expect(displayedProvinces).toHaveLength(2);

    fireEvent.mouseDown(displayedProvinces[1]);

    fireEvent.change(displayedProvinces[1], {
      target: { value: "Ontario" }
    });

    expect(getByDisplayValue(container, "Ontario")).toBeInTheDocument();
  });

  test("Redirect to Home", async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history} initialEntries={["/applicationform?code=code"]}>
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
