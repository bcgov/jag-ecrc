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
          "The information requested on this form is collected by the Liquor and Cannabis Regulation Branch under Sections 26 (a) and (c) of the Freedom of Information and Protection of Privacy Act for the purpose of cannabis licensing, compliance and enforcement matters in accordance with the Cannabis"
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
  ))
  .add("contact", () => (
    <SideCard
      sideCard={{
        ...sideCard,
        heading: (
          <div style={{ fontSize: "22px" }}>
            Contact the Criminal Records Review Program
          </div>
        ),
        content: [],
        type: "contact"
      }}
    />
  ));
