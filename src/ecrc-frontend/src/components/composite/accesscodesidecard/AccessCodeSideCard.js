import React from "react";

import "./AccessCodeSideCard.css";
import SideCard from "../../base/sideCard/SideCard";

export default function AccessCodeSideCard() {
  const accessCode = {
    heading: "Need help with an access code?",
    content: [
      "Access code is specific to each organization. If you need help with the organization access code, please ",
      <b className="block">contact your organization.</b>
    ],
    type: "bluegrey"
  };

  return <SideCard key="access-code" sideCard={accessCode} />;
}
