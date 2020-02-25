import React, { useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import OrgValidation from "./components/page/orgValidation/OrgValidation";
import OrgVerification from "./components/page/orgVerification/OrgVerification";
import ApplicationForm from "./components/page/applicationForm/ApplicationForm";
import Transition from "./components/page/transition/Transition";
import Consent from "./components/page/consent/Consent";

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
          <Route path="/ecrc/applicationform">
            <ApplicationForm page={page} />
          </Route>
          <Route path="/ecrc/transition">
            <Transition header={header} />
          </Route>
          <Route path="/ecrc/consent">
            <Consent page={page} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
