import React from "react";

import SideCard from "../../base/sideCard/SideCard";

export default function CriminalRecordSideCard() {
  const criminalRecord = {
    heading: "Why do I need to apply and consent to a criminal record check?",
    content: "Learn more about the process",
    type: "blue",
    image: "/images/visit-criminal-record-site.PNG",
    imageLink:
      "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check"
  };

  return <SideCard key="criminal-record" sideCard={criminalRecord} />;
}
