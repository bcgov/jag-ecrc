import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgvalidationtext/OrgValidationText";
import "../page.css";
import AccessCodeSideCard from "../../composite/accesscodesidecard/AccessCodeSideCard";
import CriminalRecordSideCard from "../../composite/criminalrecordsidecard/CriminalRecordSideCard";

export default function OrgValidation({ page: { setOrg, header } }) {
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
        <div className="content col-md-8">
          <OrgValidationText
            textInput={textInput}
            onChange={setOrgInput}
            button={button}
            onClick={orgValidation}
          />
        </div>
        <div className="sidecard">
          <AccessCodeSideCard />
          <CriminalRecordSideCard />
        </div>
      </div>
      <Footer />
    </main>
  );
}

OrgValidation.propTypes = {
  page: PropTypes.shape({
    setOrg: PropTypes.func.isRequired,
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
