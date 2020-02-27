/* eslint-disable react/jsx-curly-newline */
import React from "react";
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

  // BCSC SIDECARD
  const bcscbutton = {
    label: "READ MORE",
    buttonStyle: "btn btn-primary dark-button",
    buttonSize: "btn btn-md",
    type: "submit"
  };

  const bcservicesButton = (
    <Button
      key="bc-services-card-link"
      button={bcscbutton}
      onClick={() =>
        window.open(
          "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
        )
      }
    />
  );

  const bcservice = {
    heading: "Get a BC Services Card",
    content: [
      "B.C. residents who have lived in the province for at least six months must use a BC Services Card to log in to the online qualification tool. Learn how to get a card.",
      bcservicesButton
    ],
    type: "blue"
  };

  // CONTACT INFORMATION SIDECARD
  const contact = {
    heading: "Contact Information",
    content: [
      "Criminal Records Review Program staff are available Monday to Friday from 8:30 a.m. - 4:30 p.m.",
      <b key="contactinformation-office">Office:</b>,
      "Toll free - 1 855 587-0185 (press option 2)",
      <b key="contactinformation-email">Email:</b>,
      "criminalrecords@gov.bc.ca"
    ],
    type: "bluegrey"
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
    heading: "Applicants Without a BC Services Card",
    content: [
      "Applicants who haven’t lived in B.C.for at least six months or who live outside the province must ",
      <a key="serviceBC" className="link" href="mailto: temp@temp.com">
        email
      </a>,
      " the Liquor and Cannabis Regulation Branch for a Worker Registration Application Form."
    ],
    type: "blue"
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
      "The Security Programs Division will collect your personal information for the purpose of fulfilling the criminal record check requirements of the Criminal Records Review Act (CRRA) and in accordance with sections 26(a) and (c) of the Freedom of Information and Protection of Privacy Act (FoIPPA) and section 6 of the CRRA . Additionally, SPD may collect personal information under section 26(e) of FoIPPA for the purpose of evaluating the Criminal Records Review Program and activities to better serve you. Should you have any questions about the collection, use, or disclosure of personal information, please contact the Criminal Records Review Program, Security Programs Division via mail to PO Box 9217 Stn Prov Govt Victoria, BC V8W 9J1; email to ",
      <a key="criminalRecordsEmail" href="mailto:criminalrecords@gov.bc.ca">
        criminalrecords@gov.bc.ca
      </a>,
      " or by telephone at 1- 855-587-0185 (option 2)."
    ],
    type: "notice"
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
