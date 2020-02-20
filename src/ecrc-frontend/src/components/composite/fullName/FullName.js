import React from "react";
import SimpleForm from "../simpleForm/SimpleForm";

export default function FullName({
  title,
  fullname: { firstName, middleName, lastName }
}) {
  const name = {
    title: title,
    textInputs: [firstName, middleName, lastName],
    buttons: []
  };

  return <SimpleForm simpleForm={name} />;
}
