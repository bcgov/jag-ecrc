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
      sessionStorage.setItem("validExit", true);
      window.open("https://justice.gov.bc.ca/eCRC/home.htm", "_self");
    }, 6000);
  }, []);
  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="transition-content col-md-8">
          {transitionReason === "notwhitelisted" && (
            <p>
              We are transitioning our client organizations currently using
              Equifax for identity verification to a new process through a{" "}
              <a
                href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                BC Services Card
              </a>
              {". Your organization hasn't"} been transitioned to the new system
              yet.
            </p>
          )}
          {transitionReason === "bcsc" && (
            <div>
              <p>
                There was an error authenticating your BC Services Card. For
                information about how to authenticate your card click&nbsp;
                <a
                  data-testid="exitApp"
                  href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/identity-and-authentication-services/bc-services-card-authentication-service"
                  rel="nofollow"
                >
                  here
                </a>
                &nbsp;or you can contact the&nbsp;
                <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/log-in-with-card/get-help">
                  BC Services Card Helpdesk
                </a>
                .
              </p>
            </div>
          )}
          <br />
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
