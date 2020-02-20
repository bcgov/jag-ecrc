import React from "react";

import FullName from "./FullName";

export default {
  title: "FullName",
  component: FullName
};

const fullname = {
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

export const Default = () => <FullName title={null} fullname={fullname} />;
