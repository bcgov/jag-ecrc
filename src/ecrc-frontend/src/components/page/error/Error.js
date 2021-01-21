import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "../page.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";

export default function Error({ page: { header, error } }) {
  const [toHome, setToHome] = useState(false);

  const homeButton = {
    label: "Home",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit"
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  let errorContent;
  if (!error) {
    errorContent = (
      <div>
        <h1>Service is currently unavailable</h1>
        <p>Please try again later.</p>
      </div>
    );
  } else if (error.status === 403) {
    if (error.message === "BCSC login failed") {
      errorContent = (
        <div>
          <h1>Login failed</h1>
          <p>
            Unable to login using your BCSC account, please try again later.
          </p>
        </div>
      );
    } else if (error.message === "User is under the age of 12") {
      errorContent = (
        <div>
          <h1>Unauthorized age group</h1>
          <p>
            To submit an online request for a criminal record check, you must be
            at least 12 years of age.
          </p>
        </div>
      );
    } else {
      errorContent = (
        <div>
          <h1>Unauthorized entry</h1>
          <p>
            Unauthorized user entry, please return to the home page and begin
            your session again.
          </p>
        </div>
      );
    }
  } else if (error.status === 590) {
    errorContent = (
      <div>
        <h1>Your session has expired</h1>
        <p>Please return to the home page and begin your session again.</p>
      </div>
    );
  } else {
    errorContent = (
      <div>
        <h1>An unknown error has occurred</h1>
        <p>
          The error description is below. If this error persists, please try
          again later.
          <br />
          <br />
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          {errorContent}
          <div className="buttons">
            <Button
              button={homeButton}
              onClick={() => {
                sessionStorage.clear();
                setToHome(true);
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

Error.propTypes = {
  page: PropTypes.shape({
    error: PropTypes.object.isRequired,
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
