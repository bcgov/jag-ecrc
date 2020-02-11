import React from "react";
import { storiesOf } from "@storybook/react";
import SideCard from "./SideCard";

const sideCard = {
  heading: "Get a BC Services Card",
  content:
    "B.C. residents who have lived in the province for at least six months must use a BC Services Card to log in to the online qualification tool. Learn how to get a card."
};

storiesOf("SideCard", module).add("default", () => (
  <SideCard sideCard={sideCard} />
));
