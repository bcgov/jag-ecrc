/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "../button/Button";
import { TextInput } from "../textInput/TextInput";

import "./OrgValidationText.css";

export default function OrgValidationText({
  button,
  onClick,
  textInput,
  onChange
}) {
  return (
    <div>
      <h1>Criminal Record Check</h1>
      <br />
      <p>
        In British Columbia, if you work or volunteer with, or have the
        potential for unsupervised access to children and/or vulnerable adults,
        you are required to complete a criminal record check. This portal
        enables you to easily apply for a criminal record check under the{" "}
        <a href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/00_96086_01">
          Criminal Records Review Act (CRRA).
        </a>
      </p>
      <div>
        <div>
          <br />
          <h3>{"How do I submit a CRC request online?"}</h3>
          <p>
            To submit an online request for a criminal record check, you must:
          </p>
          <ul className="bodyList">
            <li>{"Be at least 12 years of age as of today's date"}</li>
            <li>
              Have your identity verified by using your{" "}
              <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
                BC Services Card
              </a>{" "}
              (BCSC). The BCSC provides secure access to provincial government
              online services. If you don&apos;t have a BCSC, an alternative
              option may be available for you.
            </li>
            <li>Have an access code provided by your organization</li>
          </ul>
        </div>

        <div>
          <br />
          <h3>{"I'm ready"}</h3>
          <div style={{ float: "left" }}>
            <div>
              <TextInput textInput={textInput} onChange={onChange} />
            </div>
            <div style={{ maxWidth: "350px" }}>
              <p style={{ width: "400px" }}>
                Enter the access code provided by your organization. An access
                code is required to proceed with the online submission
              </p>
            </div>
          </div>
          <div style={{ float: "left" }}>
            <span id="asterisk" className="mandatory">
              *
            </span>
          </div>
          <div style={{ float: "right" }}>
            <Button button={button} onClick={onClick} />
          </div>
          <div style={{ clear: "both" }} />
        </div>
        <br />

        <div>
          <h3>I need more information</h3>
          <ul className="bodyList">
            <li>
              <a href="volunteer">{"I'm an employee or a volunteer"}</a> and I
              want to know{" "}
              <a href="http://www.rcmp-grc.gc.ca/en/types-criminal-background-checks">
                why I need to apply for a criminal record check
              </a>
            </li>
            <li>
              <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
                I don&apos;t have a BC Services Card
              </a>
            </li>
            <li>
              <a href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/organization-registration/employee-organization-registration/employee-contact-registration">
                {"I'm an authorized contact"}
              </a>{" "}
              who is responsible for facilitating the criminal record check for
              my organization
            </li>
            <li>
              <a href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/employer-organizations">
                {"I'm an employer organization"}
              </a>{" "}
              and I want to learn more about registering with the Criminal
              Records Review Program (CRRP)
            </li>
            <li>
              <a href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/volunteer-organizations">
                {"I'm a volunteer organization"}
              </a>{" "}
              and I want to register with the CRRP
            </li>
          </ul>
        </div>
        <br />

        <div>
          <h3>I need help</h3>
          <p>For applicants, contact your organization for your access code.</p>
          <p>
            For organizations, if you have a question about the online
            submission process or to register your organization, contact the
            Criminal Records Review Program (CRRP) at{" "}
            <a href="mailto:criminalrecords@gov.bc.ca">
              criminalrecords@gov.bc.ca
            </a>{" "}
            or by phone at 1-855-587-0185 (Option 2).
          </p>
        </div>
        <br />
      </div>
    </div>
  );
}

OrgValidationText.propTypes = {
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  textInput: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    textInputStyle: PropTypes.string,
    value: PropTypes.string,
    isRequired: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
