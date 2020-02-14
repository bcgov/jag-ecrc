import React from "react";

import "./TableElement.css";

export default function TableElement({ element: { name, value } }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}
