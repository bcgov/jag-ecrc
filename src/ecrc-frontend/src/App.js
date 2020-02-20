import React, { useState } from "react";
import OrgValidation from "./components/page/orgvalidation/OrgValidation";
import OrgVerification from "./components/page/orgverification/OrgVerification";

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
