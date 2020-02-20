import React from "react";

import ApplicationForm from "./ApplicationForm";

export default {
  title: "ApplicationForm",
  component: ApplicationForm
};

const header = {
  name: "Criminal Record Check"
};

const applicant = {
  firstName: "First",
  middleName: "Middle",
  lastName: "Last",
  birthPlace: "",
  birthDate: "1982-12-12",
  sex: "Apache Attack Helicopter",
  bcDLNumber: "",
  phoneNumber: "",
  emailAddress: "",
  street: "123 Somewhere",
  city: "Here",
  province: "British Columbia",
  postalCode: {
    label: "V9V 9V9",
    country: "Canada"
  },
  applicantPosition: {
    label: "Applicant's position/Job Title",
    id: "applicantPosition"
  },
  organizationFacility: {
    label: "Organization Facility",
    id: "organizationFacility",
    note:
      "(Licenced Child Care Name, Adult Care Facility Name, or Contracted Company Name)"
  }
};

const page = {
  header,
  applicant
};

export const Default = () => <ApplicationForm page={page} />;
