import React from "react";

import "./MenuItem.css";

export default function MenuItem(props) {
  return (
    <li className="menuItem">
      <a href={props.url}>{props.name}</a>
    </li>
  );
}
