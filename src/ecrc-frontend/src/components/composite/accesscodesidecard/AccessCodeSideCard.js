import React from "react";

import SideCard from "../../base/sideCard/SideCard";

export default function AccessCodeSideCard() {
  const accessCode = {
    heading: "Need help with an access code?",
    content: [
      "Access code is specific to each organization. If you need help with the organization access code, please ",
      <b>contact your organization.</b>
    ],
    type: "bluegrey"
  };

  return <SideCard sideCard={accessCode} />;
}
