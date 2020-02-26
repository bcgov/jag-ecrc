import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgValidationText/OrgValidationText";
import "../page.css";
import SideCards from "../../composite/sideCards/SideCards";
import { isAuthenticated } from "../../../modules/AuthenticationHelper";

const jwt = require("jsonwebtoken");

export default function OrgValidation({ page: { setOrg, header } }) {
  const [orgInput, setOrgInput] = useState("");
  // method name needs to be capitalized due to react hooks gotcha
  const history = useHistory();

  var token = jwt.sign({ foo: "bar" }, "shhhhh", { expiresIn: "1m" });

  sessionStorage.setItem("jwt", token);

  isAuthenticated();

  const orgValidation = () => {
    axios
      .get(
        `http://localhost:8082/ecrc/doAuthenticateUser?orgTicketId=${orgInput}&token=${token}`
      )
      .then(res => {
        history.push("/ecrc/orgverification");
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
