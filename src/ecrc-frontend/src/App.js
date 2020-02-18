import React, { useState } from "react";
import OrgValidation from "./components/page/orgvalidation/OrgValidation";
import OrgVerification from "./components/page/orgverification/OrgVerification";

export default function App() {
  const [org, setOrg] = useState({});

  const header = {
    name: "Criminal Record Check"
  };

  const sideCard1 = {
    heading: "Need help with an access code?",
    content:
      "Access code is specific to each organization. If you need help with the organization access code, please contact your organization.",
    type: "bluegrey"
  };

  const sideCard2 = {
    heading: "Why do I need to apply and consent to a criminal record check?",
    content: "Learn more about the process",
    type: "blue",
    image: "/images/visit-criminal-record-site.PNG",
    imageLink:
      "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check"
  };

  const pageLayout = {
    header,
    sideCard1,
    sideCard2
  };

  const page = {
    org,
    setOrg,
    pageLayout
  };

  return (
    <div>
      {!org.orgNm && <OrgValidation page={page} />}
      {org.orgNm && <OrgVerification page={page} />}
    </div>
  );
}
