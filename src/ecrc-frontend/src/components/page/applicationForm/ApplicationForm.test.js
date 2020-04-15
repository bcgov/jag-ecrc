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
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ApplicationForm from "./ApplicationForm";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe("ApplicationForm Component", () => {
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

  const completeApplicant = {
    ...applicant,
    birthPlace: "Daytona Beach, Florida",
    driversLicNo: "123456",
    phoneNumber: "1234567890",
    emailAddress: "bob@ross.com",
    jobTitle: "Painter",
    organizationFacility: "PBS"
  };

  const completeApplicantWithMailingAddress = {
    ...completeApplicant,
    mailingLine1: "456 Somewhere Else",
    mailingCityNm: "Vancouver",
    mailingProvinceNm: "BRITISH COLUMBIA",
    mailingPostalCodeTxt: "A1A 1A1"
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

  const mock = new MockAdapter(axios);
  const API_REQUEST_PROVINCES =
    "/ecrc/protected/getProvinceList?requestGuid=unique123";
  const API_REQUEST_JWT =
    "/ecrc/protected/login?code=code&requestGuid=unique123";

  beforeEach(() => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("uuid", "unique123");
    sessionStorage.setItem("org", org);

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

    expect(asFragment()).toMatchSnapshot();
  });

  test("Matches the snapshot with gender being female", async () => {
    const newApplicant = {
      ...applicant,
      genderTxt: "Female"
    };

    const newPage = {
      ...page,
      applicant: newApplicant
    };

    const updatePayload = {
      userInfo: {
        birthdate: "04/04/04",
        address: {
          street_address: "123 addy",
          locality: "local",
          region: "British Columbia",
          postal_code: "v9n1d4"
        },
        gender: "F",
        given_name: "given",
        given_names: "givens",
        family_name: "fam",
        identity_assurance_level: 3
      },
      authorities: ["Authorized"]
    };
    const token = generateJWTToken(updatePayload);

    mock.onGet(API_REQUEST_JWT).reply(200, token);

    const { asFragment } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={newPage} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Matches the snapshot with valid region/province", async () => {
    const updatePayload = {
      userInfo: {
        birthdate: "04/04/04",
        address: {
          street_address: "123 addy",
          locality: "local",
          region: "BC",
          postal_code: "v9n1d4"
        },
        gender: "F",
        given_name: "given",
        given_names: "givens",
        family_name: "fam",
        identity_assurance_level: 3
      },
      authorities: ["Authorized"]
    };
    const token = generateJWTToken(updatePayload);

    mock.onGet(API_REQUEST_JWT).reply(200, token);

    const { asFragment } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("After successful login call, if unauthorized, then redirects to error page", async () => {
    mock.onGet(API_REQUEST_JWT).reply(200, "token");

    render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    await wait(() => {
      expect(setError).toBeCalledTimes(1);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
  });

  test("Handle error cases effectively", async () => {
    mock.onGet(API_REQUEST_PROVINCES).reply(400, {
      message: "This is the error message"
    });

    render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    await wait(() => {
      expect(setError).toBeCalledTimes(2);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");

    mock.onGet(API_REQUEST_PROVINCES).reply(400);

    render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    await wait(() => {
      expect(setError).toBeCalledTimes(2); // it is not called again
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
  });

  test("With no org, redirects to error page", async () => {
    sessionStorage.removeItem("org");

    render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    expect(mockHistoryPush).toHaveBeenCalledWith("/criminalrecordcheck/error");
  });

  test("Displays Organization Facility when Schedule D Org", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

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

    expect(queryByText(container, "Organization Facility")).toBeNull();
  });

  test("Displays Additional Aliases", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </MemoryRouter>
    );

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

    expect(mockHistoryPush).toHaveBeenCalledWith(
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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </MemoryRouter>
    );

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

    expect(mockHistoryPush).toHaveBeenCalledWith(
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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </MemoryRouter>
    );

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

    expect(mockHistoryPush).toHaveBeenCalledWith(
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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Continue"));

    expect(
      getByText(container, "Position/job title is required")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "Position/Job Title"), {
      target: { value: "Painter" }
    });

    expect(queryByText(container, "Position/job title is required")).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    expect(mockHistoryPush).toHaveBeenCalledWith(
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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </MemoryRouter>
    );

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

    expect(mockHistoryPush).toHaveBeenCalledWith(
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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: completeApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText(container, "Continue"));

    expect(getByText(container, "City is required")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(container, "City"), {
      target: { value: "Nowhere" }
    });

    expect(queryByText(container, "City is required")).toBeNull();

    fireEvent.click(getByText(container, "Continue"));

    await wait(() => {});

    expect(queryByText(container, "City is required")).toBeNull();
  });

  test("Changing mailing address works when selecting yes for same address", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, sameAddress: false }} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId(container, "sameAddress"));

    await wait(() => {});

    expect(setSameAddress).toHaveBeenCalledWith(true);
  });

  test("Changing mailing address works when selecting no for same address", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId(container, "differentAddress"));

    await wait(() => {});

    expect(setSameAddress).toHaveBeenCalledWith(false);
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

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: completeApplicant }} />
      </MemoryRouter>
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

    await wait(() => {});

    expect(getByDisplayValue(container, "Ontario")).toBeInTheDocument();
  });

  test("Redirect to Home occurs when confirm is selected as Yes", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    window.confirm = () => true;

    await wait(() => {});

    expect(
      getByText(container, "Criminal Record Check - Application")
    ).toBeInTheDocument();

    fireEvent.click(getByText(container, "Cancel"));

    expect(mockHistoryPush).toHaveBeenCalledWith("/");
    expect(sessionStorage.getItem("jwt")).toBeFalsy();
  });

  test("Redirect to Home does not occur when confirm is selected as No", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    window.confirm = () => false;

    await wait(() => {});

    expect(
      getByText(container, "Criminal Record Check - Application")
    ).toBeInTheDocument();

    fireEvent.click(getByText(container, "Cancel"));

    expect(sessionStorage.getItem("jwt")).toBeTruthy();
  });

  test("Redirects to transition page when identity assurance level is less than 3", async () => {
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
        identity_assurance_level: 2
      },
      authorities: ["Authorized"]
    };
    const token = generateJWTToken(newPayload);

    mock.onGet(API_REQUEST_JWT).reply(200, token);

    render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );

    await wait(() => {});

    expect(mockHistoryPush).toHaveBeenCalledWith(
      "/criminalrecordcheck/transition"
    );
  });

  test("Screen is scrolled if birth location field is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      birthPlace: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "City and country of birth are required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if birth location field is missing a country", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      birthPlace: "Victoria"
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "City and country of birth are required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if phone number field is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      phoneNumber: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Primary phone number is required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if phone number field is incorrectly formatted", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      phoneNumber: "12345678901234567890"
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Phone number must be in the form XXX XXX-XXXX")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if email address field is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      emailAddress: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Personal email address is required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if email address field is incorrectly formatted", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      emailAddress: "bob@ross"
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Email address must be in the form name@company.ca")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if job title field is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      jobTitle: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Position/job title is required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if organization facility field is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicant,
      organizationFacility: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm page={{ ...page, applicant: incompleteApplicant }} />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Organization facility is required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if mailling address is different and mailing street is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicantWithMailingAddress,
      mailingLine1: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: incompleteApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Street or PO box is required")
    ).toBeInTheDocument();
  });

  test("Screen is scrolled if mailling address is different and mailing city is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicantWithMailingAddress,
      mailingCityNm: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: incompleteApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(getByText(container, "City is required")).toBeInTheDocument();
  });

  test("Screen is scrolled if mailling address is different and mailing province is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicantWithMailingAddress,
      mailingProvinceNm: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: incompleteApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(getByText(container, "Province is required")).toBeInTheDocument();
  });

  test("Screen is scrolled if mailling address is different and mailing postal code is empty", async () => {
    const incompleteApplicant = {
      ...completeApplicantWithMailingAddress,
      mailingPostalCodeTxt: ""
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: incompleteApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(getByText(container, "Postal code is required")).toBeInTheDocument();
  });

  test("Screen is scrolled if mailling address is different and mailing postal code is incorrectly formatted", async () => {
    const incompleteApplicant = {
      ...completeApplicantWithMailingAddress,
      mailingPostalCodeTxt: "1234567890"
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/applicationform?code=code"]}>
        <ApplicationForm
          page={{ ...page, applicant: incompleteApplicant, sameAddress: false }}
        />
      </MemoryRouter>
    );

    window.scrollTo = jest.fn();

    fireEvent.click(getByText(container, "Continue"));

    expect(window.scrollTo).toBeCalledTimes(1);

    expect(
      getByText(container, "Postal code must be in the form V9V 9V9")
    ).toBeInTheDocument();
  });
});
