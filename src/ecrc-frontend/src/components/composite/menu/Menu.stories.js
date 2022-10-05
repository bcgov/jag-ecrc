import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
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

export function Empty() {
  return <Menu />;
}

export function Default() {
  return <Menu menuItems={menuItems} />;
}

export function Mobile() {
  return <Menu menuItems={menuItems} />;
}

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
