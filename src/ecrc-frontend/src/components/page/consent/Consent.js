import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Declaration from "../../base/declaration/Declaration";
import { Button } from "../../base/button/Button";
import "../page.css";
import SideCard from "../../base/sideCard/SideCard";

export default function Consent({ page: { header }, onContinueClick }) {
  const [inputEnabled, setInputEnabled] = useState(
    "textinput_non_editable_gray"
  );
  const [firstBoxChecked, setFirstBoxChecked] = useState(false);
  const [secondBoxChecked, setSecondBoxChecked] = useState(false);
  const [thirdBoxChecked, setThirdBoxChecked] = useState(false);
  const [continueBtnEnabled, setContinueBtnEnabled] = useState(false);

  useEffect(() => {
    if (firstBoxChecked && secondBoxChecked && thirdBoxChecked) {
      setInputEnabled("textinput_editable_white");
      setContinueBtnEnabled(true);
    } else {
      setInputEnabled("textinput_non_editable_gray");
      setContinueBtnEnabled(false);
    }
  }, [firstBoxChecked, secondBoxChecked, thirdBoxChecked]);

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
    type: "submit",
    disabled: !continueBtnEnabled
  };

  const contactSideCard = {
    heading: (
      <div style={{ fontSize: "22px" }}>
        Contact the Criminal Records Review Program
      </div>
    ),
    content: [],
    type: "contact",
    isWide: true
  };

  const noticeSideCard = {
    heading: <div style={{ fontSize: "22px" }}>Collection Notice:</div>,
    content: [
      <div style={{ fontSize: "12px" }}>
        The Security Programs Division(SPD) will collect your personal
        information for the purpose of fulfilling the requirements of the
        Cannabis Control and Licensing Act(CCLA) and associated regulations in
        accordance with Sections 26(a) and(c) of the Freedom of Information and
        Protection of Privacy Act.Should you have any questions about the
        collection, use, or disclosure of personal information, please contact
        the Senior Policy Analyst, Security Programs Division via mail to PO Box
        9217 Stn Prov Govt Victoria, BC V8W 9J1; email to
        cannabissecurityscreening@gov.bc.ca; or by telephone at 1 - 855 - 587 -
        0185.
      </div>
    ],
    type: "notice",
    isWide: true
  };

  const textInput = {
    label: "Applicant Name",
    id: "textInputId",
    textInputStyle: inputEnabled
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="row">
          <div className="col-7">
            <div className="content">
              <h1>Consent for Criminal Record Check</h1>
              <Declaration
                checkFirstBox={() => setFirstBoxChecked(!firstBoxChecked)}
                checkSecondBox={() => setSecondBoxChecked(!secondBoxChecked)}
                checkThirdBox={() => setThirdBoxChecked(!thirdBoxChecked)}
                textInput={textInput}
                onApplicantNameChange={() => onApplicantNameChange()}
              />
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
          <div className="col-5">
            <SideCard sideCard={contactSideCard} />
            <SideCard sideCard={noticeSideCard} />
          </div>
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
  }).isRequired,
  onContinueClick: PropTypes.func.isRequired
};
