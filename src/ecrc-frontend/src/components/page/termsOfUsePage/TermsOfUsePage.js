import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import TermsOfUse from "../../base/termsOfUse/TermsOfUse";
import "../page.css";

export default function TermsOfUsePage({
  page: {
    pageLayout: { header }
  }
}) {
  const [orgInput, setOrgInput] = useState("");
  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <TermsOfUse />
        </div>
      </div>
      <Footer />
    </main>
  );
}
