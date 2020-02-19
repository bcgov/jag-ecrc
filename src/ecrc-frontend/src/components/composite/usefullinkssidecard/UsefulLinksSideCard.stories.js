import React from "react";

import UsefulLinksSideCard from "./UsefulLinksSideCard";

export default {
  title: "UsefulLinksSideCard",
  component: UsefulLinksSideCard
};

const links = [
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

export const Default = () => <UsefulLinksSideCard sideCardLinks={links} />;
