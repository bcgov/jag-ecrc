/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { FaIdCard, FaQuestion } from "react-icons/fa";
import PropTypes from "prop-types";

import "./SideCards.css";
import SideCard from "../../base/sideCard/SideCard";
import { Button } from "../../base/button/Button";
import MenuItem from "../../base/menuItem/MenuItem";

export default function SideCards({ type, sideCardLinks }) {
  // ACCESS CODE SIDECARD
  const accessCode = {
    heading: "Need help with an access code?",
    content: [
      "Access code is specific to each organization. If you need help with the organization access code, please ",
      <b key="accesscode" className="block">
        contact your organization.
      </b>
    ],
    type: "bluegrey"
  };

  const bcservice = {
    heading: (
      <div className="row">
        <div className="round-icon-wrapper">
          <FaIdCard className="side-card-icon" />
        </div>
        <span className="sideCardTitle col-lg-9">
          Using the BC Services Card
        </span>
      </div>
    ),
    content: [
      <div className="side-card-text">
        If you have a BC Services Card, you must use it to log in to the online
        security verification page.
      </div>,
      <p>
        <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
          <div className="side-card-link">
            Learn more about the BC Services Card.
          </div>
        </a>
      </p>,
      <div className="side-card-text">
        Eligibility for a BC Services Card is the same as for the Medical
        Services Plan(MSP).
      </div>,
      <p>
        <a href="https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible">
          <div className="side-card-link">
            Learn more about BC Services Card eligibility.
          </div>
        </a>
      </p>
    ],
    type: "blue",
    isWide: true
  };

  // CONTACT INFORMATION SIDECARD
  const contact = {
    heading: "Contact the Criminal Records Review Program",
    content: [
      <div key="contactText" style={{ fontSize: "16px" }}>
        For questions about criminal record checks, contact the Criminal Records
        Review Program Monday to Friday, 8:30 a.m. - 4:30 p.m.
      </div>,
      <div key="contactInfo" style={{ paddingTop: "20px" }}>
        <div>
          <span className="contact-title">Fax: </span> 250 356-1889
        </div>
        <div>
          <span className="contact-title">Office: </span>
          Toll free - 1 855 587-0185 (press option 2)
        </div>
        <div>
          <span className="contact-title">Email: </span>
          <a
            key="criminalRecordsEmail"
            className="email"
            href="mailto:criminalrecords@gov.bc.ca"
          >
            criminalrecords@gov.bc.ca
          </a>
        </div>
      </div>
    ],
    type: "blue"
  };

  // CRIMINAL RECORD SIDECARD
  const crbutton = {
    label: "VISIT THE CRIMINAL RECORD REVIEW WEBSITE",
    buttonStyle: "btn btn-primary dark-button",
    buttonSize: "btn btn-md",
    type: "submit"
  };

  const criminalRecordButton = (
    <Button
      key="criminal-record-link"
      button={crbutton}
      onClick={() =>
        window.open(
          "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check"
        )
      }
    />
  );

  const criminalRecord = {
    heading: "Why do I need to apply and consent to a criminal record check?",
    content: ["Learn more about the process", criminalRecordButton],
    type: "blue"
  };

  const withoutBCServiceCard = {
    heading: (
      <div className="row">
        <div className="round-icon-wrapper">
          <FaQuestion className="side-card-icon" />
        </div>
        <span className="sideCardTitle col-lg-9">
          Applicants Without a BC Services Card with a photo
        </span>
      </div>
    ),
    content: [
      <div className="side-card-text">
        Applicants who do not have a BC Services Card must apply offline to
        complete a criminal record check.
      </div>,
      <div className="side-card-text">
        <br />
        Please <b>contact your organization</b> and request a criminal record
        form.
      </div>,
      <p>
        <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
          <div className="side-card-link">
            Learn more about how to apply for a criminal record check offline.
          </div>
        </a>
      </p>
    ],
    type: "blue",
    isWide: true
  };

  // PERSONAL INFORMATION
  const personalInformation = {
    heading: "Update your personal information",
    content: [
      "If you find an error in your personal information, please contact ",
      <a
        key="serviceBC"
        className="link"
        href="https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc"
      >
        Service BC
      </a>,
      " ,",
      <a
        key="icbc"
        className="link"
        href="https://www.icbc.com/Pages/default.aspx"
      >
        ICBC
      </a>,
      " or ",
      <a
        key="addressChangeBC"
        className="link"
        href="https://www.addresschange.gov.bc.ca/"
      >
        AddressChangeBC
      </a>,
      " to correct it."
    ],
    type: "blue"
  };

  const collectionNotice = {
    heading: "Collection Notice",
    content: [
      <div key="collectionNotice" style={{ fontSize: "12px" }}>
        The Security Programs Division will collect your personal information
        for the purpose of fulfilling the criminal record check requirements of
        the Criminal Records Review Act (CRRA) and in accordance with sections
        26(a) and (c) of the Freedom of Information and Protection of Privacy
        Act (FoIPPA) and section 6 of the CRRA . Additionally, SPD may collect
        personal information under section 26(e) of FoIPPA for the purpose of
        evaluating the Criminal Records Review Program and activities to better
        serve you. Should you have any questions about the collection, use, or
        disclosure of personal information, please contact the Criminal Records
        Review Program, Security Programs Division via mail to PO Box 9217 Stn
        Prov Govt Victoria, BC V8W 9J1; email to&nbsp;
        <a key="criminalRecordsEmail" href="mailto:criminalrecords@gov.bc.ca">
          criminalrecords@gov.bc.ca
        </a>
        &nbsp;or by telephone at 1- 855-587-0185 (option 2).
      </div>
    ],
    type: "notice",
    isWide: true
  };

  // USEFUL LINKS SIDECARD
  const links = sideCardLinks.map(sideCardLink => {
    return <MenuItem key={sideCardLink.name} menuItem={sideCardLink} />;
  });

  const usefulLinks = {
    heading: "Useful Links",
    content: [links],
    type: "blue"
  };

  return (
    <div>
      {type === "accesscode" && (
        <SideCard key="accesscode" sideCard={accessCode} />
      )}
      {type === "bcservice" && (
        <SideCard key="bcservices" sideCard={bcservice} />
      )}
      {type === "contactinformation" && (
        <SideCard key="contactinformation" sideCard={contact} />
      )}
      {type === "criminalrecord" && (
        <SideCard key="criminalrecord" sideCard={criminalRecord} />
      )}
      {type === "personalinformation" && (
        <SideCard key="personalinformation" sideCard={personalInformation} />
      )}
      {type === "collectionnotice" && (
        <SideCard key="collectionnotice" sideCard={collectionNotice} />
      )}
      {type === "usefullinks" && (
        <SideCard key="usefullink" sideCard={usefulLinks} />
      )}
      {type === "withoutBCServiceCard" && (
        <SideCard key="withoutBCServiceCard" sideCard={withoutBCServiceCard} />
      )}
    </div>
  );
}

SideCards.propTypes = {
  type: PropTypes.string.isRequired,
  sideCardLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

SideCards.defaultProps = {
  sideCardLinks: []
};
