import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from "../simpleForm/SimpleForm";

export default function FullName({
  title,
  fullname: { legalFirstNm, legalSecondNm, legalSurnameNm }
}) {
  const name = {
    title,
    textInputs: [legalFirstNm, legalSecondNm, legalSurnameNm],
    buttons: []
  };

  return <SimpleForm simpleForm={name} />;
}

FullName.propTypes = {
  title: PropTypes.string,
  fullname: PropTypes.shape({
    legalFirstNm: PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string,
      textInputStyle: PropTypes.string
    }),
    legalSecondNm: PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string,
      textInputStyle: PropTypes.string
    }),
    legalSurnameNm: PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string,
      textInputStyle: PropTypes.string
    })
  })
};

FullName.defaultProps = {
  title: "",
  fullname: {
    firstName: {
      value: "",
      textInputStyle: ""
    },
    middleName: {
      value: "",
      textInputStyle: ""
    },
    lastName: {
      value: "",
      textInputStyle: ""
    }
  }
};
