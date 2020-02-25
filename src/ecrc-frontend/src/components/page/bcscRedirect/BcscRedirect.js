import React from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";

import "../page.css";
import "./BcscRedirect.css";

export default function BcscRedirect({ page: { header } }) {
  const loginBtn = {
    label: "LOGIN",
    buttonStyle: "btn ecrc_common_btn",
    buttonSize: "btn",
    type: "button"
  };

  const accountBtn = {
    label: "SET UP ACCOUNT",
    buttonStyle: "btn ecrc_common_btn",
    buttonSize: "btn",
    type: "button"
  };

  const requestBtn = {
    label: "REQUEST FORM",
    buttonStyle: "btn ecrc_common_btn",
    buttonSize: "btn",
    type: "button"
  };

  const onLoginClick = () => {
    window.open("https://support.wwf.org.uk", "_blank");
  };

  const onAccountClick = () => {
    window.open(
      "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card",
      "_blank"
    );
  };

  const onRequestClick = () => {
    window.location.href = "mailto:cannabis.worker@gov.bc.ca";
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>BC Service Card Application</h1>
          <p>
            Workers of a cannabis retail store must register with the Province.
            Workers must also pass security screening every two years.
          </p>
          <p>
            Cannabis retail store application and licensing fees do not cover
            worker registration costs. Workers must apply to register and are
            responsible for the cost. Licence applicants and licensees can pay
            workers&apos; registration costs if they wish.
          </p>
          <h3>
            To register as a Cannabis Worker online, you must log in with your
            BC Service Card Account.
          </h3>
          <p>Please select an option below:</p>
          <div className="option">
            <div className="row">
              <div className="col-sm-8" style={{ marginBottom: "10px" }}>
                I’m a B.C. resident with a BC Services Card Account.
              </div>
              <div className="col-sm-4">
                <Button button={loginBtn} onClick={onLoginClick} />
              </div>
            </div>
          </div>
          <div className="option">
            <div className="row">
              <div className="col-sm-8" style={{ marginBottom: "10px" }}>
                I’m a B.C. resident but I don&apos;t have a BC Services Card
                Account.
              </div>
              <div className="col-sm-4">
                <Button
                  button={accountBtn}
                  onClick={onAccountClick}
                  className="btn"
                />
              </div>
            </div>
          </div>
          <div className="option">
            <div className="row">
              <div className="col-sm-8" style={{ marginBottom: "10px" }}>
                I’m not a B.C. resident, send me a Cannabis Worker Registration
                form.
              </div>
              <div className="col-sm-4">
                <Button
                  button={requestBtn}
                  onClick={onRequestClick}
                  className="btn"
                />
              </div>
            </div>
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
