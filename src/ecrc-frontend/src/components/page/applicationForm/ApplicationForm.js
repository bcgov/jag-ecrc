import React, { useState } from "react";
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
  const [previousNames, setPreviousNames] = useState({
    previousTwo: false,
    previousThree: false
  });
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

  const previousNameOne = {
    firstName: {
      label: "First Name",
      id: "previousFirstNameOne"
    },
    middleName: {
      label: "Middle Name",
      id: "previousMiddleNameOne"
    },
    lastName: {
      label: "Last Name",
      id: "previousLastNameOne"
    }
  };

  const previousNameTwo = {
    firstName: {
      label: "First Name",
      id: "previousFirstNameTwo"
    },
    middleName: {
      label: "Middle Name",
      id: "previousMiddleNameTwo"
    },
    lastName: {
      label: "Last Name",
      id: "previousLastNameTwo"
    }
  };

  const previousNameThree = {
    firstName: {
      label: "First Name",
      id: "previousFirstNameOneThree"
    },
    middleName: {
      label: "Middle Name",
      id: "previousMiddleNameThree"
    },
    lastName: {
      label: "Last Name",
      id: "previousLastNameThree"
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
        isRequired: true
      },
      {
        label: "Personal Email Address",
        id: "emailAddress",
        note: "We may use this to communicate with you about your application.",
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

  const additionalNames = event => {
    event.preventDefault();

    if (!previousNames.previousTwo) {
      setPreviousNames({ ...previousNames, previousTwo: true });
    } else if (!previousNames.previousThree) {
      setPreviousNames({ ...previousNames, previousThree: true });
    }
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Criminal Record Check - Application</h1>
          <FullName title={"PERSONAL INFORMATION"} fullname={currentName} />
          <div className="heading">
            <span className="previousHeader">PREVIOUS NAME&nbsp;</span>
            <span className="note">
              Including alias, previous name and/or birthname
            </span>
          </div>
          <FullName title={null} fullname={previousNameOne} />
          {previousNames.previousTwo && (
            <FullName title={null} fullname={previousNameTwo} />
          )}
          {previousNames.previousThree && (
            <FullName title={null} fullname={previousNameThree} />
          )}
          {!previousNames.previousThree && (
            <span className="heading note previousFooter">
              If you have more than one previous name, please&nbsp;
              <a href="#" onClick={event => additionalNames(event)}>
                click here to add them
              </a>
              .
            </span>
          )}
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
