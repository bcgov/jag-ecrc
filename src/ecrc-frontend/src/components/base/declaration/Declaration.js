/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import "./Declaration.css";

export default function Declaration({
  checkFirstBox,
  checkSecondBox,
  checkThirdBox,
  checkFourthBox,
  shareConsent
}) {
  return (
    <div>
      <div className="declareTitle">CONSENT</div>
      <section className="declareSection">
        <label htmlFor="checkbox1">
          <input id="checkbox1" type="checkbox" onClick={checkFirstBox} />
          {!shareConsent && (
            <span className="declaration-cb">
              I hereby consent to a check of criminal charges and convictions to
              determine whether I have a conviction or outstanding charge for
              any relevant or specified offence(s) under the{" "}
              <i>Criminal Records Review Act</i>. I hereby consent to a check of
              all available law enforcement systems, including any local police
              records.
            </span>
          )}
          {shareConsent && (
            <span className="declaration-cb">
              I understand that to share the result of a criminal record check,
              I must have completed a criminal record check within the last 5
              years through the Criminal Records Review Programs (CRRP) and the
              sharing request must be for the same type of check as previously
              completed, either for children, vulnerable adults, or both
              children and vulnerable adults.
            </span>
          )}
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="declareSection">
        <label htmlFor="checkbox2">
          <input id="checkbox2" type="checkbox" onClick={checkSecondBox} />
          {!shareConsent && (
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
              I understand that as part of the Vulnerable Sector search, I may
              be required to submit fingerprints to confirm my identity. In
              addition, where the results of a check indicate that a criminal
              record or outstanding charge for a relevant or specified
              offence(s) may exist, I agree to provide my fingerprints to verify
              any such criminal record.
            </span>
          )}
          {shareConsent && (
            <span className="declaration-cb">
              I confirm I have completed a criminal record check within the past
              five years with the CRRP which did not result in a determination
              of risk to children and/or vulnerable adults as defined in the{" "}
              <i>Criminal Records Review Act</i>. I understand no details will
              be disclosed to the organization I am applying to, only the
              result. I hereby consent to share the result of the completed
              check with the organization I am applying to.
            </span>
          )}
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="declareSection">
        <label htmlFor="checkbox3">
          <input id="checkbox3" type="checkbox" onClick={checkThirdBox} />
          {!shareConsent && (
            <span className="declaration-cb">
              I hereby consent to the disclosure by the Ministry of Public
              Safety and Solicitor General to the Deputy Registrar of my
              name(s), alias(es), Correctional Service Number (CS#), history of
              contact with BC Corrections, and my date of birth and gender as
              found on the BC Corrections’ client management software, CORNET. I
              hereby consent to the disclosure by the Deputy Registrar to the
              Criminal Records Review Unit of my name(s), alias(es), CS#, date
              of birth, gender, and history of contact with BC Corrections. I
              consent to the disclosure to the Deputy Registrar by the Criminal
              Records Review Unit of any personal information relating to any
              outstanding charges or convictions for any relevant or specified
              offence(s) as defined under the Criminal Records Review Act or any
              police investigations, charges, or convictions deemed relevant by
              the Deputy Registrar.
            </span>
          )}
          {shareConsent && (
            <span className="declaration-cb">
              I understand that if the Registrar determines I do not have a
              criminal record check to share according to the above criteria, I
              will be promptly notified.
            </span>
          )}
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="declareSection">
        <label htmlFor="checkbox4">
          <input id="checkbox4" type="checkbox" onClick={checkFourthBox} />
          {!shareConsent && (
            <span className="declaration-cb">
              If I am charged with or convicted of any relevant or specified
              offence(s) at any time subsequent to the criminal record check
              authorization herein, I further agree to report the charge(s) or
              conviction(s) to my organization.
            </span>
          )}
          {shareConsent && (
            <span className="declaration-cb">
              I understand that within 5 years of the date of my completing this
              Consent to Share a Criminal Record Check form, should the CRRP
              make a determination that I pose a risk to children and/or
              vulnerable adults, the Deputy Registrar will promptly provide
              notification to me and to the persons and entities (organizations)
              identified on this Consent to Share a Criminal Record Check.
            </span>
          )}
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
  checkFourthBox: PropTypes.func,
  shareConsent: PropTypes.bool.isRequired
};

Declaration.defaultProps = {
  checkFirstBox: () => {},
  checkSecondBox: () => {},
  checkThirdBox: () => {},
  checkFourthBox: () => {}
};
