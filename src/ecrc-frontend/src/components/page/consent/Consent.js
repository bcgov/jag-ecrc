import React from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Declaration from "../../base/declaration/Declaration";
import { Button } from "../../base/button/Button";
import "../page.css";

export default function Consent({
  page: {
    pageLayout: { header }
  },
  onContinueClick
}) {
  const onApplicantNameChange = () => {};
  const backButton = {
    label: "Back",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit"
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <h1>Consent for Criminal Record Check</h1>
          <Declaration onApplicantNameChange={onApplicantNameChange} />
          <div
            style={{
              paddingLeft: "10px",
              paddingTop: "20px",
              textAlign: "right"
            }}
          >
            <Button
              button={backButton}
              onClick={() => {
                window.history.back();
              }}
            />
            <Button button={continueButton} onClick={onContinueClick} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

Consent.propTypes = {
  page: PropTypes.shape({
    pageLayout: PropTypes.shape({
      header: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired,
  onContinueClick: PropTypes.func.isRequired
};
