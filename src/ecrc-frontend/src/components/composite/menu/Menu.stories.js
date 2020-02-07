import React from "react";

import Menu from "./Menu";

export default {
  title: "Menu",
  component: Menu
};

const menuItems = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Somewhere",
    url: "/somewhere"
  },
  {
    name: "Somewhere else",
    url: "/somewhereelse"
  },
  {
    name: "Somewhere with a long name for no reason",
    url: "/here"
  }
];

export const Empty = () => <Menu />;

export const Default = () => <Menu menuItems={menuItems} />;
