import React from "react";
import PropTypes from "prop-types";

import "./TableElement.css";

export default function TableElement({ element: { name, value } }) {
  return (
    <tr>
      <td> {name}</td>
      <td>{value}</td>
    </tr>
  );
}

TableElement.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired
};
