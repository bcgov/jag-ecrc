/* eslint-disable react/jsx-curly-newline */
import React from "react";

import "./BcServiceSideCard.css";
import SideCard from "../../base/sideCard/SideCard";
import { Button } from "../../base/button/Button";

export default function BcServiceSideCard() {
  const button = {
    label: "READ MORE",
    buttonStyle: "btn btn-primary dark-button",
    buttonSize: "btn btn-md",
    type: "submit"
  };

  const redirectButton = (
    <Button
      key="bc-services-card-link"
      button={button}
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
      redirectButton
    ],
    type: "blue"
  };

  return <SideCard key="bc-services-card" sideCard={bcservice} />;
}
