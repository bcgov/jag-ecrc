import React from "react";

import "./BcServiceSideCard.css";
import SideCard from "../../base/sideCard/SideCard";
import Button from "../../base/button/Button";

export default function BcServiceSideCard() {
  const button = {
    label: "READ MORE",
    buttonStyle: "btn btn-primary dark-button",
    buttonSize: "btn btn-md",
    type: "submit"
  };

  const redirectButton = <Button button={button} onClick={{}} />;

  const bcservice = {
    heading: "Get a BC Services Card",
    content: [
      "B.C. residents who have lived in the province for at least six months must use a BC Services Card to log in to the online qualification tool. Learn how to get a card.",
      redirectButton
    ],
    type: "blue"
  };

  return <SideCard sideCard={bcservice} />;
}
