import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgValidationText/OrgValidationText";
import "../page.css";
import {
  generateJWTToken,
  storeValidator,
  storeUUID
} from "../../../modules/AuthenticationHelper";

export default function OrgValidation({
  page: { header, setOrg, setTransitionReason }
}) {
  const [orgTicketNumber, setOrgTicketNumber] = useState("");
  const [orgError, setOrgError] = useState("");
  const [toTransition, setToTransition] = useState(false);
  const [toOrgVerification, setToOrgVerification] = useState(false);

  useEffect(() => {
    // create guid and get the initial validator from backend and store it for subsequent requests (for JWT)
    storeUUID();
    storeValidator();

    window.scrollTo(0, 0);
  }, []);

  const orgValidation = () => {
    const uuid = sessionStorage.getItem("uuid");
    const payload = { authorities: ["ROLE"] };
    const token = generateJWTToken(payload);

    axios
      .get(
        `/ecrc/protected/doAuthenticateUser?orgTicketNumber=${orgTicketNumber}&requestGuid=${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        setOrg({ ...res.data.accessCodeResponse, orgTicketNumber });
        setToOrgVerification(true);
      })
      .catch(error => {
        if (error.response.status === 404) {
          setOrgError("Please enter a valid org code");
        } else if (error.response.status === 401) {
          setTransitionReason("notwhitelisted");
          setToTransition(true);
        }
      });
  };

  const textInput = {
    id: "orgId",
    textInputStyle: "placeHolder",
    errorMsg: orgError
  };

  const button = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  if (toOrgVerification) {
    return <Redirect to="/criminalrecordcheck/orgverification" />;
  }

  if (toTransition) {
    return <Redirect to="/criminalrecordcheck/transition" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-10">
          <OrgValidationText
            textInput={textInput}
            onChange={setOrgTicketNumber}
            button={button}
            onClick={orgValidation}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}

OrgValidation.propTypes = {
  page: PropTypes.shape({
    setOrg: PropTypes.func.isRequired,
    setTransitionReason: PropTypes.func.isRequired,
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
