import React from "react";

import SideCards from "./SideCards";

export default {
  title: "SideCards",
  component: SideCards
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

export const AccessCode = () => <SideCards type={"accesscode"} />;
export const BcService = () => <SideCards type={"bcservice"} />;
export const ContactInformation = () => (
  <SideCards type={"contactinformation"} />
);
export const CriminalRecord = () => <SideCards type={"criminalrecord"} />;
export const UsefulLinks = () => (
  <SideCards type={"usefullinks"} sideCardLinks={links} />
);
