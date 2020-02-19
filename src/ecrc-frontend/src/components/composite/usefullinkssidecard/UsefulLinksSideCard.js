import React from "react";
import PropTypes from "prop-types";

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

UsefulLinksSideCard.propTypes = {
  sideCardLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};
