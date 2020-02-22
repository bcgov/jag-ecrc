import React from "react";
import { create } from "react-test-renderer";

import ApplicationForm from "./ApplicationForm";
import { MemoryRouter } from "react-router-dom";

describe("ApplicationForm Component", () => {
  test("Matches the snapshot", () => {
    const header = {
      name: "Criminal Record Check"
    };

    const applicant = {
      firstName: "Robert",
      middleName: "Norman",
      lastName: "Ross",
      birthPlace: "",
      birthDate: "1942-10-29",
      sex: "Male",
      bcDLNumber: "",
      phoneNumber: "",
      emailAddress: "",
      street: "123 Somewhere",
      city: "Here",
      province: "British Columbia",
      postalCode: "V9V 9V9",
      country: "Canada",
      applicantPosition: "",
      organizationFacility: ""
    };

    const org = {
      schedule: "D"
    };

    const page = {
      header,
      applicant,
      org
    };

    const applicationPage = create(
      <MemoryRouter>
        <ApplicationForm page={page} />
      </MemoryRouter>
    );
    expect(applicationPage.toJSON()).toMatchSnapshot();
  });
});
