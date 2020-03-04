import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";

import "../page.css";
import "./BcscRedirect.css";

export default function BcscRedirect({ page: { header } }) {
  const [toHome, setToHome] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loginBtn = {
    label: "Login with a BC Services Card",
    buttonStyle: "btn ecrc_btn_login_bcsc",
    buttonSize: "btn",
    type: "button"
  };

  const accountBtn = {
    label: "Find how to apply",
    buttonStyle: "btn ecrc_bscs_apply_btn",
    buttonSize: "btn",
    type: "button"
  };

  const cancelButton = {
    label: "Cancel and Exit",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const onLoginClick = () => {
    window.open("", "_blank");
  };

  const onAccountClick = () => {
    window.open(
      "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card",
      "_blank"
    );
  };

  if (toHome) {
    return <Redirect to="/hosthome" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Apply for a Criminal Record Check</h1>
          <p>
            Now, that you have confirmed the organization you work or plan to
            work for, the next step is to complete a criminal record check
            application.
          </p>
          <p>
            To apply for a criminal record check online, you must use your{" "}
            <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card">
              BC Services Card
            </a>{" "}
            Account.
          </p>
          <p>
            Only cards <b>with a photo</b> are accepted. If it's your first time
            using your Card to access any online service, you need to set up
            your account for use online by completing a one-time security check
            to{" "}
            <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card">
              verify your identity
            </a>
          </p>

          <p>Please select an option below:</p>
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
          <div className="option">
            <div className="row">
              <div
                className="col-lg-8 col-md-12"
                style={{ marginBottom: "10px" }}
              >
                I <span className="underlineText">DON’T</span> have a BC
                Services Card, or I have one without a photo
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 alignRight">
                <Button
                  button={accountBtn}
                  onClick={onAccountClick}
                  className="btn"
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <Button
              button={cancelButton}
              onClick={() => {
                setToHome(true);
              }}
            />
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
    })
  }).isRequired
};
