import React from "react";

import "./MenuItem.css";

export default function MenuItem({ name, url }) {
  return (
    <li className="menuItem">
      <a href={url || ""}>{name || ""}</a>
    </li>
  );
}
