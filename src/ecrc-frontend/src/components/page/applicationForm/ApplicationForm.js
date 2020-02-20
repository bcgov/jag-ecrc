import React from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";

export default function ApplicationForm() {
  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">Main stuff</div>
        <div className="sidecard">Sidecards</div>
      </div>
      <Footer />
    </main>
  );
}
