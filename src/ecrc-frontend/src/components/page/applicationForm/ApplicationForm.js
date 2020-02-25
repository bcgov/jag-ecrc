import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import "./ApplicationForm.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { SimpleForm } from "../../composite/simpleForm/SimpleForm";
import FullName from "../../composite/fullName/FullName";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";

export default function ApplicationForm({
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
      country
    },
    setApplicant,
    org: { defaultScheduleTypeCd }
  }
}) {
  const [previousNames, setPreviousNames] = useState({
    previousTwo: false,
    previousThree: false
  });

  const [birthPlace, setBirthPlace] = useState("");
  const [birthPlaceError, setBirthPlaceError] = useState("");
  const [driversLicNo, setDriversLicNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [organizationFacility, setOrganizationFacility] = useState("");
  const [organizationFacilityError, setOrganizationFacilityError] = useState(
    ""
  );

  const history = useHistory();

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
        isRequired: true,
        errorMsg: birthPlaceError,
        onChange: setBirthPlace
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
        note: "(Current or Expired)",
        onChange: setDriversLicNo
      },
      {
        label: "Primary Phone Number",
        id: "phoneNumber",
        note: "(Include area code)",
        isRequired: true,
        errorMsg: phoneNumberError,
        onChange: setPhoneNumber
      },
      {
        label: "Personal Email Address",
        id: "emailAddress",
        note: "We may use this to communicate with you about your application.",
        isRequired: true,
        errorMsg: emailAddressError,
        onChange: setEmailAddress
      }
    ],
    buttons: []
  };

  const positionInformation = {
    title: "Position Information",
    textInputs: [
      {
        label: "Applicant's position/Job Title",
        id: "applicantPosition",
        isRequired: true,
        errorMsg: jobTitleError,
        onChange: setJobTitle
      }
    ],
    buttons: []
  };

  if (defaultScheduleTypeCd === "WBSD") {
    positionInformation.textInputs.push({
      label: "Organization Facility",
      id: "organizationFacility",
      note:
        "(Licenced Child Care Name, Adult Care Facility Name, or Contracted Company Name)",
      errorMsg: organizationFacilityError,
      onChange: setOrganizationFacility
    });
  }

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

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const cancelButton = {
    label: "Cancel",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const applicationVerification = () => {
    if (birthPlace === "") {
      setBirthPlaceError("Please enter a city and country of birth");
    }

    if (phoneNumber === "") {
      setPhoneNumberError("Please enter your primary phone number");
    }

    if (emailAddress === "") {
      setEmailAddressError("Please enter your personal email address");
    }

    if (jobTitle === "") {
      setJobTitleError("Please enter your position/job title");
    }

    if (defaultScheduleTypeCd === "WBSD" && organizationFacility === "") {
      setOrganizationFacilityError("Please enter your organization facility");
    }

    if (
      birthPlace !== "" &&
      phoneNumber !== "" &&
      emailAddress !== "" &&
      jobTitle !== "" &&
      !(defaultScheduleTypeCd === "WBSD" && organizationFacility === "")
    ) {
      setApplicant({
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
      });

      history.push("/");
    }
  };

  const back = () => {
    history.push("/");
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
              <button
                className="notAButton"
                type="button"
                onClick={event => additionalNames(event)}
              >
                click here to add them
              </button>
              .
            </span>
          )}
          <SimpleForm simpleForm={applicantInformation} />
          <SimpleForm simpleForm={positionInformation} />
          <SimpleForm simpleForm={address} />
          <div className="buttons">
            <Button button={cancelButton} onClick={back} />
            <Button button={continueButton} onClick={applicationVerification} />
          </div>
        </div>
        <div className="sidecard">
          <SideCards type={"personalinformation"} />
          <SideCards type={"collectionnotice"} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

ApplicationForm.propTypes = {
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
      country: PropTypes.string.isRequired
    }),
    setApplicant: PropTypes.func.isRequired,
    org: PropTypes.shape({
      defaultScheduleTypeCd: PropTypes.string.isRequired
    })
  }).isRequired
};
