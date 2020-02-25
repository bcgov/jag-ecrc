import React from "react";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";

export default function InformationReview({ page: { header } }) {
  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">InformationReview</div>
        <div className="sidecard">sidecard</div>
      </div>
      <Footer />
    </main>
  );
}
