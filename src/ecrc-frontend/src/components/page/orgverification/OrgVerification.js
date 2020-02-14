import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "../page.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import SideCard from "../../base/sideCard/SideCard";
import { Button } from "../../base/button/Button";

export default function OrgVerification({
  page: {
    pageLayout: { header, sideCard1, sideCard2 },
    org
  }
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const orgVerification = () => {
    alert("You verified the org!");
  };

  const button = {
    label: "Verify",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <Button button={button} onClick={orgVerification} />
        </div>
        <div className="sidecard">
          <SideCard sideCard={sideCard1} />
          <SideCard sideCard={sideCard2} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

OrgVerification.propTypes = {
  page: PropTypes.shape({
    pageLayout: PropTypes.shape({
      header: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      sideCard1: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }),
      sideCard2: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
};
