import React from "react";

import Header from "./Header";

export default {
  title: "Header",
  component: Header
};

const header = {
  name: "eCRC"
};

export const Default = () => <Header header={header} />;
