import React from "react";
import OrgValidation from "./components/page/orgvalidation/OrgValidation";

export default function App() {
  const header = {
    name: "eCRC"
  };

  const sideCard1 = {
    heading: "Contact Your Organization",
    content:
      "You require a valid Organization Code, supplied by the organization you are applying to. You must contact them in order to receive this code.",
    type: "blue"
  };

  const sideCard2 = {
    heading: "Get a BC Services Card",
    content:
      "B.C. residents who have lived in the province for at least six months must use a BC Services Card to log in to the online qualification tool. Learn how to get a card.",
    type: "blue"
  };

  const pageLayout = {
    header,
    sideCard1,
    sideCard2
  };

  return (
    <div>
      <OrgValidation pageLayout={pageLayout} />
    </div>
  );
}
