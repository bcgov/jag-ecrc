import React from "react";
import PropTypes from "prop-types";

import "./ApplicationForm.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import SimpleForm from "../../composite/simpleForm/SimpleForm";
import FullName from "../../composite/fullName/FullName";

export default function ApplicationForm({
  page: {
    header,
    applicant: {
      firstName,
      middleName,
      lastName,
      birthPlace,
      birthDate,
      sex,
      bcDLNumber,
      phoneNumber,
      emailAddress,
      street,
      city,
      province,
      postalCode,
      country,
      applicantPosition,
      organizationFacility
    }
  }
}) {
  const currentName = {
    firstName: {
      label: "First Name",
      id: "firstName",
      value: firstName,
      textInputStyle: "textinput_non_editable_gray"
    },
    middleName: {
      label: "Middle Name",
      id: "middleName",
      value: middleName,
      textInputStyle: "textinput_non_editable_gray"
    },
    lastName: {
      label: "Last Name",
      id: "lastName",
      value: lastName,
      textInputStyle: "textinput_non_editable_gray"
    }
  };

  const previousName = {
    firstName: {
      label: "First Name",
      id: "firstName"
    },
    middleName: {
      label: "Middle Name",
      id: "middleName"
    },
    lastName: {
      label: "Last Name",
      id: "lastName"
    }
  };

  const applicantInformation = {
    title: null,
    textInputs: [
      {
        label: "City and Country of Birth",
        id: "birthPlace",
        isRequired: true
      },
      {
        label: "Date of Birth",
        id: "birthDate",
        value: birthDate,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Sex",
        id: "sex",
        value: sex,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "BC Driver's Licence Number",
        id: "bcDLNumber",
        note: "(Current or Expired)"
      },
      {
        label: "Primary Phone Number",
        id: "phoneNumber",
        note: "(Include area code)",
        value: "XXX-XXX-XXXX",
        isRequired: true
      },
      {
        label: "Personal Email Address",
        id: "emailAddress",
        note: "We may use this to communicate with you about your application.",
        value: "steve@example.com",
        isRequired: true
      }
    ],
    buttons: []
  };

  const positionInformation = {
    title: "Position Information",
    textInputs: [
      {
        label: "Applicant's position/Job Title",
        id: "applicantPosition"
      },
      {
        label: "Organization Facility",
        id: "organizationFacility",
        note:
          "(Licenced Child Care Name, Adult Care Facility Name, or Contracted Company Name)"
      }
    ],
    buttons: []
  };

  const address = {
    title: "Address",
    textInputs: [
      {
        label: "Street",
        id: "street",
        value: street,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "City",
        id: "city",
        value: city,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Province",
        id: "province",
        value: province,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Postal Code",
        id: "postalCode",
        value: postalCode,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Country",
        id: "country",
        value: country,
        textInputStyle: "textinput_non_editable_gray"
      }
    ],
    buttons: []
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Criminal Record Check - Application</h1>
          <FullName title={"PERSONAL INFORMATION"} fullname={currentName} />
          <div className="heading">
            <span className="previousName">PREVIOUS NAME&nbsp;</span>
            <span className="note">
              Including alias, previous name and/or birthname
            </span>
          </div>
          <FullName title={null} fullname={previousName} />
          <span className="note">
            If you have more than one previous name, please click here to add
            them.
          </span>
          <SimpleForm simpleForm={applicantInformation} />
          <SimpleForm simpleForm={positionInformation} />
          <SimpleForm simpleForm={address} />
        </div>
        <div className="sidecard">Sidecards</div>
      </div>
      <Footer />
    </main>
  );
}
