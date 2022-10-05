import React from "react";

import TableElement from "./TableElement";

export default {
  title: "TableElement",
  component: TableElement
};

const element = {
  name: "Example Name",
  value: "The name"
};

export function Default() {
  return <TableElement element={element} />;
}
