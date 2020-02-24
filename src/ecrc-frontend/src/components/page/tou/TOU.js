import React from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import TermsOfUse from "../../base/termsOfUse/TermsOfUse";
import "../page.css";
import { useHistory } from "react-router-dom";

export default function TOU({ page: { header } }) {
  const history = useHistory();

  const onContinueClick = () => {
    history.push("/");
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
    pageLayout: PropTypes.shape({
      header: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired,
  onContinueClick: PropTypes.func.isRequired
};
