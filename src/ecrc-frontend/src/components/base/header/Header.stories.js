import React from "react";

import Header from "./Header";

export default {
  title: "Header",
  component: Header
};

const name = "eCRC";

export const Default = () => <Header name={name} />;
