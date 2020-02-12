import React from "react";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import OrgValidationText from "../../base/orgvalidationtext/OrgValidationText";

export default function OrgValidation() {
  const header = {
    name: "eCRC"
  };

  return (
    <main>
      <Header header={header} />
      <OrgValidationText />
      <Footer />
    </main>
  );
}
