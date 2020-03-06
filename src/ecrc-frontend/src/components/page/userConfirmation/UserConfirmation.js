import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import "./UserConfirmation.css";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

export default function UserConfirmation({ header }) {
  const [toConsent, setToConsent] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get("code"));
    window.scrollTo(0, 0);
  }, []);

  const yesButton = {
    label: "Yes",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn",
    type: "submit"
  };

  const noButton = {
    label: "No",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  function onYesClick() {
    const payload = { authorities: ["ROLE"] };
    const token = generateJWTToken(payload);

    axios
      .get(`/ecrc/protected/login?code=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        sessionStorage.setItem("jwt", res.data);
        setToConsent(true);
      })
      .catch(() => {});
  }

  if (toConsent) {
    return <Redirect to="/ecrc/consent" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="user-confirm-content col-md-12">
          <strong>
            Please confirm the name associated with the BC Service card login
            provided.
          </strong>
          <p />
          <p>Temp name</p>
          <p>Is this correct?</p>
          <div className="row">
            <div className="col-md-12">
              <Button button={yesButton} onClick={() => onYesClick()} />
              <Button button={noButton} onClick={() => {}} />
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer isSmallPage />
    </main>
  );
}

UserConfirmation.propTypes = {
  header: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};
