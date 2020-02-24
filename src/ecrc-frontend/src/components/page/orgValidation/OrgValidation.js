import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgValidationText/OrgValidationText";
import "../page.css";
import SideCards from "../../composite/sideCards/SideCards";

export default function OrgValidation({ page: { header, setOrg } }) {
  const [orgTicketNumber, setOrgTicketNumber] = useState("");
  // method name needs to be capitalized due to react hooks gotcha
  const history = useHistory();

  const orgValidation = () => {
    axios
      .get(`/ecrc/doAuthenticateUser?orgTicketId=${orgTicketNumber}`)
      .then(res => {
        console.log(res);
        setOrg(res.data.accessCodeResponse);
        // sessionStorage.setItem("org", JSON.stringify(res.data.accessCodeResponse));
        history.push("/ecrc/orgverification");
      })
      .catch(error => {
        console.log(error);
      });
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
            onChange={setOrgTicketNumber}
            button={button}
            onClick={orgValidation}
          />
        </div>
        <div className="sidecard">
          <SideCards type={"accesscode"} />
          <SideCards type={"criminalrecord"} />
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
