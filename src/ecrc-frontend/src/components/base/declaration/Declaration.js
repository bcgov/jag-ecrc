import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../textInput/TextInput";
import "./Declaration.css";

export default function Declaration({
  textInput,
  onApplicantNameChange,
  checkFirstBox,
  checkSecondBox,
  checkThirdBox
}) {
  return (
    <div>
      <div className="declareTitle">DECLARATION AND CONSENT</div>
      <section className="declareSection">
        <input type="checkbox" onClick={checkFirstBox} />
        <span className="declaration-cb">
          I, the undersigned, do hereby consent to the collection and disclosure
          by the Royal Canadian Mounted Police (RCMP) and other law enforcement
          agencies, as well as other duly authorized agencies of the government,
          of any and all information related to the security screening checks in
          support of this application for up to two years. This may include some
          or all of: (a) criminal record check or fingerprint-based criminal
          record verification by searching the Canadian Police Information
          Centre database; (b) a police information check; (c) a check of
          intelligence databases maintained by law enforcement agencies; (d) a
          check of records in the justice information system of the Ministry of
          Attorney General and; (e) a check of records in the corrections
          information system of the Ministry of Public Safety and Solicitor
          General.
        </span>
      </section>
      <section className="declareSection">
        <input type="checkbox" onClick={checkSecondBox} />
        <span className="declaration-cb">
          I certify that, to the best of my knowledge, the information I have
          provided on my application and will provide as necessary is complete,
          honest and accurate. I understand that a false statement or omission
          of facts herein may lead to a denial of a cannabis workers
          registration. I am also aware that later discovery of an omission or
          misrepresentation may be grounds for any finding of suitability to be
          suspended or revoked.
        </span>
      </section>
      <section className="declareSection">
        <input type="checkbox" onClick={checkThirdBox} />
        <span className="declaration-cb">
          The third checkbox for my application and will provide as necessary is
          complete.
        </span>
      </section>

      <section className="declareSection" style={{ maxWidth: "475px" }}>
        <TextInput textInput={textInput} onChange={onApplicantNameChange} />
      </section>
    </div>
  );
}

Declaration.propTypes = {
  textInput: PropTypes.shape,
  checkFirstBox: PropTypes.func,
  checkSecondBox: PropTypes.func,
  checkThirdBox: PropTypes.func,
  onApplicantNameChange: PropTypes.func.isRequired
};

Declaration.defaultProps = {
  textInput: {},
  checkFirstBox: () => {},
  checkSecondBox: () => {},
  checkThirdBox: () => {}
};
