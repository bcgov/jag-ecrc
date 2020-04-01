import React from "react";
import { storiesOf } from "@storybook/react";
import SideCard from "./SideCard";

const sideCard = {
  heading: "Get a BC Services Card",
  content: [
    "B.C. residents who have lived in the province for at least six months must use a BC Services Card to log in to the online qualification tool. Learn how to get a card."
  ],
  type: "blue"
};

storiesOf("SideCard", module)
  .add("blue", () => <SideCard sideCard={sideCard} />)
  .add("notice", () => (
    <SideCard
      sideCard={{
        ...sideCard,
        heading: "Collection Notice",
        content: [
          "The Security Programs Division will collect your personal information for the purpose of fulfilling the criminal record check requirements of the Criminal Records Review Act and in accordance with section 26 (c) of the Freedom of Information and Protection of Privacy Act (FoIPPA). Additionally, SPD may collect personal information under section 26(e) of FoIPPA for the purpose of evaluating the Criminal Records Review Program and activities to better serve you. Should you have any questions about the collection, use, or disclosure of your personal information, please contact the Policy Analyst of the Criminal Records Review Program, Security Programs Division via mail to PO Box 9217 Stn Prov Govt Victoria, BC V8W 9J1; email to criminalrecords@gov.bc.ca; or by telephone at 1- 855-587-0185 (option 2)."
        ],
        type: "notice"
      }}
    />
  ))
  .add("bluegrey", () => (
    <SideCard
      sideCard={{
        ...sideCard,
        heading: "Business Profile",
        content: ["Content for blue grey"],
        type: "bluegrey"
      }}
    />
  ));
