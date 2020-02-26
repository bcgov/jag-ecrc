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

const page = {
  header,
  applicant
};

export const Default = () => (
  <MemoryRouter>
    <InformationReview page={page} />
  </MemoryRouter>
);
