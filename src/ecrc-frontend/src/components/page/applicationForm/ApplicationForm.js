import React from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import SimpleForm from "../../composite/simpleForm/SimpleForm";

export default function ApplicationForm({
  page: {
    header,
    applicant: { firstName, middleName, lastName }
  }
}) {
  const applicantInformation = {
    title: "Applicant Information",
    textInputs: [firstName, middleName, lastName],
    buttons: []
  };

  console.log(applicantInformation);

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <SimpleForm simpleForm={applicantInformation} />
        </div>
        <div className="sidecard">Sidecards</div>
      </div>
      <Footer />
    </main>
  );
}

// Provided by bcsc:

// Primary Documented Surname
// Primary Documented Given Name
// Primary Documented Given Names
// User Display Name
// Birth Date
// Sex
// Street Address
// Locality
// Province
// Postal Code
// Country
