/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";
import {
  isAuthenticated,
  generateJWTToken
} from "../../../modules/AuthenticationHelper";

import "../page.css";
import "./BcscRedirect.css";

export default function BcscRedirect({ page: { header, saveOrg } }) {
  const [bcscUrl, setBcscUrl] = useState("");
  const [toHome, setToHome] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthenticated("tou")) setToHome(true);

    const payload = {
      authorities: ["ROLE"],
      visited: ["orgValidation", "orgVerification", "tou", "bcscRedirect"]
    };
    const token = generateJWTToken(payload);

    axios
      .get(`/ecrc/protected/getBCSCUrl`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setBcscUrl(res.data);
      })
      .catch(() => {});
  }, []);

  const loginBtn = {
    label: "Login with a BC Services Card",
    buttonStyle: "btn ecrc_btn_login_bcsc",
    buttonSize: "btn",
    type: "button"
  };

  const onLoginClick = () => {
    saveOrg();
    // REDIRECT TO BCSC
    window.open(bcscUrl, "_self");
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Apply for a Criminal Record Check</h1>
          <br />
          <p>
            To apply for a criminal record check online, you must use your{" "}
            <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card">
              BC Services Card
            </a>{" "}
            Account. Only cards <b>with a photo</b> are accepted. If it&apos;s
            your first time using your Card to access any online service, you
            need to set up your account for use online by completing a one-time
            security check to{" "}
            <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card">
              verify your identity
            </a>
            .
          </p>

          <p>Please select an option below:</p>
          <br />
          <div className="option">
            <div className="row">
              <div
                className="col-lg-6 col-md-12 "
                style={{ marginBottom: "10px" }}
              >
                I have a BC Services Card{" "}
                <span className="underlineText">with a photo</span>
              </div>
              <div className="col-lg-6 col-md-4 alignRight">
                <Button button={loginBtn} onClick={onLoginClick} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <a href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check">
              I do not have a BC Services Card, or I have non-photo BC Services
              Card
            </a>
            .
          </div>
        </div>

        <div className="sidecard">
          <SideCards type={"bcservice"} />
          <SideCards type={"withoutBCServiceCard"} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

BcscRedirect.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    saveOrg: PropTypes.func.isRequired
  }).isRequired
};
