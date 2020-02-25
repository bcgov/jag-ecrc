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
  const [applicantName, setApplicantName] = useState("");

  useEffect(() => {
    if (firstBoxChecked && secondBoxChecked && thirdBoxChecked) {
      setInputEnabled("textinput_editable_white");
      if (applicantName !== "") {
        setContinueBtnEnabled(true);
      } else {
        setContinueBtnEnabled(false);
      }
    } else {
      setInputEnabled("textinput_non_editable_gray");
      setContinueBtnEnabled(false);
    }
  }, [firstBoxChecked, secondBoxChecked, thirdBoxChecked, applicantName]);

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
    heading: "Contact the Criminal Records Review Program",
    content: [],
    type: "contact",
    isWide: true
  };

  const noticeSideCard = {
    heading: "Collection Notice",
    content: [
      <div key="noticeCollection" style={{ fontSize: "12px" }}>
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
              button={backButton}
              onClick={() => {
                window.history.back();
              }}
            />
            <Button button={continueButton} onClick={onContinueClick} />
          </div>
        </div>

        <div className="sidecard">
          <SideCard key="contact" sideCard={contactSideCard} />
          <SideCard key="collectionnotice" sideCard={noticeSideCard} />
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
