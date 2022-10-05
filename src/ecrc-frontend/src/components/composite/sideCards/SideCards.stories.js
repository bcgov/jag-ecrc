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

export function AccessCode() {
  return <SideCards type={"accesscode"} />;
}
export function GetBcService() {
  return <SideCards type={"getbcservice"} />;
}
export function BcService() {
  return <SideCards type={"bcservice"} />;
}
export function ContactInformation() {
  return <SideCards type={"contactinformation"} />;
}
export function CriminalRecord() {
  return <SideCards type={"criminalrecord"} />;
}
export function PersonalInformation() {
  return <SideCards type={"personalinformation"} />;
}
export function CollectionNotice() {
  return <SideCards type={"collectionnotice"} />;
}
export function UsefulLinks() {
  return <SideCards type={"usefullinks"} sideCardLinks={links} />;
}
export function WithoutBCServiceCard() {
  return <SideCards type={"withoutBCServiceCard"} />;
}
