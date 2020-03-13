import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";
import * as axios from "axios";

import InformationReview from "./InformationReview";

// Mock axios
jest.mock("axios");

describe("InformationReview Component", () => {
  const header = {
    name: "Criminal Record Check"
  };

  const applicant = {
    legalFirstNm: "Robert",
    legalSecondNm: "Norman",
    legalSurnameNm: "Ross",
    birthPlace: "Daytona Beach, Florida",
    alias1FirstNm: "Robert",
    alias1SecondNm: "Norman",
    alias1SurnameNm: "Ross",
    alias2FirstNm: "Robert",
    alias2SecondNm: "Norman",
    alias2SurnameNm: "Ross",
    alias3FirstNm: "Robert",
    alias3SecondNm: "Norman",
    alias3SurnameNm: "Ross",
    birthDt: "1942-10-29",
    genderTxt: "Male",
    driversLicNo: "1234567",
    phoneNumber: "2501234567",
    emailAddress: "bob.ross@example.com",
    addressLine1: "123 Somewhere",
    cityNm: "Here",
    provinceNm: "British Columbia",
    postalCodeTxt: "V9V 9V9",
    countryNm: "Canada",
    jobTitle: "Painter",
    organizationFacility: "Something"
  };

  const org = {
    orgApplicantRelationship: "EMPLOYEE",
    orgTicketNumber: "crce",
    defaultScheduleTypeCd: "WBSD",
    defaultCrcScopeLevelCd: "WWCH"
  };

  const setApplicationInfo = jest.fn();
  const saveApplicant = jest.fn();
  const saveOrg = jest.fn();
  const saveApplicationInfo = jest.fn();

  // Mocking UseState
  const setState = jest.fn();

  // Mock Window object
  window.scrollTo = jest.fn();
  let mockWindow = jest.fn();

  // Mocking UseEffect
  const useEffect = jest.spyOn(React, "useEffect");

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const prepareMocks = () => {
    delete window.location;
    window.location = { assign: mockWindow };

    const useStateMock = initState => [initState, setState];

    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          sessionId: "123",
          invoiceId: "123",
          serviceFeeAmount: "123"
        }
      })
    );

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          partyId: "123",
          serviceId: "123",
          urlResponse: "http://sample.com"
        }
      })
    );
  };

  const clearMocks = () => {
    mockWindow.mockClear();
    jest.clearAllMocks();
  };

  test("Matches the snapshot", () => {
    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };
    const infoReview = create(
      <MemoryRouter>
        <InformationReview page={page} />
      </MemoryRouter>
    );
    expect(infoReview.toJSON()).toMatchSnapshot();
  });

  test("Validate checkbox", () => {
    prepareMocks();
    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };

    // Call UseEffect
    mockUseEffect();

    const infoReview = shallow(<InformationReview page={page} />);

    expect(setState).toHaveBeenCalledTimes(0);

    infoReview
      .find("input")
      .at(0)
      .props()
      .onClick();
    expect(setState).toHaveBeenCalledTimes(1);

    clearMocks();
  });

  test("Validate Back button", () => {
    prepareMocks();
    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };
    const infoReview = shallow(<InformationReview page={page} />);

    expect(setState).toHaveBeenCalledTimes(0);

    infoReview
      .find("Button")
      .at(0)
      .props()
      .onClick();

    expect(setState).toHaveBeenCalledTimes(1);

    clearMocks();
  });

  test("Validate Employee relationship flow", () => {
    prepareMocks();
    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };

    const infoReview = shallow(<InformationReview page={page} />);

    expect(setApplicationInfo).toHaveBeenCalledTimes(0);
    expect(saveApplicant).toHaveBeenCalledTimes(0);
    expect(saveOrg).toHaveBeenCalledTimes(0);
    expect(saveApplicationInfo).toHaveBeenCalledTimes(0);

    infoReview
      .find("Button")
      .at(1)
      .props()
      .onClick();

    clearMocks();
  });

  test("Verify Employee relationship flow", () => {
    expect(setState).toHaveBeenCalledTimes(0);
    expect(setApplicationInfo).toHaveBeenCalledTimes(1);
    expect(saveApplicant).toHaveBeenCalledTimes(1);
    expect(saveOrg).toHaveBeenCalledTimes(1);
    expect(saveApplicationInfo).toHaveBeenCalledTimes(1);
  });

  test("Validate Volunteer relationship flow", () => {
    prepareMocks();

    applicant.driversLicNo = "";
    applicant.alias1FirstNm = "";
    applicant.alias1SecondNm = "";
    applicant.alias1SurnameNm = "";
    applicant.alias2FirstNm = "";
    applicant.alias2SecondNm = "";
    applicant.alias2SurnameNm = "";
    applicant.alias3FirstNm = "";
    applicant.alias3SecondNm = "";
    applicant.alias3SurnameNm = "";

    applicant.organizationFacility = "";

    org.orgApplicantRelationship = "VOLUNTEER";

    const page = {
      header,
      applicant,
      org,
      setApplicationInfo,
      saveApplicant,
      saveOrg,
      saveApplicationInfo
    };

    const infoReview = shallow(<InformationReview page={page} />);

    expect(setState).toHaveBeenCalledTimes(0);

    infoReview
      .find("Button")
      .at(1)
      .props()
      .onClick();

    clearMocks();
  });

  test("Verify Volunteer relationship flow", () => {
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setApplicationInfo).toHaveBeenCalledTimes(1);
    expect(saveApplicant).toHaveBeenCalledTimes(0);
    expect(saveOrg).toHaveBeenCalledTimes(0);
    expect(saveApplicationInfo).toHaveBeenCalledTimes(0);
  });
});
