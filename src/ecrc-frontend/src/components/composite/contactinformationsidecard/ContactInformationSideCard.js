import React from "react";
import SideCard from "../../base/sideCard/SideCard";

export default function ContactInformationSideCard() {
  const contact = {
    heading: "Contact Information",
    content:
      "Criminal Records Review Program staff are available Monday to Friday from 8:30 a.m. - 4:30 p.m.",
    type: "bluegrey"
  };

  return <SideCard sideCard={contact} />;
}
