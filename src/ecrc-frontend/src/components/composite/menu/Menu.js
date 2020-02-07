import React from "react";

import "./Menu.css";
import "../../base/menuItem/MenuItem";
import MenuItem from "../../base/menuItem/MenuItem";

export default function Menu(props) {
  const menuList = props.menuItems
    ? props.menuItems.map(menuItem => {
        return <MenuItem url={menuItem.url} name={menuItem.name} />;
      })
    : [];

  return (
    <nav className="navbar-collapse collapse">
      <ul nav navbar-nav>
        {menuList}
      </ul>
    </nav>
  );
}
