import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import TermsOfUse from "../../base/termsOfUse/TermsOfUse";
import "../page.css";

export default function TOU({ page: { header } }) {
  const onContinueClick = () => {
    return <Redirect to="/ecrc/bcscRedirect" />;
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <TermsOfUse onClick={onContinueClick} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

TOU.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired
};
