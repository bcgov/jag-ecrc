import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import InformationReview from "./InformationReview";

describe("InformationReview Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const applicant = {
      legalFirstNm: "Robert",
      legalSecondNm: "Norman",
      legalSurnameNm: "Ross",
      birthPlace: "Daytona Beach, Florida",
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
      organizationFacility: ""
    };

    const org = {
      orgApplicantRelationship: "EMPLOYEE",
      orgTicketNumber: "crce",
      defaultScheduleTypeCd: "WBSD",
      defaultCrcScopeLevelCd: "WWCH"
    };

    const setApplicationInfo = () => {};
    const saveApplicant = () => {};
    const saveOrg = () => {};
    const saveApplicationInfo = () => {};

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
});
