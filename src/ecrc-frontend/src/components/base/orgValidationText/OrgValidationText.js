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
      <h2>Please be advised that our system will be undergoing scheduled maintenance from 3:00pm on July 26 until 9:00am on July 29. During this time, the system will be unavailable. </h2>
      <h1>Criminal Record Check</h1>
      <p>
        In British Columbia, if you work or volunteer with, or have the
        potential for unsupervised access to children and/or vulnerable adults,
        you are required to complete a criminal record check. This portal
        enables you to easily apply for a criminal record check under the{" "}
        <a
          href="http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/00_96086_01"
          target="_blank"
          rel="noopener noreferrer"
        >
          Criminal Records Review Act.
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
            <li>{"Be at least 12 years of age as of today's date."}</li>
            <li>Have an access code provided by your organization.</li>
            <li>
              Have your identity verified by using your{" "}
              <a
                href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                BC Services Card.
              </a>{" "}
              The BC Services Card provides secure access to government online
              services.
            </li>
            <li>
              If you do not have a BC Services Card or if you live outside of
              the province, please contact your organization for a manual
              consent form.
            </li>
          </ul>
        </div>

        <div>
          <br />
          <h3>{"I'm ready"}</h3>
          <div style={{ float: "left", marginRight: "30px" }}>
            <TextInput textInput={textInput} onChange={onChange} />
            <div style={{ maxWidth: "350px" }}>
              <p>
                Enter the access code provided by your organization. An access
                code is required to proceed with the online submission
                <span id="asterisk" className="mandatory">
                  *
                </span>
              </p>
            </div>
          </div>
          <div>
            <Button button={button} onClick={onClick} />
          </div>
          <div style={{ clear: "both" }} />
        </div>
        <br />

        <div className="mt-4">
          <h3>I need more information</h3>
          <ul className="bodyList">
            <li>
              I&apos;m an employee or a volunteer and I want to know{" "}
              <a
                href="http://www.rcmp-grc.gc.ca/en/types-criminal-background-checks"
                target="_blank"
                rel="noopener noreferrer"
              >
                why I need to apply for a criminal record check
              </a>
            </li>

            <li>
              <a
                href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/authorized-contacts"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"I'm an authorized contact"}
              </a>{" "}
              who is responsible for facilitating the criminal record check for
              my organization
            </li>
            <li>
              <a
                href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/employer-organizations"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"I'm an employer organization"}
              </a>{" "}
              and I want to learn more about registering with the Criminal
              Records Review Program (CRRP)
            </li>
            <li>
              <a
                href="https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/volunteer-organizations"
                target="_blank"
                rel="noopener noreferrer"
              >
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
