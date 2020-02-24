import React, { useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import OrgValidation from "./components/page/orgValidation/OrgValidation";
import OrgVerification from "./components/page/orgVerification/OrgVerification";
<<<<<<< refs/remotes/origin/master
import ApplicationForm from "./components/page/applicationForm/ApplicationForm";
=======
<<<<<<< refs/remotes/origin/master
>>>>>>> update
import Transition from "./components/page/transition/Transition";
=======
import Consent from "./components/page/consent/Consent";
>>>>>>> update

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
<<<<<<< refs/remotes/origin/master
          <Route path="/ecrc/applicationform">
            <ApplicationForm page={page} />
          </Route>
=======
<<<<<<< refs/remotes/origin/master
>>>>>>> update
          <Route path="/ecrc/transition">
            <Transition header={header} />
=======
          <Route path="/ecrc/consent">
            <Consent page={page} />
>>>>>>> update
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
