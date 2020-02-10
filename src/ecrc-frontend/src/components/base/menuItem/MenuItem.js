import React from "react";
import PropTypes from "prop-types";

import "./MenuItem.css";

export default function MenuItem({ name, url }) {
  return (
    <li className="menuItem">
      <a href={url}>{name}</a>
    </li>
  );
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
