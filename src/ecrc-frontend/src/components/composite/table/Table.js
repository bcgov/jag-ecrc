import React from "react";
import PropTypes from "prop-types";

import "./Table.css";
import TableElement from "../../base/tableElement/TableElement";

export default function Table({ table: { header, tableElements } }) {
  const tableComponents = tableElements.map(element => {
    return <TableElement key={element.name} element={element} />;
  });

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">{header}</th>
        </tr>
      </thead>
      <tbody>{tableComponents}</tbody>
    </table>
  );
}

Table.propTypes = {
  table: PropTypes.shape({
    header: PropTypes.string.isRequired,
    tableElements: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired
};
