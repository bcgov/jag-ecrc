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
      <b className="block">contact your organization.</b>
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
      <b>Office:</b>,
      "Toll free - 1 855 587-0185 (press option 2)",
      <b>Email:</b>,
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
      {type === "usefullinks" && (
        <SideCard key="usefullink" sideCard={usefulLinks} />
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
