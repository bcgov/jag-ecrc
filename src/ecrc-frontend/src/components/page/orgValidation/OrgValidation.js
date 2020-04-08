import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
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
  page: { header, setOrg, setTransitionReason, setError }
}) {
  const history = useHistory();
  const [orgTicketNumber, setOrgTicketNumber] = useState("");
  const [orgError, setOrgError] = useState("");
  const [toError, setToError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // create guid and get the initial validator from backend and store it for subsequent requests (for JWT)
    storeUUID();
    storeValidator();
    setLoading(false);

    window.scrollTo(0, 0);
  }, []);

  const button = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit",
    loader: loading,
    disabled: loading
  };

  const orgValidation = () => {
    if (!orgTicketNumber) {
      setOrgError("An access code is required to continue");
      return false;
    }

    setLoading(true);
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
        setLoading(false);
        setOrg({ ...res.data.accessCodeResponse, orgTicketNumber });
        history.push("/criminalrecordcheck/orgverification");
      })
      .catch(error => {
        setLoading(false);
        let errorMessage = "";

        if (error && error.response && error.response.status) {
          if (error.response.status === 404) {
            setOrgError("The access code is invalid");
          } else if (error.response.status === 401) {
            setTransitionReason("notwhitelisted");
            history.push("/criminalrecordcheck/transition");
          } else if (error.request && error.request.response) {
            try {
              JSON.parse(error.request.response);
              errorMessage = JSON.parse(error.request.response).message;
            } catch (err) {
              errorMessage =
                "An unexpected error occurred. Please make sure all your data is accurate and complete. We apologize for the inconvenience.";
            }

            setToError(true);
            setError({
              status: error.response.status,
              message: errorMessage
            });
          } else {
            setToError(true);
            setError({
              status: error.response.status
            });
          }
        } else {
          setToError(true);
        }
      });

    return true;
  };

  const textInput = {
    id: "orgId",
    textInputStyle: "placeHolder",
    errorMsg: orgError
  };

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
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
    setError: PropTypes.func.isRequired,
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
