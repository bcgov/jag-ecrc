import React, { useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import OrgValidation from "./components/page/orgValidation/OrgValidation";
import OrgVerification from "./components/page/orgVerification/OrgVerification";
import ApplicationForm from "./components/page/applicationForm/ApplicationForm";
import Transition from "./components/page/transition/Transition";
import TOU from "./components/page/tou/TOU";
import Consent from "./components/page/consent/Consent";
import BcscRedirect from "./components/page/bcscRedirect/BcscRedirect";
import Success from "./components/page/success/Success";
import InformationReview from "./components/page/informationreview/InformationReview";
import UserConfirmation from "./components/page/userConfirmation/UserConfirmation";

export default function App() {
  const [org, setOrg] = useState(
    JSON.parse(sessionStorage.getItem("org")) || {}
  );
  const [applicant, setApplicant] = useState(
    JSON.parse(sessionStorage.getItem("applicant")) || {}
  );

  const header = {
    name: "Criminal Record Check"
  };

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/ecrc" />
          <Route exact path="/ecrc">
            <OrgValidation page={{ header, setOrg }} />
          </Route>
          <Route path="/ecrc/orgverification">
            <OrgVerification page={{ header, org }} />
          </Route>
          <Route path="/ecrc/applicationform">
            <ApplicationForm page={{ header, org, applicant, setApplicant }} />
          </Route>
          <Route path="/ecrc/transition">
            <Transition header={header} />
          </Route>
          <Route path="/ecrc/termsofuse">
            <TOU page={{ header }} />
          </Route>
          <Route path="/ecrc/consent">
            <Consent page={{ header }} />
          </Route>
          <Route path="/ecrc/bcscRedirect">
            <BcscRedirect page={{ header }} />
          </Route>
          <Route path="/ecrc/success">
            <Success page={{ header }} />
          </Route>
          <Route path="/ecrc/informationreview">
            <InformationReview page={{ header, applicant }} />
          </Route>
          <Route path="/ecrc/userconfirmation">
            <UserConfirmation header={header} />
          </Route>
          <Route
            path="/hosthome"
            component={() => {
              window.location.href =
                "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check";
              return null;
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
