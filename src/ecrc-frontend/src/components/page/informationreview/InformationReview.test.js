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
      firstName: "Robert",
      middleName: "Norman",
      lastName: "Ross",
      birthPlace: "Daytona Beach, Florida",
      birthDate: "1942-10-29",
      sex: "Male",
      driversLicNo: "1234567",
      phoneNumber: "2501234567",
      emailAddress: "bob.ross@example.com",
      street: "123 Somewhere",
      city: "Here",
      province: "British Columbia",
      postalCode: "V9V 9V9",
      country: "Canada",
      jobTitle: "Painter",
      organizationFacility: ""
    };

    const page = {
      header,
      applicant
    };

    const infoReview = create(
      <MemoryRouter>
        <InformationReview page={page} />
      </MemoryRouter>
    );
    expect(infoReview.toJSON()).toMatchSnapshot();
  });
});
