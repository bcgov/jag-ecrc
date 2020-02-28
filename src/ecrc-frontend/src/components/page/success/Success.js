import React from "react";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";

export default function Success({
  page: {
    header,
    applicant: { firstName, lastName, birthDate }
  }
}) {
  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">Success!</div>
        <div className="sidecard">Sidecards!</div>
      </div>
      <Footer />
    </main>
  );
}
