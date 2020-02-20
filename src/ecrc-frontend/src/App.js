import React, { useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
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
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/ecrc" />
          <Route exact path="/ecrc">
            <OrgValidation page={page} />
          </Route>
          <Route path="/ecrc/orgverification">
            <OrgVerification page={page} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
