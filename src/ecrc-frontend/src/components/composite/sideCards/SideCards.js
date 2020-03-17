/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import {
  FaIdCard,
  FaQuestion,
  FaEnvelope,
  FaFax,
  FaPhone
} from "react-icons/fa";
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

  // GET BC SERVICE SIDECARD
  const bcscbutton = {
    label: "READ MORE",
    buttonStyle: "btn btn-primary dark-button",
    buttonSize: "btn btn-md",
    type: "submit"
  };

  const getBCServiceButton = (
    <Button
      key="criminal-record-link"
      button={bcscbutton}
      onClick={() =>
        window.open(
          "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card"
        )
      }
    />
  );

  const getBCService = {
    heading: (
      <div className="row">
        <div key="bcServiceIcon" className="round-icon-wrapper">
          <FaIdCard className="side-card-icon" />
        </div>
        <div key="bcServiceHeader" className="sideCardTitle">
          Get a BC Service Card
        </div>
      </div>
    ),
    content: [
      "B.C. residents who have lived in the province for at least six months must use a BC Services Card to submit an online Criminal Record Check. Learn how to get a card.",
      <div className="getServiceButton">{getBCServiceButton}</div>
    ],
    type: "blue"
  };

  const bcservice = {
    heading: (
      <div className="row">
        <div key="bcServiceIcon" className="round-icon-wrapper">
          <FaIdCard className="side-card-icon" />
        </div>
        <div key="bcServiceHeader" className="sideCardTitle">
          Using the BC Services Card
        </div>
      </div>
    ),
    content: [
      <div key="bcscTop" className="side-card-text">
        If you have a BC Services Card, you must use it to log in to the online
        security verification page.
      </div>,
      <div key="bcscLearnMore">
        <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
          <div className="side-card-link">
            Learn more about the BC Services Card.
          </div>
        </a>
      </div>,
      <div key="bcscEligibility" className="side-card-text">
        <br />
        Eligibility for a BC Services Card is the same as for the Medical
        Services Plan(MSP).
      </div>,
      <div key="bcscEligibilityLink">
        <a href="https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible">
          <div className="side-card-link">
            Learn more about BC Services Card eligibility.
          </div>
        </a>
      </div>
    ],
    type: "blue",
    isWide: true
  };

  // CONTACT INFORMATION SIDECARD
  const contact = {
    heading: (
      <div className="row">
        <div key="contactIcon" className="round-icon-wrapper">
          <FaEnvelope className="side-card-icon" />
        </div>
        <div key="contactHeader" className="sideCardTitle">
          Contact the Criminal Records Review Program
        </div>
      </div>
    ),
    content: [
      <div key="contactText" className="side-card-text">
        For questions about criminal record checks, contact the Criminal Records
        Review Program Monday to Friday, 8:30 a.m. - 4:30 p.m.
      </div>,
      <div key="contactInfo" className="side-card-text">
        <br />
        <div>
          <FaFax />
          &nbsp;<div className="contact-title">Fax: </div>
          (250)356-1889
        </div>
        <div>
          <FaPhone />
          &nbsp;<div className="contact-title">Office: </div>
          Toll free - 1 855 587-0185 (press option 2)
        </div>
        <div>
          <FaEnvelope /> &nbsp;
          <div className="contact-title">Email: </div>
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
    type: "blue",
    isWide: true
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
        <div key="withoutBCServiceCardIcon" className="round-icon-wrapper">
          <FaQuestion className="side-card-icon" />
        </div>
        <div key="withoutBCServiceCardHeader" className="sideCardTitle">
          Applicants Without a BC Services Card with a photo
        </div>
      </div>
    ),
    content: [
      <div key="withoutBCSCTop" className="side-card-text">
        Applicants who do not have a BC Services Card must apply offline to
        complete a criminal record check.
      </div>,
      <div key="withoutBCSCMid" className="side-card-text">
        <br />
        Please <b>contact your organization</b> and request a criminal record
        form.
      </div>,
      <div key="withoutBCSCBottom">
        <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
          <div className="side-card-link">
            Learn more about how to apply for a criminal record check offline.
          </div>
        </a>
      </div>
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
      {type === "getbcservice" && (
        <SideCard key="getbcservice" sideCard={getBCService} />
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
