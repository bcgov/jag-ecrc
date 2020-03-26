/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import "./Transition.css";

export default function Transition({
  page: { header, transitionReason = "bcsc" }
}) {
  useEffect(() => {
    setTimeout(() => {
      window.open("https://justice.gov.bc.ca/eCRC/home.htm");
    }, 4000);
  }, []);

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="transition-content col-md-8">
          <p>
            You are being redirected to the legacy online criminal record check
            (eCRC) application. You will be required to re-enter your access
            code to continue. If you are not redirected automatically, please
            click <a href="https://justice.gov.bc.ca/eCRC/home.htm">here</a>
            {"."}
          </p>
          <br />
          {transitionReason === "notwhitelisted" && (
            <p>
              We are transitioning our client organizations currently using
              Equifax for identity verification to a new process through a{" "}
              <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card">
                BC Services Card account
              </a>
              {". Your organization hasn't"} been transitioned to the new system
              yet.
            </p>
          )}
          {transitionReason === "bcsc" && (
            <p>
              We require users to have a photo BC Services Card to access the
              Criminal Record Check at this time.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

Transition.defaultProps = {
  page: {
    transitionReason: "bcsc"
  }
};

Transition.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    transitionReason: PropTypes.string
  })
};
