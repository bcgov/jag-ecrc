import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "../page.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Button from "../../base/button/Button";
export default function Error({ page: { header, error } }) {
  const [toHome, setToHome] = useState(false);

  const home = () => {
    setToHome(true);
  };

  const homeButton = {
    label: "Home",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit"
  };

  if (toHome) {
    return <Redirect to="/criminalrecordcheck/" />;
  }

  if (error === "session expired") {
    return (
      <main>
        <Header header={header} />
        <div className="page">
          <div className="content col-md-8">
            <h1>Your session has expired.</h1>
            <br />
            <p>Please return to the home page and begin your session again.</p>
            <div className="buttons">
              <Button button={homeButton} onClick={home} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  } else {
    return (
      <main>
        <Header header={header} />
        <div className="page">
          <div className="content col-md-8">
            <h1>An unknown error has occurred.</h1>
            <br />
            <p>
              Error description:
              {JSON.stringify(error)}. Please try again later.
            </p>
            <div className="buttons">
              <Button button={homeButton} onClick={home} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
}
