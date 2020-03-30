/* eslint-disable react/jsx-one-expression-per-line */
import { Redirect } from "react-router-dom";

import React, { useState, useLayoutEffect } from "react";
import { FaPrint, FaDownload } from "react-icons/fa";
import PropTypes from "prop-types";
import { Button } from "../button/Button";
import "./TermsOfUse.css";

export default function TermsOfUse({
  onContinueClick,
  checkFirstBox,
  termOfUseOnScroll,
  continueBtnEnabled,
  reachedEnd
}) {
  const [toHostHome, setToHostHome] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useLayoutEffect(() => {
    if (!isHidden) {
      window.print();
    }
    setIsHidden(true);
  }, [isHidden]);

  const button = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn mr-0",
    buttonSize: "btn ",
    type: "submit",
    disabled: !continueBtnEnabled
  };

  const cancelButton = {
    label: "Cancel and Exit",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const onCancelClicked = () => {
    setToHostHome(true);
  };

  if (toHostHome) {
    return <Redirect to="/hosthome" />;
  }

  return (
    <div>
      <div style={{ width: "100%" }}>
        <span
          role="button"
          className="print-page print"
          onKeyDown={() => {
            setIsHidden(false);
          }}
          onClick={() => {
            setIsHidden(false);
          }}
          tabIndex={0}
        >
          <FaPrint style={{ marginRight: "10px" }} />
          Print
        </span>

        <span
          className="print-page"
          role="button"
          onKeyDown={() => {
            window.open(
              "https://www2.gov.bc.ca/assets/download/66CA082E49F740D69D54C6EB8AE65820",
              "_blank"
            );
          }}
          onClick={() => {
            window.open(
              "https://www2.gov.bc.ca/assets/download/66CA082E49F740D69D54C6EB8AE65820",
              "_blank"
            );
          }}
          tabIndex={0}
        >
          <FaDownload style={{ marginRight: "10px" }} />
          Download
        </span>

        <h1>Terms of Use</h1>
      </div>

      <section
        className="scroll-box"
        onScroll={termOfUseOnScroll}
        hidden={!isHidden}
      >
        <p>
          In these Terms of Use, &quot;you&quot; or &quot;your&quot; includes
          the individual using or accessing the Electronic Criminal Record Check
          Portal (the &quot;Site&quot;) on their own behalf to submit an online
          request for a criminal record check.
        </p>
        <p>
          These Terms of Use are an agreement between you and Her Majesty the
          Queen in Right of the Province of British Columbia, represented by the
          Minister of Public Safety and Solicitor General (the
          &quot;Province&quot;) and they govern your use of the Site and, where
          applicable, any associated service (&quot;Associated Service&quot;
          and, together with the Site, the &quot;Services&quot;). By clicking
          the box to indicate that you accept these Terms of Use, and in
          consideration of your use of the Services, you agree, to the terms and
          conditions set out below.
        </p>

        <p>
          Your failure to abide by these Terms of Use may result in the
          suspension or cancellation of your use of or access to the Services.
          In addition, the Province reserves the right to pursue any remedy
          available at law or in equity.
        </p>

        <p>Please print a copy of these Terms of Use for your records.</p>

        <h2>Disclaimer:</h2>
        <ol>
          <li>
            <b>
              Reasonable efforts have been made to provide accurate, complete
              and timely information regarding the Services and the Site in
              general. However, you are encouraged to refer to the{" "}
              <i>Criminal Records Review Act</i>, any related Regulations,
              policy and other official information materials before submitting
              an online request for a CRC.
            </b>
          </li>
          <br />
          <li>
            The services are provided &quot;as is&quot;, without warranty of any
            kind including warranty of fitness for a particular purpose. Use of
            the services is entirely at your own risk and you will be liable for
            any failure to abide by these terms of use.
          </li>
          <li>
            Without limiting the general nature of the foregoing, the province
            does not represent or warrant that:
            <ol type="a">
              <li>
                The accuracy, completeness or currency of services or any
                associated information, or that any errors will be corrected;
              </li>
              <li>
                That the services will function in a timely manner or will be
                available without error, failure or interruption; or
              </li>
              <li>
                That the services will meet your expectations or requirements.
              </li>
            </ol>
          </li>
          <li>
            The Province is not responsible for the content of the Payment Site
            as defined below.
          </li>
        </ol>

        <h2>Information Collection:</h2>
        <ol start="5">
          <li>
            When you visit the Site or use the Services, certain types of
            information are automatically collected from you, through the use of
            audit logs or cookies. This information is collected, used and
            disclosed in accordance with the Province’s{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/home/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </li>
          <li>
            The date and time of your acceptance of these Terms of Use will be
            logged. This will enable you to skip this step on future visits.
            However, if these Terms of Use are modified, they will be presented
            to you upon your next following visit and you will need to accept
            the modified terms in order to continue to access the Services.
            Notwithstanding the foregoing, you are responsible for reviewing
            these Terms of Use on a regular basis to ensure that you are aware
            of any modifications that may have been made and your continued use
            of the Services constitutes your acceptance of any such modified
            Terms of Use.
          </li>
          <li>
            The information that you input on the Site may also be logged and
            attributed to you for verification purposes
          </li>
          <li>
            Any personal information that may be collected from you on this Site
            is collected, used and disclosed in accordance with the collection
            notice presented to you at the time of collection.
          </li>
        </ol>

        <h2>Authentication:</h2>
        <ol start="9">
          <li>
            You are required to have a{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Services Card
            </a>{" "}
            to login and submit an online request for a criminal record check.
          </li>
          <li>
            Each time you access the Site, you must be authenticated by
            following an external link to the{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Services Card Site
            </a>
            , following which you will be returned to, and allowed to access the
            application portions of, the Site.
          </li>
        </ol>

        <h2>Payment:</h2>
        <ol start="11">
          <li>
            You will be required to access an external payment processing site
            (&quot;Payment Site&quot;) in order to pay the criminal record check
            fee. For volunteers completing an online request for a criminal
            record check, no payment is required.
          </li>
        </ol>

        <h2>Additional Terms and Personal Information Collection:</h2>
        <ol start="12">
          <li>
            You may be required to accept additional terms and conditions in
            order to use or access an Associated Service, including the BC
            Services Card Site, and/or the Payment Site, in which case your
            access to, and use of the services offered by, those Associated
            Services or the Payment Site is governed by such additional terms.
          </li>
          <li>
            Additional personal information may be collected from you by the
            providers of the Additional Sites in accordance with their terms and
            any associated privacy statement(s).
          </li>
        </ol>

        <h2>Acceptable Use and Security:</h2>
        <ol start="14">
          <li>
            You must not:
            <ol type="a">
              <li>
                use the Services for any unlawful or inappropriate purpose,
                including hacking, data mining or other intrusion activities;
              </li>
              <li>
                input or upload any information which contains viruses, Trojan
                horses, worms, time bombs or other computer programming routines
                that may damage or interfere with the performance or function of
                the Services or any Associated Service;
              </li>
              <li>
                divulge, share, compromise or permit any other person to use
                your login and password to access the Services;
              </li>
              <li>
                take any action that might reasonably be construed as altering,
                destroying, defeating, compromising or rendering ineffective the
                security related to the Site or any Associated Service, or being
                likely to affect other users of the Services;
              </li>
              <li>
                attempt to collect any information about other users of the
                Services; or
              </li>
              <li>
                decompile, disassemble, reverse engineer or otherwise copy any
                source code associated with the Site or any Associated Service.
              </li>
            </ol>
          </li>
        </ol>

        <h2>Ownership and Non-permitted Uses:</h2>
        <ol start="15">
          <li>
            You acknowledge and agree that at all times the Province and/or the
            providers of the Additional Sites, or their respective licensors,
            are the owners of any software, hardware, servers, networks or other
            equipment used to provide the Services.
          </li>
          <li>
            You will not take any action that would be inconsistent with or
            infringe any proprietary or intellectual property rights of the
            Province, the providers of the Additional Sites or their respective
            licensors, in any software, hardware, servers, networks or other
            equipment, documentation or other information used to provide the
            Services.
          </li>
          <li>
            You will not remove or alter any proprietary symbol or notice,
            including any copyright notice, trademark or logo displayed in
            connection with the Services.
          </li>
        </ol>

        <h2>Suspension or Cancellation of Services:</h2>
        <ol start="18">
          <li>
            Your use of any of the Services may be suspended or cancelled at any
            time if:
            <ol type="a">
              <li>
                you fail to abide by these Terms of Use, or other terms and
                conditions that may be posted on any website used to access the
                Services; or
              </li>
              <li>
                the Province or the provider of any Associated Service deems
                such suspension or cancellation necessary for any good and valid
                reason.
              </li>
            </ol>
          </li>
          <li>
            The Province and any provider of any Associated Service reserve the
            right, at any time, to:
            <ol type="a">
              <li>make changes to the Services;</li>
              <li>stop providing the Services; and</li>
              <li>
                modify these Terms of Use at any time, without notice being
                provided directly to you.
              </li>
            </ol>
          </li>
        </ol>

        <h2>Limitation of Liability:</h2>
        <ol start="20">
          <li>
            In addition to the Province’s general{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/home/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Limitation of Liabilities
            </a>
            , you agree that under no circumstances will the Province or the
            provider of any Associated Service be liable to you, a
            Representative or to any other individual or entity for any direct,
            indirect, special, incidental, consequential or other loss, claim,
            injury or damage, whether foreseeable or unforeseeable (including
            without limitation claims for damages for loss of profits or
            business opportunities, use of or inability to use the Services,
            interruptions, deletion or corruption of files, loss of programs or
            information, errors, defects or delays) arising out of or in any way
            connected with your or their access to or use of the Services or any
            failure by you or them to abide by these Terms of Use and whether
            based on contract, tort, strict liability or any other legal theory.
            The previous sentence will apply even if the Province or the
            provider of any Associated Service has been specifically advised of
            the possibility of any such loss, claim, injury or damage.
          </li>
        </ol>

        <h2>Enforceability and Jurisdiction:</h2>
        <ol start="21">
          <li>
            If any term or provision of these Terms of Use is invalid, illegal
            or unenforceable, all other terms and provisions of these Terms of
            Use will nonetheless remain in full force and effect.
          </li>
          <li>
            All access to the Site or use of any Services or Associated Service
            will be governed by, and construed and interpreted in accordance
            with, the laws applicable in the Province of British Columbia,
            Canada.
          </li>
          <li>
            You hereby consent to the exclusive jurisdiction and venue of the
            courts of the Province of British Columbia, sitting in Victoria, for
            the hearing of any matter relating to or arising from these Terms of
            Use and/or your access to the Site or use of the Services or any
            Associated Service.
          </li>
        </ol>
      </section>

      <div className="print" hidden={isHidden}>
        <p>
          In these Terms of Use, &quot;you&quot; or &quot;your&quot; includes
          the individual using or accessing the Electronic Criminal Record Check
          Portal (the &quot;Site&quot;) on their own behalf to submit an online
          request for a criminal record check.
        </p>
        <p>
          These Terms of Use are an agreement between you and Her Majesty the
          Queen in Right of the Province of British Columbia, represented by the
          Minister of Public Safety and Solicitor General (the
          &quot;Province&quot;) and they govern your use of the Site and, where
          applicable, any associated service (&quot;Associated Service&quot;
          and, together with the Site, the &quot;Services&quot;). By clicking
          the box to indicate that you accept these Terms of Use, and in
          consideration of your use of the Services, you agree, to the terms and
          conditions set out below.
        </p>

        <p>
          Your failure to abide by these Terms of Use may result in the
          suspension or cancellation of your use of or access to the Services.
          In addition, the Province reserves the right to pursue any remedy
          available at law or in equity.
        </p>

        <p>Please print a copy of these Terms of Use for your records.</p>

        <h2>Disclaimer:</h2>
        <ol>
          <li>
            <b>
              Reasonable efforts have been made to provide accurate, complete
              and timely information regarding the Services and the Site in
              general. However, you are encouraged to refer to the{" "}
              <i>Criminal Records Review Act</i>, any related Regulations,
              policy and other official information materials before submitting
              an online request for a CRC.
            </b>
          </li>
          <br />
          <li>
            The services are provided “as is”, without warranty of any kind
            including warranty of fitness for a particular purpose. Use of the
            services is entirely at your own risk and you will be liable for any
            failure to abide by these terms of use.
          </li>
          <li>
            Without limiting the general nature of the foregoing, the province
            does not represent or warrant that:
            <ol type="a">
              <li>
                The accuracy, completeness or currency of services or any
                associated information, or that any errors will be corrected;
              </li>
              <li>
                That the services will function in a timely manner or will be
                available without error, failure or interruption; or
              </li>
              <li>
                That the services will meet your expectations or requirements.
              </li>
            </ol>
          </li>
          <li>
            The Province is not responsible for the content of the Payment Site
            as defined below.
          </li>
        </ol>

        <h2>Information Collection:</h2>
        <ol start="5">
          <li>
            When you visit the Site or use the Services, certain types of
            information are automatically collected from you, through the use of
            audit logs or cookies. This information is collected, used and
            disclosed in accordance with the Province’s{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/home/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </li>
          <li>
            The date and time of your acceptance of these Terms of Use will be
            logged. This will enable you to skip this step on future visits.
            However, if these Terms of Use are modified, they will be presented
            to you upon your next following visit and you will need to accept
            the modified terms in order to continue to access the Services.
            Notwithstanding the foregoing, you are responsible for reviewing
            these Terms of Use on a regular basis to ensure that you are aware
            of any modifications that may have been made and your continued use
            of the Services constitutes your acceptance of any such modified
            Terms of Use.
          </li>
          <li>
            The information that you input on the Site may also be logged and
            attributed to you for verification purposes
          </li>
          <li>
            Any personal information that may be collected from you on this Site
            is collected, used and disclosed in accordance with the collection
            notice presented to you at the time of collection.
          </li>
        </ol>

        <h2>Authentication:</h2>
        <ol start="9">
          <li>
            You are required to have a{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Services Card
            </a>{" "}
            to login and submit an online request for a criminal record check.
          </li>
          <li>
            Each time you access the Site, you must be authenticated by
            following an external link to the{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              BC Services Card Site
            </a>
            , following which you will be returned to, and allowed to access the
            application portions of, the Site.
          </li>
        </ol>

        <h2>Payment:</h2>
        <ol start="11">
          <li>
            You will be required to access an external payment processing site
            (&quot;Payment Site&quot;) in order to pay the criminal record check
            fee. For volunteers completing an online request for a criminal
            record check, no payment is required.
          </li>
        </ol>

        <h2>Additional Terms and Personal Information Collection:</h2>
        <ol start="12">
          <li>
            You may be required to accept additional terms and conditions in
            order to use or access an Associated Service, including the BC
            Services Card Site, and/or the Payment Site, in which case your
            access to, and use of the services offered by, those Associated
            Services or the Payment Site is governed by such additional terms.
          </li>
          <li>
            Additional personal information may be collected from you by the
            providers of the Additional Sites in accordance with their terms and
            any associated privacy statement(s).
          </li>
        </ol>

        <h2>Acceptable Use and Security:</h2>
        <ol start="14">
          <li>
            You must not:
            <ol type="a">
              <li>
                use the Services for any unlawful or inappropriate purpose,
                including hacking, data mining or other intrusion activities;
              </li>
              <li>
                input or upload any information which contains viruses, Trojan
                horses, worms, time bombs or other computer programming routines
                that may damage or interfere with the performance or function of
                the Services or any Associated Service;
              </li>
              <li>
                divulge, share, compromise or permit any other person to use
                your login and password to access the Services;
              </li>
              <li>
                take any action that might reasonably be construed as altering,
                destroying, defeating, compromising or rendering ineffective the
                security related to the Site or any Associated Service, or being
                likely to affect other users of the Services;
              </li>
              <li>
                attempt to collect any information about other users of the
                Services; or
              </li>
              <li>
                decompile, disassemble, reverse engineer or otherwise copy any
                source code associated with the Site or any Associated Service.
              </li>
            </ol>
          </li>
        </ol>

        <h2>Ownership and Non-permitted Uses:</h2>
        <ol start="15">
          <li>
            You acknowledge and agree that at all times the Province and/or the
            providers of the Additional Sites, or their respective licensors,
            are the owners of any software, hardware, servers, networks or other
            equipment used to provide the Services.
          </li>
          <li>
            You will not take any action that would be inconsistent with or
            infringe any proprietary or intellectual property rights of the
            Province, the providers of the Additional Sites or their respective
            licensors, in any software, hardware, servers, networks or other
            equipment, documentation or other information used to provide the
            Services.
          </li>
          <li>
            You will not remove or alter any proprietary symbol or notice,
            including any copyright notice, trademark or logo displayed in
            connection with the Services.
          </li>
        </ol>

        <h2>Suspension or Cancellation of Services:</h2>
        <ol start="18">
          <li>
            Your use of any of the Services may be suspended or cancelled at any
            time if:
            <ol type="a">
              <li>
                you fail to abide by these Terms of Use, or other terms and
                conditions that may be posted on any website used to access the
                Services; or
              </li>
              <li>
                the Province or the provider of any Associated Service deems
                such suspension or cancellation necessary for any good and valid
                reason.
              </li>
            </ol>
          </li>
          <li>
            The Province and any provider of any Associated Service reserve the
            right, at any time, to:
            <ol type="a">
              <li>make changes to the Services;</li>
              <li>stop providing the Services; and</li>
              <li>
                modify these Terms of Use at any time, without notice being
                provided directly to you.
              </li>
            </ol>
          </li>
        </ol>

        <h2>Limitation of Liability:</h2>
        <ol start="20">
          <li>
            In addition to the Province’s general{" "}
            <a
              href="https://www2.gov.bc.ca/gov/content/home/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Limitation of Liabilities
            </a>
            , you agree that under no circumstances will the Province or the
            provider of any Associated Service be liable to you, a
            Representative or to any other individual or entity for any direct,
            indirect, special, incidental, consequential or other loss, claim,
            injury or damage, whether foreseeable or unforeseeable (including
            without limitation claims for damages for loss of profits or
            business opportunities, use of or inability to use the Services,
            interruptions, deletion or corruption of files, loss of programs or
            information, errors, defects or delays) arising out of or in any way
            connected with your or their access to or use of the Services or any
            failure by you or them to abide by these Terms of Use and whether
            based on contract, tort, strict liability or any other legal theory.
            The previous sentence will apply even if the Province or the
            provider of any Associated Service has been specifically advised of
            the possibility of any such loss, claim, injury or damage.
          </li>
        </ol>

        <h2>Enforceability and Jurisdiction:</h2>
        <ol start="21">
          <li>
            If any term or provision of these Terms of Use is invalid, illegal
            or unenforceable, all other terms and provisions of these Terms of
            Use will nonetheless remain in full force and effect.
          </li>
          <li>
            All access to the Site or use of any Services or Associated Service
            will be governed by, and construed and interpreted in accordance
            with, the laws applicable in the Province of British Columbia,
            Canada.
          </li>
          <li>
            You hereby consent to the exclusive jurisdiction and venue of the
            courts of the Province of British Columbia, sitting in Victoria, for
            the hearing of any matter relating to or arising from these Terms of
            Use and/or your access to the Site or use of the Services or any
            Associated Service.
          </li>
        </ol>
      </div>

      {!reachedEnd && (
        <section>
          <p>Please scroll down to the bottom of the terms to continue.</p>
        </section>
      )}

      <section className="pt-2">
        <label htmlFor="acceptTerms">
          <input
            id="acceptTerms"
            type="checkbox"
            className="terms-cb"
            onClick={checkFirstBox}
          />
          I have read and accept the above terms of use.
          <span id="asterisk" className="mandatory">
            *
          </span>
        </label>
      </section>
      <section className="buttons pt-4">
        <Button button={cancelButton} onClick={onCancelClicked} />
        <Button button={button} onClick={onContinueClick} />
      </section>
    </div>
  );
}

TermsOfUse.propTypes = {
  onContinueClick: PropTypes.func.isRequired,
  checkFirstBox: PropTypes.func.isRequired,
  termOfUseOnScroll: PropTypes.func.isRequired,
  continueBtnEnabled: PropTypes.bool,
  reachedEnd: PropTypes.bool.isRequired
};

TermsOfUse.defaultProps = {
  continueBtnEnabled: false
};
