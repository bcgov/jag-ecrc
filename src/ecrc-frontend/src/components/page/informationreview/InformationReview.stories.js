import React from "react";
import { MemoryRouter } from "react-router-dom";

import InformationReview from "./InformationReview";

export default {
  title: "InformationReview",
  component: InformationReview
};

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
  bcDLNumber: "",
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

export const NonScheduleD = () => (
  <MemoryRouter>
    <InformationReview page={page} />
  </MemoryRouter>
);

export const ScheduleD = () => (
  <MemoryRouter>
    <InformationReview
      page={{
        ...page,
        applicant: {
          ...applicant,
          organizationFacility: "PBS WIPB"
        }
      }}
    />
  </MemoryRouter>
);
