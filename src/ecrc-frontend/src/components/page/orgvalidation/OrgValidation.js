import React from "react";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";

export default function OrgValidation() {
  const header = {
    name: "eCRC"
  };

  return (
    <main>
      <Header header={header} />
      <Footer />
    </main>
  );
}
