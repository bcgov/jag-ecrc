import React from "react";
import PropTypes from "prop-types";

import "./Table.css";
import TableElement from "../../base/tableElement/TableElement";

export default function Table({
  table: { id, header, tableElements, tableStyle }
}) {
  const tableComponents = tableElements.map(element => {
    return <TableElement key={element.key || element.name} element={element} />;
  });

  return (
    <table id={id} className={tableStyle}>
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
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      }).isRequired
    ),
    tableStyle: PropTypes.string
  })
};

Table.defaultProps = {
  table: {
    tableStyle: ""
  }
};
