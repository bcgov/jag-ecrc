import React from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Table from "../../composite/table/Table";
import { Button } from "../../base/button/Button";

export default function InformationReview({
  page: {
    header,
    applicant: {
      firstName,
      middleName,
      lastName,
      birthDate,
      sex,
      street,
      city,
      province,
      postalCode,
      country,
      birthPlace,
      driversLicNo,
      phoneNumber,
      emailAddress,
      jobTitle,
      organizationFacility
    }
  }
}) {
  const personalInfoElement = [
    { name: "First Name", value: firstName },
    {
      name: "Middle Name",
      value: middleName
    },
    {
      name: "Last Name",
      value: lastName
    },
    {
      name: "Birth Place",
      value: birthPlace
    },
    {
      name: "Birth Date",
      value: birthDate
    },
    {
      name: "Sex",
      value: sex
    },
    {
      name: "Primary Phone Number",
      value: phoneNumber
    },
    {
      name: "Personal Email Address",
      value: emailAddress
    }
  ];

  const personalInfoTable = {
    header: "Personal Information",
    tableElements: personalInfoElement
  };

  const positionInfoElement = [
    {
      name: "Job Title",
      value: jobTitle
    }
  ];

  if (organizationFacility) {
    positionInfoElement.push({
      name: "Organization Facility",
      value: organizationFacility
    });
  }

  const positionInfoTable = {
    header: "Position Information",
    tableElements: positionInfoElement
  };

  const addressElement = [
    {
      name: "Street",
      value: street
    },
    {
      name: "City",
      value: city
    },
    {
      name: "Province",
      value: province
    },
    {
      name: "Postal Code",
      value: postalCode
    },
    {
      name: "Country",
      value: country
    }
  ];

  const addressTable = {
    header: "Address",
    tableElements: addressElement
  };

  const confirmButton = {
    label: "Confirm",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const confirm = () => {
    // TODO: everything required to build payment link, and redirect to said link
  };

  const cancelButton = {
    label: "Back",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const back = () => {};

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <Table table={personalInfoTable} />
          <Table table={positionInfoTable} />
          <Table table={addressTable} />
          <p>Some kind of checkbox? IIRC</p>
          <Button button={cancelButton} onClick={back} />
          <Button button={confirmButton} onClick={confirm} />
        </div>
        <div className="sidecard">sidecard</div>
      </div>
      <Footer />
    </main>
  );
}

InformationReview.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    applicant: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      birthPlace: PropTypes.string.isRequired,
      driversLicNo: PropTypes.string,
      phoneNumber: PropTypes.string.isRequired,
      emailAddress: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      organizationFacility: PropTypes.string
    })
  }).isRequired
};
