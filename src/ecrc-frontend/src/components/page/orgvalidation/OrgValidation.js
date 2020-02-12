import React from "react";
import axios from "axios";

import "../page.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgvalidationtext/OrgValidationText";
import SideCard from "../../base/sideCard/SideCard";
import Button from "../../base/button/Button";

export default function OrgValidation({
  page: {
    setOrg,
    pageLayout: { header, sideCard1, sideCard2 }
  }
}) {
  const orgValidation = () => {
    const orgId = "crce";

    console.log(`You clicked validate for ${orgId} Org ID.`);

    axios.get(`/ecrc/doAuthenticateUser?org=${orgId}`).then(res => {
      setOrg(res.data.accessCodeResponse);
    });
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
