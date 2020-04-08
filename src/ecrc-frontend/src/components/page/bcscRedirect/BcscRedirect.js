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
  isActionPerformed
} from "../../../modules/AuthenticationHelper";

import "../page.css";
import "./BcscRedirect.css";

export default function BcscRedirect({ page: { header, saveOrg, setError } }) {
  const [bcscUrl, setBcscUrl] = useState("");
  const [toError, setToError] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthenticated() || !isActionPerformed("tou")) {
      setError({
        status: 403
      });
      setToError(true);
    }

    const token = sessionStorage.getItem("jwt");
    const uuid = sessionStorage.getItem("uuid");

    axios
      .get(`/ecrc/protected/getBCSCUrl?requestGuid=${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setBcscUrl(res.data);
      })
      .catch(error => {
        setToError(true);
        if (error && error.response && error.response.status) {
          setError({
            status: error.response.status,
            message: error.response.data
          });
        }
      });
  }, [setError]);

  const loginBtn = {
    label: "Login with a BC Services Card",
    buttonStyle: "btn ecrc_btn_login_bcsc",
    buttonSize: "btn",
    type: "button"
  };

  const onLoginClick = () => {
    if (!isAuthenticated()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      setToError(true);
      return;
    }
    sessionStorage.setItem("validExit", true);
    saveOrg();
    // REDIRECT TO BCSC
    window.open(bcscUrl, "_self");
  };

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Apply for a Criminal Record Check</h1>
          <p>
            To apply for a criminal record check online, you must use your{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Services Card.
            </a>{" "}
          </p>
          <p>
            Only cards <b>with a photo</b> are accepted. If it&apos;s your first
            time using your BC Services Card to access an online service, you
            need to set up your account for use online. Completing a one-time
            security check to{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              verify your identity
            </a>
            .
          </p>

          <p>Please select an option below:</p>
          <div className="option">
            <div className="row">
              <div className="col-sm-8 mt-lg-2 mb-2">
                I have a photo BC Services Card
              </div>
              <div className="col-sm-4">
                <Button button={loginBtn} onClick={onLoginClick} />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <a href="/criminalrecordcheck/transition">
              I do not have a BC Services Card, or I have a non-photo BC
              Services Card
            </a>
            .
          </div>
        </div>

        <div className="sidecard">
          <SideCards type={"bcservice"} />
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
    saveOrg: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  }).isRequired
};
