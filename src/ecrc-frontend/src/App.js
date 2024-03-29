import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import OrgValidation from "./components/page/orgValidation/OrgValidation";
import OrgVerification from "./components/page/orgVerification/OrgVerification";
import ApplicationForm from "./components/page/applicationForm/ApplicationForm";
import Transition from "./components/page/transition/Transition";
import TOU from "./components/page/tou/TOU";
import Consent from "./components/page/consent/Consent";
import BcscRedirect from "./components/page/bcscRedirect/BcscRedirect";
import Success from "./components/page/success/Success";
import InformationReview from "./components/page/informationreview/InformationReview";
import Error from "./components/page/error/Error";

export default function App() {
  const [org, setOrg] = useState(
    JSON.parse(sessionStorage.getItem("org")) || {}
  );
  const [applicant, setApplicant] = useState(
    JSON.parse(sessionStorage.getItem("applicant")) || {}
  );
  const [applicationInfo, setApplicationInfo] = useState(
    JSON.parse(sessionStorage.getItem("applicationInfo")) || {}
  );

  const [error, setError] = useState({});
  const [share, setShare] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [sameAddress, setSameAddress] = useState(true);

  const saveOrg = (orgInfo = org) => {
    sessionStorage.setItem("org", JSON.stringify(orgInfo));
  };

  const saveApplicant = (applicantInfo = applicant) => {
    sessionStorage.setItem("applicant", JSON.stringify(applicantInfo));
  };

  const saveApplicationInfo = (appInfo = applicationInfo) => {
    sessionStorage.setItem("applicationInfo", JSON.stringify(appInfo));
  };

  const header = {
    name: "Criminal Record Check"
  };

  return (
    <div>
      <Switch>
        <Redirect exact from="/" to="/criminalrecordcheck" />
        <Route exact path="/criminalrecordcheck">
          <OrgValidation page={{ header, setOrg, setError }} />
        </Route>
        <Route path="/criminalrecordcheck/orgverification">
          <OrgVerification page={{ header, org, setError }} />
        </Route>
        <Route path="/criminalrecordcheck/applicationform">
          <ApplicationForm
            page={{
              header,
              org,
              applicant,
              setApplicant,
              setError,
              provinces,
              setProvinces,
              sameAddress,
              setSameAddress
            }}
          />
        </Route>
        <Route path="/criminalrecordcheck/transition">
          <Transition page={{ header, transitionReason: "bcsc" }} />
        </Route>
        <Route path="/criminalrecordcheck/termsofuse">
          <TOU page={{ header, setError }} />
        </Route>
        <Route path="/criminalrecordcheck/bcscredirect">
          <BcscRedirect page={{ header, saveOrg, setError }} />
        </Route>
        <Route path="/criminalrecordcheck/success">
          <Success
            page={{
              header,
              applicant,
              org,
              applicationInfo,
              share,
              saveApplicationInfo,
              setError
            }}
          />
        </Route>
        <Route path="/criminalrecordcheck/informationreview">
          <InformationReview
            page={{
              header,
              applicant,
              org,
              setApplicationInfo,
              setError,
              setShare
            }}
          />
        </Route>
        <Route path="/criminalrecordcheck/consent">
          <Consent
            page={{
              header,
              applicant,
              org,
              applicationInfo,
              setApplicationInfo,
              saveOrg,
              saveApplicant,
              saveApplicationInfo,
              setError,
              share
            }}
          />
        </Route>
        <Route path="/criminalrecordcheck/error">
          <Error page={{ header, error }} />
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
    </div>
  );
}
