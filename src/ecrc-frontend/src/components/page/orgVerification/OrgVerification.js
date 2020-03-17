import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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

export default function OrgVerification({ page: { header, org } }) {
  const [toHome, setToHome] = useState(false);
  const [toTOU, setToTOU] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthenticated() || !org.orgNm) {
      setToHome(true);
    }

    window.scrollTo(0, 0);
  }, [org.orgNm]);

  const orgVerified = () => {
    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const newPayload = {
      ...currentPayload,
      actionsPerformed: ["orgVerification"]
    };
    generateJWTToken(newPayload);
    setToTOU(true);
  };

  const back = () => {
    setToHome(true);
  };

  const links = [
    {
      name: "I'm an employee or volunteer",
      url: "/tbd"
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
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const cancelButton = {
    label: "Cancel",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn btn-sm",
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
    header:
      "Role of Applicant (Employee or Volunteer) and working category (e.g. working with children)",
    tableElements: organizationTypeElements
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  if (toTOU) {
    return <Redirect to="/criminalrecordcheck/termsofuse" />;
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
            organization. If it’s not, please contact the organization that has
            requested you to complete a criminal record check.
          </p>
          <Table table={organizationInfoTable} />
          <Table table={organizationTypeTable} />
          <div>
            <p>
              To continue with your online request for a criminal record check:
            </p>
            <ul>
              <li>
                Only BC Services cards with a photo are accepted at this time.
              </li>
              <li>
                If you do not already have a BC Service Card Account, you can
                initiate the process at the
                <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card">
                  BC Service Card website
                </a>
                .
              </li>
              <li>
                If you are not eligible for a BC Services Card, or have a card
                without a photo, an alternative online option may be available
                for you.
              </li>
              <li>
                Employee applications must pay a fee by credit card (Visa,
                MasterCard, or AMEX).
              </li>
              <li>There is no fee for Volunteer applications.</li>
            </ul>
            <p>The organization noted above will be notified:</p>
            <ol className="contactList">
              <li>
                When you are cleared to work with children and/or vulnerable
                adults.
              </li>
            </ol>
            <ol className="contactList">
              <li>
                If you have an outstanding charge or conviction relating to a
                relevant or specified offence; and
              </li>
              <li>
                a determination of risk or no risk has been made by the Deputy
                Registrar.
              </li>
            </ol>
            <p>
              By selecting continue, you are consenting to have your information
              released to this organization.
            </p>
          </div>
          <div className="buttons">
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
    }).isRequired
  }).isRequired
};
