import React from "react";
import PropTypes from "prop-types";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import "./UserConfirmation.css";

export default function UserConfirmation({ header }) {
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
              <Button button={yesButton} onClick={() => {}} />
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
