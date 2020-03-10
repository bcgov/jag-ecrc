import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import "./ApplicationForm.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { SimpleForm } from "../../composite/simpleForm/SimpleForm";
import FullName from "../../composite/fullName/FullName";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

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
      countryNm,
      alias1FirstNm,
      alias1SecondNm,
      alias1SurnameNm,
      alias2FirstNm,
      alias2SecondNm,
      alias2SurnameNm,
      alias3FirstNm,
      alias3SecondNm,
      alias3SurnameNm,
      birthPlace,
      driversLicNo,
      phoneNumber,
      emailAddress,
      jobTitle,
      organizationFacility
    },
    setApplicant,
    org: { defaultScheduleTypeCd }
  }
}) {
  const [toHome, setToHome] = useState(false);
  const [toInfoReview, setToInfoReview] = useState(false);
  const [previousNames, setPreviousNames] = useState({
    previousTwo: alias2FirstNm || alias2SecondNm || alias2SurnameNm,
    previousThree: alias3FirstNm || alias3SecondNm || alias3SurnameNm
  });

  const [alias1First, setAlias1First] = useState(alias1FirstNm || "");
  const [alias1Second, setAlias1Second] = useState(alias1SecondNm || "");
  const [alias1Surname, setAlias1Surname] = useState(alias1SurnameNm || "");

  const [alias2First, setAlias2First] = useState(alias2FirstNm || "");
  const [alias2Second, setAlias2Second] = useState(alias2SecondNm || "");
  const [alias2Surname, setAlias2Surname] = useState(alias2SurnameNm || "");

  const [alias3First, setAlias3First] = useState(alias3FirstNm || "");
  const [alias3Second, setAlias3Second] = useState(alias3SecondNm || "");
  const [alias3Surname, setAlias3Surname] = useState(alias3SurnameNm || "");

  const [birthLoc, setBirthLoc] = useState(birthPlace || "");
  const [birthPlaceError, setBirthPlaceError] = useState("");
  const [driversLicence, setDriversLicence] = useState(driversLicNo || "");
  const [phoneNum, setPhoneNum] = useState(phoneNumber || "");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState(emailAddress || "");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [job, setJob] = useState(jobTitle || "");
  const [jobTitleError, setJobTitleError] = useState("");
  const [organizationLocation, setOrganizationLocation] = useState(
    organizationFacility || ""
  );
  const [organizationFacilityError, setOrganizationFacilityError] = useState(
    ""
  );

  const [mailingAddressLine1, setMailingAddressLine1] = useState("");
  const [mailingAddressLine1Error, setMailingAddressLine1Error] = useState("");
  const [mailingCity, setMailingCity] = useState("");
  const [mailingCityError, setMailingCityError] = useState("");
  const [mailingProvince, setMailingProvince] = useState("");
  const [mailingProvinceError, setMailingProvinceError] = useState("");
  const [mailingPostalCode, setMailingPostalCode] = useState("");
  const [mailingPostalCodeError, setMailingPostalCodeError] = useState("");

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const payload = { authorities: ["ROLE"] };
    const token = generateJWTToken(payload);

    axios
      .get("/ecrc/protected/getProvinceList", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setProvinces(res.data.provinces.province);
      });

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
      id: "alias1First",
      value: alias1First,
      onChange: event => {
        setAlias1First(event);
      }
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "alias1Seocnd",
      value: alias1Second,
      onChange: event => {
        setAlias1Second(event);
      }
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "alias1Surname",
      value: alias1Surname,
      onChange: event => {
        setAlias1Surname(event);
      }
    }
  };

  const previousNameTwo = {
    legalFirstNm: {
      label: "First Name",
      id: "alias2First",
      value: alias2First,
      onChange: event => {
        setAlias2First(event);
      }
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "alias2Second",
      value: alias2Second,
      onChange: event => {
        setAlias2Second(event);
      }
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "alias2Surname",
      value: alias2Surname,
      onChange: event => {
        setAlias2Surname(event);
      }
    }
  };

  const previousNameThree = {
    legalFirstNm: {
      label: "First Name",
      id: "alias3First",
      value: alias3FirstNm,
      onChange: event => {
        setAlias3First(event);
      }
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "alias3Second",
      value: alias3Second,
      onChange: event => {
        setAlias3Second(event);
      }
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "alias3Surname",
      value: alias3Surname,
      onChange: event => {
        setAlias3Surname(event);
      }
    }
  };

  const applicantInformation = {
    title: null,
    textInputs: [
      {
        label: "City and Country of Birth",
        id: "birthLoc",
        isRequired: true,
        value: birthLoc,
        errorMsg: birthPlaceError,
        onChange: event => {
          setBirthLoc(event);
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
        value: driversLicence,
        note: "(Current or Expired)",
        onChange: setDriversLicence
      },
      {
        label: "Primary Phone Number",
        id: "phoneNumber",
        placeholder: "123 456 7890",
        value: phoneNum,
        note: "(Include area code)",
        isRequired: true,
        errorMsg: phoneNumberError,
        onChange: event => {
          setPhoneNum(event);
          setPhoneNumberError("");
        }
      },
      {
        label: "Personal Email Address",
        id: "emailAddress",
        note: "We may use this to communicate with you about your application.",
        placeholder: "example@test.com",
        value: email,
        isRequired: true,
        errorMsg: emailAddressError,
        onChange: event => {
          setEmail(event);
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
        value: job,
        isRequired: true,
        errorMsg: jobTitleError,
        onChange: event => {
          setJob(event);
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
      value: organizationLocation,
      note:
        "(Licenced Child Care Name, Adult Care Facility Name, or Contracted Company Name)",
      isRequired: true,
      errorMsg: organizationFacilityError,
      onChange: event => {
        setOrganizationLocation(event);
        setOrganizationFacilityError("");
      }
    });
  }

  const address = {
    title: "Current Street Address",
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

  const mailing = {
    title: "Current Mailing Address",
    textInputs: [
      {
        label: "Street",
        id: "mailingAddressLine1",
        value: mailingAddressLine1,
        isRequired: true,
        errorMsg: mailingAddressLine1Error,
        onChange: event => {
          setMailingAddressLine1(event);
          setMailingAddressLine1Error("");
        }
      },
      {
        label: "City",
        id: "mailingCityNm",
        value: mailingCity,
        isRequired: true,
        errorMsg: mailingCityError,
        onChange: event => {
          setMailingCity(event);
          setMailingCityError("");
        }
      },
      {
        label: "Province",
        id: "mailingProvinceNm",
        value: mailingProvince,
        options: provinces,
        isRequired: true,
        errorMsg: mailingProvinceError,
        onChange: event => {
          setMailingProvince(event.target.value);
          setMailingProvinceError("");
        }
      },
      {
        label: "Postal Code",
        id: "mailingPostalCodeTxt",
        value: mailingPostalCode,
        placeholder: "V9V 9V9",
        isRequired: true,
        errorMsg: mailingPostalCodeError,
        onChange: event => {
          setMailingPostalCode(event);
          setMailingPostalCodeError("");
        }
      },
      {
        label: "Country",
        id: "mailingCountryNm",
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

  const validatePhoneNumber = phone => {
    const re = /1?[ \-(]*\d{3}[ \-)]*\d{3}[ -]*\d{4}/;
    return re.test(phone);
  };

  const validateEmail = emailTxt => {
    const re = /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(emailTxt);
  };

  const validatePostalCode = postalCode => {
    const re = /[A-Z][0-9][A-Z][ -]*[0-9][A-Z][0-9]/;
    return re.test(postalCode.toUpperCase());
  };

  const applicationVerification = () => {
    if (!birthLoc) {
      setBirthPlaceError("Please enter your city and country of birth");
    }

    if (!phoneNum) {
      setPhoneNumberError("Please enter your primary phone number");
    } else if (!validatePhoneNumber(phoneNum)) {
      setPhoneNumberError(
        "Please enter a phone number in the form XXX XXX-XXXX"
      );
    }

    if (!email) {
      setEmailAddressError("Please enter your personal email address");
    } else if (!validateEmail(email)) {
      setEmailAddressError(
        "Please enter a valid email address eg. name@company.ca"
      );
    }

    if (!job) {
      setJobTitleError("Please enter your position/job title");
    }

    if (defaultScheduleTypeCd === "WBSD" && !organizationLocation) {
      setOrganizationFacilityError("Please enter your organization facility");
    }

    if (!mailingAddressLine1) {
      setMailingAddressLine1Error("Please enter your PO box or street address");
    }

    if (!mailingCity) {
      setMailingCityError("Please enter your city");
    }

    if (!mailingProvince) {
      setMailingProvinceError("Please enter your province");
    }

    if (!validatePostalCode(mailingPostalCode)) {
      setMailingPostalCodeError(
        "Please enter a valid postal code in the form V9V 9V9"
      );
    }

    if (
      birthLoc !== "" &&
      phoneNum !== "" &&
      validatePhoneNumber(phoneNum) &&
      email !== "" &&
      validateEmail(email) &&
      job !== "" &&
      !(defaultScheduleTypeCd === "WBSD" && organizationLocation === "") &&
      mailingAddressLine1 !== "" &&
      mailingCity !== "" &&
      mailingProvince !== "" &&
      validatePostalCode(mailingPostalCode)
    ) {
      // TODO: Option to save address fields based on if mailing address added...

      setApplicant({
        legalFirstNm,
        legalSecondNm,
        legalSurnameNm,
        alias1FirstNm: alias1First,
        alias1SecondNm: alias1Second,
        alias1SurnameNm: alias1Surname,
        alias2FirstNm: alias2First,
        alias2SecondNm: alias2Second,
        alias2SurnameNm: alias2Surname,
        alias3FirstNm: alias3First,
        alias3SecondNm: alias3Second,
        alias3SurnameNm: alias3Surname,
        birthDt,
        genderTxt,
        addressLine1: mailingAddressLine1,
        cityNm: mailingCity,
        provinceNm: mailingProvince,
        postalCodeTxt: mailingPostalCode,
        countryNm,
        birthPlace: birthLoc,
        driversLicNo: driversLicence,
        phoneNumber: phoneNum,
        emailAddress: email,
        jobTitle: job,
        organizationFacility: organizationLocation
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

  const mailingAddress = () => {
    setMailingAddressLine1(addressLine1);
    setMailingCity(cityNm);
    setMailingProvince(provinceNm);
    setMailingPostalCode(postalCodeTxt);
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
          {(!previousNames.previousTwo || !previousNames.previousThree) && (
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
          <p>
            Is your current street address the same as your mailing
            address?&nbsp;
            <input
              type="checkbox"
              onClick={() => {
                mailingAddress();
              }}
            />
          </p>
          <SimpleForm simpleForm={mailing} />
          <section>
            Entering your mailing address in this application will not update
            your BC Services Card Address. To update your BC Services Card
            information you must contact Service BC, ICBC, or AddressChangeBC
          </section>
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
      countryNm: PropTypes.string.isRequired,
      alias1FirstNm: PropTypes.string,
      alias1SecondNm: PropTypes.string,
      alias1SurnameNm: PropTypes.string,
      alias2FirstNm: PropTypes.string,
      alias2SecondNm: PropTypes.string,
      alias2SurnameNm: PropTypes.string,
      alias3FirstNm: PropTypes.string,
      alias3SecondNm: PropTypes.string,
      alias3SurnameNm: PropTypes.string,
      birthPlace: PropTypes.string,
      driversLicNo: PropTypes.string,
      phoneNumber: PropTypes.string,
      emailAddress: PropTypes.string,
      jobTitle: PropTypes.string,
      organizationFacility: PropTypes.string
    }),
    setApplicant: PropTypes.func.isRequired,
    org: PropTypes.shape({
      defaultScheduleTypeCd: PropTypes.string.isRequired
    })
  })
};

ApplicationForm.defaultProps = {
  page: {
    applicant: {
      alias1FirstNm: "",
      alias1SecondNm: "",
      alias1SurnameNm: "",
      alias2FirstNm: "",
      alias2SecondNm: "",
      alias2SurnameNm: "",
      alias3FirstNm: "",
      alias3SecondNm: "",
      alias3SurnameNm: "",
      birthPlace: "",
      driversLicNo: "",
      phoneNumber: "",
      emailAddress: "",
      jobTitle: "",
      organizationFacility: ""
    }
  }
};
