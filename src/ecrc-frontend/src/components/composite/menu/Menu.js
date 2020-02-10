import React from "react";
import PropTypes from "prop-types";

import "./Menu.css";
import MenuItem from "../../base/menuItem/MenuItem";

export default function Menu({ menuItems }) {
  // If menuItems are provided, create an array of MenuItems, else default to empty array
  const menuList = menuItems
    ? menuItems.map((menuItem, index) => {
        return (
          <MenuItem
            key={menuItem.name}
            url={menuItem.url}
            name={menuItem.name}
          />
        );
      })
    : [];

  return (
    <div className="col-sm-3 col-md-3">
      <nav className="navbar navbar-expand-md navbar-light" role="navigation">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#leftNav"
          aria-controls="leftNav"
          aria-expanded="false"
          aria-label="Toggle left navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="leftNav" className="collapse navbar-collapse">
          <ul className="menuList navbar-nav flex-column">{menuList}</ul>
        </div>
      </nav>
    </div>
  );
}

Menu.propTypes = {
  menuItems: PropTypes.array
};
