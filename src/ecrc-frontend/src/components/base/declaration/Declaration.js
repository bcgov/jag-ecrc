/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import "./Declaration.css";

export default function Declaration({
  checkFirstBox,
  checkSecondBox,
  checkThirdBox,
  checkFourthBox
}) {
  return (
    <div>
      <div className="declareTitle">CONSENT</div>
      <section className="declareSection">
        <label htmlFor="checkbox1">
          <input id="checkbox1" type="checkbox" onClick={checkFirstBox} />
          <span className="declaration-cb">
            I hereby consent to a check of criminal charges and convictions to
            determine whether I have a conviction or outstanding charge for any
            relevant or specified offence(s) under the{" "}
            <i>Criminal Records Review Act</i>. I hereby consent to a check of
            all available law enforcement systems, including any local police
            records.
          </span>
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="declareSection">
        <label htmlFor="checkbox2">
          <input id="checkbox2" type="checkbox" onClick={checkSecondBox} />
          <span className="declaration-cb">
            I hereby consent to a Vulnerable Sector search to check if I have
            been convicted of and received a record suspension (formerly known
            as a pardon) for any sexual offences as per the{" "}
            <i>Criminal Records Review Act</i>. For more information on
            Vulnerable Sector searches, please visit the{" "}
            <a
              href="http://www.rcmp-grc.gc.ca/en/types-criminal-background-checks"
              target="_blank"
              rel="noopener noreferrer"
            >
              RCMP website.
            </a>{" "}
            I understand that as part of the Vulnerable Sector search, I may be
            required to submit fingerprints to confirm my identity. In addition,
            where the results of a check indicate that a criminal record or
            outstanding charge for a relevant or specified offence(s) may exist,
            I agree to provide my fingerprints to verify any such criminal
            record.
          </span>
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="declareSection">
        <label htmlFor="checkbox3">
          <input id="checkbox3" type="checkbox" onClick={checkThirdBox} />
          <span className="declaration-cb">
            I hereby consent to the disclosure by BC Corrections to the Deputy
            Registrar of my identifying information (i.e. name), charges,
            convictions and outstanding warrants; information relevant to
            contact with police, BC Corrections, and the judicial system; and my
            date of birth. I hereby consent to the disclosure by the Deputy
            Registrar to the Criminal Records Review Unit of my name, date of
            birth, gender, and relevant involvement with BC Corrections. I
            consent to the disclosure to the Deputy Registrar by the Criminal
            Records Review Unit of any personal information relating to any
            outstanding charges or convictions for any relevant or specified
            offence(s) as defined under the <i>Criminal Records Review Act</i>{" "}
            or any police investigations, charges, or convictions deemed
            relevant by the Deputy Registrar. I further authorize the release to
            the Deputy Registrar of any documents in the custody of the police,
            the courts, corrections and crown counsel relating to any such
            outstanding charges or convictions for any relevant or specified
            offence(s) as defined under the <i>Criminal Records Review Act</i>{" "}
            or any such police investigations, charges, or convictions deemed
            relevant by the Deputy Registrar.
          </span>
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="declareSection">
        <label htmlFor="checkbox4">
          <input id="checkbox4" type="checkbox" onClick={checkFourthBox} />
          <span className="declaration-cb">
            If I am charged with or convicted of any relevant or specified
            offence(s) at any time subsequent to the criminal record check
            authorization herein, I further agree to report the charge(s) or
            conviction(s) to my organization.
          </span>
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
    </div>
  );
}

Declaration.propTypes = {
  checkFirstBox: PropTypes.func,
  checkSecondBox: PropTypes.func,
  checkThirdBox: PropTypes.func,
  checkFourthBox: PropTypes.func
};

Declaration.defaultProps = {
  checkFirstBox: () => {},
  checkSecondBox: () => {},
  checkThirdBox: () => {},
  checkFourthBox: () => {}
};
