/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import "./Transition.css";

export default function Transition({ header }) {
  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="transition-content col-md-12">
          <p>
            You are being redirected to the legacy online criminal record check
            (eCRC) application. You will be required to re-enter your access
            code to continue. If you are not redirected automatically, please
            click <a href="jsgdsg">here</a>
            {"."}
          </p>
          <br />
          <p>
            We are transitioning our client organizations currently using
            Equifax for identity verification to a new process through a{" "}
            <a href="hsgdhgs">BC Services Card account</a>
            {". Your organization hasn't"} been transitioned to the new system
            yet.
          </p>
        </div>
      </div>
      <Footer isSmallPage />
    </main>
  );
}

Transition.propTypes = {
  header: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};
