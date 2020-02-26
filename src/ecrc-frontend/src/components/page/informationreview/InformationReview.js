import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Table from "../../composite/table/Table";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";

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
  const [boxChecked, setBoxChecked] = useState(false);

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

  if (driversLicNo) {
    personalInfoElement.push({
      name: "BC Driver's Licence Number",
      value: driversLicNo
    });
  }

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
    type: "submit",
    disabled: !boxChecked
  };

  const confirm = () => {
    // TODO: Check if volunteer, if yes, success, else, cont.
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
          <section className="declareSection">
            <input
              type="checkbox"
              onClick={() => {
                setBoxChecked(!boxChecked);
              }}
            />
            <span className="declaration-cb">
              I certify that, to the best of my knowledge, the information I
              have provided on my application and will provide as necessary is
              complete, honest and accurate. I understand that a false statement
              or omission of facts herein may lead to a denial of a cannabis
              workers registration. I am also aware that later discovery of an
              omission or misrepresentation may be grounds for any finding of
              suitability to be suspended or revoked.
            </span>
          </section>
          <Button button={cancelButton} onClick={back} />
          <Button button={confirmButton} onClick={confirm} />
        </div>
        <div className="sidecard">
          <SideCards type={"collectionnotice"} />
        </div>
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