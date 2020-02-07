import React from "react";

import "./Menu.css";
import "../../base/menuItem/MenuItem";
import MenuItem from "../../base/menuItem/MenuItem";

export default function Menu(props) {
  const menuList = props.menuItems
    ? props.menuItems.map((menuItem, index) => {
        return <MenuItem key={index} url={menuItem.url} name={menuItem.name} />;
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
          <ul className="navbar-nav flex-column">{menuList}</ul>
        </div>
      </nav>
    </div>
  );
}
