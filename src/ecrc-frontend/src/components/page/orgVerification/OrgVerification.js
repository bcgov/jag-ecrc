/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import "../page.css";
import "./OrgVerification.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import Table from "../../composite/table/Table";
import SideCards from "../../composite/sideCards/SideCards";
import {
  isAuthenticated,
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

export default function OrgVerification({ page: { header, org, setError } }) {
  const history = useHistory();
  const [toHome, setToHome] = useState(false);
  const [toError, setToError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthenticated() || !org.orgNm) {
      setError({
        status: 403
      });
      setToError(true);
    }

    window.scrollTo(0, 0);
  }, [org.orgNm, setError]);

  const orgVerified = () => {
    if (!isAuthenticated()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      setToError(true);
      return;
    }

    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const newPayload = {
      ...currentPayload,
      actionsPerformed: ["orgVerification"]
    };
    generateJWTToken(newPayload);
    history.push("/criminalrecordcheck/termsofuse");
  };

  const back = () => {
    setToHome(true);
  };

  const links = [
    {
      name: "I'm an employee or volunteer",
      url:
        "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/online-service-information"
    },
    {
      name: "Electronic Identity Verification (EIV)",
      url:
        "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/electronic-identity-verification-eiv"
    },
    {
      name: "Results and Reconsideration",
      url:
        "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/results-and-reconsiderations"
    }
  ];

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn mr-0",
    buttonSize: "btn",
    type: "submit"
  };

  const cancelButton = {
    label: "Cancel",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const organizationInfoElements = [
    { name: "Organization Name", value: org.orgNm },
    {
      name: "Address",
      value: `${org.addressLine1}\n${org.cityNm}\n${org.provinceNm}\n${org.postalCodeTxt}\n${org.countryNm}`
    },
    {
      name: "Phone Number",
      value: org.contactPhoneNo
    }
  ];

  const organizationInfoTable = {
    header: "Organization Information",
    tableElements: organizationInfoElements
  };

  let worksWith = "";

  if (org.defaultCrcScopeLevelCd === "WWCA") {
    worksWith = "Children & Vulnerable Adults";
  } else if (org.defaultCrcScopeLevelCd === "WWAD") {
    worksWith = "Vulnerable Adults";
  } else if (org.defaultCrcScopeLevelCd === "WWCH") {
    worksWith = "Children";
  }

  const organizationTypeElements = [
    { name: "Role", value: org.orgApplicantRelationship },
    { name: "Works with category", value: worksWith }
  ];

  const organizationTypeTable = {
    header: (
      <div>
        Role of Applicant&nbsp;
        <span className="smallTableHeader">(Employee or Volunteer)</span> and
        working category&nbsp;
        <span className="smallTableHeader">(e.g. working with children):</span>
      </div>
    ),
    tableElements: organizationTypeElements
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Organization Information</h1>
          <p>
            You have provided the access code of the organization that has
            requested you to complete a criminal record check. Below are the
            details of that organization. Please confirm that this is the
            organization. If it&apos;s not, please contact the organization that
            has requested you to complete a criminal record check.
          </p>
          <Table table={organizationInfoTable} />
          <br />
          <Table table={organizationTypeTable} />
          <br />
          <div>
            <p>
              To continue with your online request for a criminal record check,
              please note:
            </p>
            <ul className="eligibleList">
              <li>
                You are requested to login with your BC Services Card. Only
                cards with a photo are accepted at this point. If you do not
                already have a BC Services Card, you can initiate the process on
                the BC Services Card website.
              </li>
              <li>
                If you are not eligible for a BC Services Card, or have a card
                without a photo, an alternative online option may be available
                for you.
              </li>
              <li>
                Employee applicants must pay a fee by credit card (Visa,
                MasterCard, or AMEX). For volunteers completing a request for a
                criminal record check, no payment is required.
              </li>
            </ul>
            <br />
            <p>
              Once the criminal record check is carried out, the organization
              noted above will be notified of whether:
            </p>
            <ol className="contactList">
              <li>
                you have an outstanding charge or conviction relating to a
                relevant or specified offence; and
              </li>
              <li>
                a determination of risk or no risk of physical or sexual abuse
                to children and/or physical, sexual or financial abuse to
                vulnerable adults has been made by the Deputy Registrar.
              </li>
            </ol>
            <p>
              By selecting continue, you are consenting to have your information
              released to this organization.
            </p>
          </div>
          <div className="buttons pt-4">
            <Button button={cancelButton} onClick={back} />
            <Button button={continueButton} onClick={orgVerified} />
          </div>
        </div>
        <div className="sidecard">
          <SideCards type={"getbcservice"} />
          <SideCards type={"usefullinks"} sideCardLinks={links} />
          <SideCards type={"contactinformation"} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

OrgVerification.propTypes = {
  page: PropTypes.shape({
    org: PropTypes.object.isRequired,
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    setError: PropTypes.func.isRequired
  }).isRequired
};
