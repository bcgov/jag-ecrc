import React from "react";
import SideCard from "../../base/sideCard/SideCard";
import MenuItem from "../../base/menuItem/MenuItem";

export default function UsefulLinksSideCard({ sideCardLinks }) {
  const links = sideCardLinks.map(sideCardLink => {
    return <MenuItem key={sideCardLink.name} menuItem={sideCardLink} />;
  });

  const usefulLinks = {
    heading: "Useful Links",
    content: [links],
    type: "blue"
  };

  return <SideCard sideCard={usefulLinks} />;
}
