import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

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
      legalFirstNm,
      legalSecondNm,
      legalSurnameNm,
      birthDt,
      genderTxt,
      addressLine1,
      cityNm,
      provinceNm,
      postalCodeTxt,
      countryNm
    },
    setApplicant,
    org: { defaultScheduleTypeCd }
  }
}) {
  const [toHome, setToHome] = useState(false);
  const [toInfoReview, setToInfoReview] = useState(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentName = {
    legalFirstNm: {
      label: "First Name",
      id: "legalFirstNm",
      value: legalFirstNm,
      textInputStyle: "textinput_non_editable_gray"
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "legalSecondNm",
      value: legalSecondNm,
      textInputStyle: "textinput_non_editable_gray"
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "legalSurnameNm",
      value: legalSurnameNm,
      textInputStyle: "textinput_non_editable_gray"
    }
  };

  const previousNameOne = {
    legalFirstNm: {
      label: "First Name",
      id: "previouslegalFirstNmOne"
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "previouslegalSecondNmOne"
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "previouslegalSurnameNmOne"
    }
  };

  const previousNameTwo = {
    legalFirstNm: {
      label: "First Name",
      id: "previouslegalFirstNmTwo"
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "previouslegalSecondNmTwo"
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "previouslegalSurnameNmTwo"
    }
  };

  const previousNameThree = {
    legalFirstNm: {
      label: "First Name",
      id: "previouslegalFirstNmOneThree"
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "previouslegalSecondNmThree"
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "previouslegalSurnameNmThree"
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
        onChange: event => {
          setBirthPlace(event);
          setBirthPlaceError("");
        }
      },
      {
        label: "Date of Birth",
        id: "birthDt",
        value: birthDt,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Sex",
        id: "genderTxt",
        value: genderTxt,
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
        onChange: event => {
          setPhoneNumber(event);
          setPhoneNumberError("");
        }
      },
      {
        label: "Personal Email Address",
        id: "emailAddress",
        note: "We may use this to communicate with you about your application.",
        isRequired: true,
        errorMsg: emailAddressError,
        onChange: event => {
          setEmailAddress(event);
          setEmailAddressError("");
        }
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
        onChange: event => {
          setJobTitle(event);
          setJobTitleError("");
        }
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
      isRequired: true,
      errorMsg: organizationFacilityError,
      onChange: event => {
        setOrganizationFacility(event);
        setOrganizationFacilityError("");
      }
    });
  }

  const address = {
    title: "Address",
    textInputs: [
      {
        label: "Street",
        id: "addressLine1",
        value: addressLine1,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "City",
        id: "cityNm",
        value: cityNm,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Province",
        id: "provinceNm",
        value: provinceNm,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Postal Code",
        id: "postalCodeTxt",
        value: postalCodeTxt,
        textInputStyle: "textinput_non_editable_gray"
      },
      {
        label: "Country",
        id: "countryNm",
        value: countryNm,
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
    if (!birthPlace) {
      setBirthPlaceError("Please enter your city and country of birth");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Please enter your primary phone number");
    }

    if (!emailAddress) {
      setEmailAddressError("Please enter your personal email address");
    }

    if (!jobTitle) {
      setJobTitleError("Please enter your position/job title");
    }

    if (defaultScheduleTypeCd === "WBSD" && !organizationFacility) {
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
        legalFirstNm,
        legalSecondNm,
        legalSurnameNm,
        birthDt,
        genderTxt,
        addressLine1,
        cityNm,
        provinceNm,
        postalCodeTxt,
        countryNm,
        birthPlace,
        driversLicNo,
        phoneNumber,
        emailAddress,
        jobTitle,
        organizationFacility
      });

      setToInfoReview(true);
    }
  };

  const back = () => {
    setToHome(true);
  };

  const additionalNames = event => {
    event.preventDefault();

    if (!previousNames.previousTwo) {
      setPreviousNames({ ...previousNames, previousTwo: true });
    } else if (!previousNames.previousThree) {
      setPreviousNames({ ...previousNames, previousThree: true });
    }
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  if (toInfoReview) {
    return <Redirect to="/ecrc/informationreview" />;
  }

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
      legalFirstNm: PropTypes.string.isRequired,
      legalSecondNm: PropTypes.string.isRequired,
      legalSurnameNm: PropTypes.string.isRequired,
      birthDt: PropTypes.string.isRequired,
      genderTxt: PropTypes.string.isRequired,
      addressLine1: PropTypes.string.isRequired,
      cityNm: PropTypes.string.isRequired,
      provinceNm: PropTypes.string.isRequired,
      postalCodeTxt: PropTypes.string.isRequired,
      countryNm: PropTypes.string.isRequired
    }),
    setApplicant: PropTypes.func.isRequired,
    org: PropTypes.shape({
      defaultScheduleTypeCd: PropTypes.string.isRequired
    })
  }).isRequired
};
