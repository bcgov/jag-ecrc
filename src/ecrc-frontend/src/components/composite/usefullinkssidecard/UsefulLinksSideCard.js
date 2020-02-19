import React from "react";
import SideCard from "../../base/sideCard/SideCard";

export default function UsefulLinksSideCard({ sideCardLinks }) {
  const links = sideCardLinks.map(link => {
    return <MenuItem menuItem={link} />;
  });
  return <SideCard />;
}
