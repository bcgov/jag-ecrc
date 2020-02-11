import React from "react";
import PropTypes from "prop-types";

import "./MenuItem.css";

export default function MenuItem({ menuItem: { name, url } }) {
  return (
    <li className="menuItem">
      <a href={url}>{name}</a>
    </li>
  );
}

MenuItem.propTypes = {
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};
