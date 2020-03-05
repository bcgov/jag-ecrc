import React from "react";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import ApplicationForm from "./ApplicationForm";

describe("ApplicationForm Component", () => {
  test("Matches the snapshot", () => {
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

    const applicationPage = create(
      <MemoryRouter>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    expect(applicationPage.toJSON()).toMatchSnapshot();
  });
});
