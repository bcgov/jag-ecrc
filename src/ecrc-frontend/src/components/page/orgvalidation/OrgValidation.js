import React from "react";

import "../page.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgvalidationtext/OrgValidationText";
import SideCard from "../../base/sideCard/SideCard";
import Button from "../../base/button/Button";

export default function OrgValidation({
  pageLayout: { header, sideCard1, sideCard2 }
}) {
  const orgValidation = () => {
    console.log("You clicked validate!");
  };

  const button = {
    label: "Validate",
    onClick: orgValidation,
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <OrgValidationText />
          <Button button={button} />
        </div>
        <div className="sidecard">
          <SideCard sideCard={sideCard1} />
          <SideCard sideCard={sideCard2} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
