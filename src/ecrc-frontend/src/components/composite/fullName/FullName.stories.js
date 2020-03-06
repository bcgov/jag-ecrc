import React from "react";

import FullName from "./FullName";

export default {
  title: "FullName",
  component: FullName
};

const fullname = {
  legalFirstNm: {
    label: "First Name",
    id: "firstName",
    value: "First",
    textInputStyle: "textinput_non_editable_gray"
  },
  legalSecondNm: {
    label: "Middle Name",
    id: "middleName",
    value: "Middle",
    textInputStyle: "textinput_non_editable_gray"
  },
  legalSurnameNm: {
    label: "Last Name",
    id: "lastName",
    value: "Last",
    textInputStyle: "textinput_non_editable_gray"
  }
};

export const Default = () => <FullName title={null} fullname={fullname} />;
