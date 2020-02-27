import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Declaration from "../../base/declaration/Declaration";
import { Button } from "../../base/button/Button";
import "../page.css";
import SideCards from "../../composite/sideCards/SideCards";

export default function Consent({ page: { header } }) {
  const [toHome, setToHome] = useState(false);
  const [toApplicationForm, setToApplicationForm] = useState(false);

  const [inputEnabled, setInputEnabled] = useState(
    "textinput_non_editable_gray"
  );
  const [firstBoxChecked, setFirstBoxChecked] = useState(false);
  const [secondBoxChecked, setSecondBoxChecked] = useState(false);
  const [thirdBoxChecked, setThirdBoxChecked] = useState(false);
  const [continueBtnEnabled, setContinueBtnEnabled] = useState(false);
  const [applicantName, setApplicantName] = useState("");

  useEffect(() => {
    if (firstBoxChecked && secondBoxChecked && thirdBoxChecked) {
      setInputEnabled("textinput_editable_white");
      if (applicantName) {
        setContinueBtnEnabled(true);
      } else {
        setContinueBtnEnabled(false);
      }
    } else {
      setInputEnabled("textinput_non_editable_gray");
      setContinueBtnEnabled(false);
    }
  }, [firstBoxChecked, secondBoxChecked, thirdBoxChecked, applicantName]);

  const cancelButton = {
    label: "Cancel and Exit",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit",
    disabled: !continueBtnEnabled
  };

  const textInput = {
    label: "Applicant Name",
    id: "textInputId",
    textInputStyle: inputEnabled
  };

  if (toHome) {
    return <Redirect to="/hosthome" />;
  }

  if (toApplicationForm) {
    return <Redirect to="/ecrc/applicationform" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Consent for Criminal Record Check</h1>
          <Declaration
            style={{ paddingBottom: "30px" }}
            checkFirstBox={() => setFirstBoxChecked(!firstBoxChecked)}
            checkSecondBox={() => setSecondBoxChecked(!secondBoxChecked)}
            checkThirdBox={() => setThirdBoxChecked(!thirdBoxChecked)}
            textInput={textInput}
            onApplicantNameChange={setApplicantName}
          />
          <br />
          <div className="buttons" style={{ paddingLeft: "20px" }}>
            <Button
              button={cancelButton}
              onClick={() => {
                setToHome(true);
              }}
            />
            <Button
              button={continueButton}
              onClick={() => {
                setToApplicationForm(true);
              }}
            />
          </div>
        </div>

        <div className="sidecard">
          <SideCards type="contactinformation" />
          <SideCards type="collectionnotice" />
        </div>
      </div>
      <Footer />
    </main>
  );
}

Consent.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
