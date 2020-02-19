/* eslint-disable react/jsx-curly-newline */
import React from "react";

import SideCard from "../../base/sideCard/SideCard";
import { Button } from "../../base/button/Button";

export default function CriminalRecordSideCard() {
  const button = {
    label: "VISIT THE CRIMINAL RECORD REVIEW WEBSITE",
    buttonStyle: "btn btn-primary dark-button",
    buttonSize: "btn btn-md",
    type: "submit"
  };

  const criminalRecordButton = (
    <Button
      key="criminal-record-link"
      button={button}
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

  return <SideCard key="criminal-record" sideCard={criminalRecord} />;
}
