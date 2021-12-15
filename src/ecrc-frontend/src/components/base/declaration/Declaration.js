/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import "./Declaration.css";

export default function Declaration({
  checkFirstBox,
  checkSecondBox,
  checkThirdBox,
  checkFourthBox,
  checkFifthBox,
  checkSixthBox,
  checkSeventhBox,
  checkEighthBox,
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
              I hereby consent to a criminal record check pursuant to the{" "}
              <i>Criminal Records Review Act</i> (CRRA) to determine whether I
              have a conviction or outstanding charge for any relevant or
              specified offence(s) as defined under that Act (CRRA check). I
              hereby consent to a check of available law enforcement systems as
              further described below, including any local police records.
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
              <i>Criminal Records Act.</i> For more information on Vulnerable
              Sector searches, please visit the Royal Canadian Mounted Police
              (RCMP) website:{" "}
              <a href="http://www.rcmp-grc.gc.ca/en/types-criminal-background-checks">
                http://www.rcmp-grc.gc.ca/en/types-criminal-background-checks
              </a>
              . I understand that as part of the Vulnerable Sector search, I may
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
              If I am charged with or convicted of any relevant or specified
              offence(s) at any time subsequent to the criminal record check
              authorization herein, I agree to report the charge(s) or
              conviction(s) to my organization, in a timely manner, with a new
              criminal record check authorization.
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
      <br />
      {!shareConsent && (
        <section>
          <span className="declaration-cb">
            For the purpose of completing my CRRA check as described above, I
            authorize the collection and/or consent to the disclosure of my
            personal information within Canada, as follows:
          </span>
        </section>
      )}
      <section className="declareSection">
        <label htmlFor="checkbox4">
          <input id="checkbox4" type="checkbox" onClick={checkFourthBox} />
          {!shareConsent && (
            <span className="declaration-cb">
              Pursuant to the{" "}
              <i>Freedom of Information and Protection of Privacy Act</i>{" "}
              (FoIPPA), I hereby consent to the disclosure by the Ministry of
              Public Safety and Solicitor General to the Deputy Registrar of my
              name(s), alias(es), Correctional Service Number (CS#), history of
              contact with BC Corrections, and my date of birth as found on the
              BC Corrections’ client management software, CORNET.
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
      {!shareConsent && (
        <section className="declareSection">
          <label htmlFor="checkbox5">
            <input id="checkbox5" type="checkbox" onClick={checkFifthBox} />
            <span className="declaration-cb">
              Pursuant to FoIPPA, I hereby consent to the disclosure by the
              Deputy Registrar to the Criminal Records Review Unit of the RCMP
              (CRRU) of my name(s), alias(es), CS#, date of birth, gender,
              driver’s licence/ BCID#, and history of contact with BC
              Corrections. I also authorize the collection, by the CRRU and
              other federal government institutions under the <i>Privacy Act</i>
              , of the same information and of any and all personal information
              relating to this CRRA check in support of my application, for the
              purpose of conducting a check of criminal investigations, charges,
              convictions and information in police databases, including
              incidents that did not result in conviction. For the same purpose,
              I also authorize the provision to the CRRU of my personal
              information by all queried federal, provincial and municipal Law
              Enforcement Agencies in Canada as well as other authorized public
              bodies under FoIPPA.
            </span>
            <span id="asterisk" className="mandatory">
              *
            </span>
          </label>
        </section>
      )}

      {!shareConsent && (
        <section className="declareSection">
          <label htmlFor="checkbox6">
            <input id="checkbox6" type="checkbox" onClick={checkSixthBox} />
            <span className="declaration-cb">
              Pursuant to FoIPPA, the <i>Privacy Act</i>, and any other relevant
              applicable provincial and federal legislation, I hereby consent to
              the disclosure to the Deputy Registrar by the CRRU, the BC
              Municipal Law Enforcement Agencies as well as other authorized
              public body agencies of any personal information relating to my
              CRRA check. This personal information may include:
              <ul className="declaration-ul">
                <li className="declaration-li">
                  Criminal record check or fingerprint- based criminal record
                  verification by searching the Canadian Police Information
                  Centre database;
                </li>
                <li className="declaration-li">
                  A police information check, including the Police Records
                  Information Management Environment (PRIME-BC) and the Police
                  Reporting and Occurrence System (PROS).
                  <span id="asterisk" className="mandatory">
                    *
                  </span>
                </li>
              </ul>
            </span>
          </label>
        </section>
      )}
      {!shareConsent && (
        <section className="declareSection">
          <label htmlFor="checkbox7">
            <input id="checkbox7" type="checkbox" onClick={checkSeventhBox} />
            <span className="declaration-cb">
              I acknowledge that in certain instances, although no identified
              occurrence(s) resulted in a charge or conviction, the CRRU may
              assess that I pose a public safety risk and advise Security
              Programs Division that it will terminate its check of law
              enforcement systems accordingly, with the result that my CRRA
              check may not be concluded.
            </span>
            <span id="asterisk" className="mandatory">
              *
            </span>
          </label>
        </section>
      )}
      {!shareConsent && (
        <section className="declareSection">
          <label htmlFor="checkbox8">
            <input id="checkbox8" type="checkbox" onClick={checkEighthBox} />
            <span className="declaration-cb">
              In addition to the foregoing, and as may be required for the
              Deputy Registrar to make a determination pursuant to s. 4 (2) and
              4 (3) CRRA, I further authorize the release to the Deputy
              Registrar of any documents in the custody of the police, the
              courts, corrections and crown counsel relating to any outstanding
              charges or convictions for any relevant or specified offence(s) as
              defined under the CRRA or any police investigations, charges, or
              convictions deemed relevant by the Deputy Registrar.
            </span>
            <span id="asterisk" className="mandatory">
              *
            </span>
          </label>
        </section>
      )}
    </div>
  );
}

Declaration.propTypes = {
  checkFirstBox: PropTypes.func,
  checkSecondBox: PropTypes.func,
  checkThirdBox: PropTypes.func,
  checkFourthBox: PropTypes.func,
  checkFifthBox: PropTypes.func,
  checkSixthBox: PropTypes.func,
  checkSeventhBox: PropTypes.func,
  checkEighthBox: PropTypes.func,
  shareConsent: PropTypes.bool.isRequired
};

Declaration.defaultProps = {
  checkFirstBox: () => {},
  checkSecondBox: () => {},
  checkThirdBox: () => {},
  checkFourthBox: () => {},
  checkFifthBox: () => {},
  checkSixthBox: () => {},
  checkSeventhBox: () => {},
  checkEighthBox: () => {}
};
