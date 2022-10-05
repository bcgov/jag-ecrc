import React from "react";

import MenuItem from "./MenuItem";

export default {
  title: "MenuItem",
  component: MenuItem
};

const menuItem = {
  name: "Name",
  url: "http://www.url.com"
};

export function Default() {
  return <MenuItem menuItem={menuItem} />;
}
