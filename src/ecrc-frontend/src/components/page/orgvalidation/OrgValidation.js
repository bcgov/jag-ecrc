import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgvalidationtext/OrgValidationText";
import SideCard from "../../base/sideCard/SideCard";
import "../page.css";

export default function OrgValidation({
  page: {
    setOrg,
    pageLayout: { header, sideCard1, sideCard2 }
  }
}) {
  const [orgInput, setOrgInput] = useState("");

  const orgValidation = () => {
    axios
      .get(`/ecrc/doAuthenticateUser?orgTicketId=${orgInput}`)
      .then(res => {
        setOrg(res.data.accessCodeResponse);
      })
      .catch();
  };

  const textInput = {
    label: "Access code",
    id: "orgId",
    textInputStyle: "placeHolder",
    isRequired: true
  };

  const button = {
    label: "Validate",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <OrgValidationText
            textInput={textInput}
            onChange={setOrgInput}
            button={button}
            onClick={orgValidation}
          />
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

OrgValidation.propTypes = {
  page: PropTypes.shape({
    setOrg: PropTypes.func.isRequired,
    pageLayout: PropTypes.shape({
      header: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      sideCard1: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }),
      sideCard2: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
};
