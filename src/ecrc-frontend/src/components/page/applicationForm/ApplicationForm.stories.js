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
  firstName: {
    label: "First Name",
    id: "firstName",
    value: "First",
    textInputStyle: "textinput_non_editable_gray"
  },
  middleName: {
    label: "Middle Name",
    id: "middleName",
    value: "Middle",
    textInputStyle: "textinput_non_editable_gray"
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    value: "Last",
    textInputStyle: "textinput_non_editable_gray"
  }
};

const page = {
  header,
  applicant
};

export const Default = () => <ApplicationForm page={page} />;
