import React, { useState } from "react";
import OrgValidation from "./components/page/orgValidation/OrgValidation";
import OrgVerification from "./components/page/orgVerification/OrgVerification";

export default function App() {
  const [org, setOrg] = useState({});

  const header = {
    name: "Criminal Record Check"
  };

  const page = {
    org,
    setOrg,
    header
  };

  return (
    <div>
      {!org.orgNm && <OrgValidation page={page} />}
      {org.orgNm && <OrgVerification page={page} />}
    </div>
  );
}
