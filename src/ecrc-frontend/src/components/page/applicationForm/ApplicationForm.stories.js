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
  postalCode: "V9V 9V9",
  country: "Canada",
  applicantPosition: "",
  organizationFacility: ""
};

const page = {
  header,
  applicant
};

export const Default = () => <ApplicationForm page={page} />;
