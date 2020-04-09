/* eslint-disable camelcase */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

import "./ApplicationForm.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { SimpleForm } from "../../composite/simpleForm/SimpleForm";
import FullName from "../../composite/fullName/FullName";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";
import {
  isActionPerformed,
  generateJWTToken,
  accessJWTToken,
  isAuthorized
} from "../../../modules/AuthenticationHelper";
import Loader from "../../base/loader/Loader";

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
      emailType,
      jobTitle,
      organizationFacility,
      mailingLine1 = "",
      mailingCityNm = "",
      mailingProvinceNm = "BRITISH COLUMBIA",
      mailingPostalCodeTxt = ""
    },
    setApplicant,
    org: { defaultScheduleTypeCd },
    setError,
    provinces,
    setProvinces,
    sameAddress,
    setSameAddress
  }
}) {
  const history = useHistory();
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
  const [phoneNum, setPhoneNum] = useState(
    phoneNumber ? `+1${phoneNumber.replace(" ", "").replace("-", "")}` : ""
  );
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

  const [mailingAddressLine1, setMailingAddressLine1] = useState(mailingLine1);
  const [mailingAddressLine1Error, setMailingAddressLine1Error] = useState("");
  const [mailingCity, setMailingCity] = useState(mailingCityNm);
  const [mailingCityError, setMailingCityError] = useState("");
  const [mailingProvince, setMailingProvince] = useState(mailingProvinceNm);
  const [mailingProvinceError, setMailingProvinceError] = useState("");
  const [mailingPostalCode, setMailingPostalCode] = useState(
    mailingPostalCodeTxt
  );
  const [mailingPostalCodeError, setMailingPostalCodeError] = useState("");
  const [toggleLoader, setToggleLoader] = useState({
    loader: { width: "100%", textAlign: "center", display: "inline-block" },
    content: { display: "none" }
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!sessionStorage.getItem("org")) {
      setError({
        status: 403
      });
      history.push("/criminalrecordcheck/error");
    }
  }, []);

  useEffect(() => {
    const urlParam = queryString.parse(location.search);
    const { code } = urlParam;
    const token = sessionStorage.getItem("jwt");
    const uuid = sessionStorage.getItem("uuid");

    if (!isActionPerformed("appForm") && code) {
      Promise.all([
        axios.get(`/ecrc/protected/login?code=${code}&requestGuid=${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get(`/ecrc/protected/getProvinceList?requestGuid=${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ])
        .then(res => {
          sessionStorage.setItem("jwt", res[0].data);

          if (!isAuthorized()) {
            history.push("/");
          }

          setProvinces(res[1].data.provinces.province);

          const {
            userInfo: {
              birthdate,
              address: { street_address, locality, region, postal_code },
              gender,
              given_name,
              given_names,
              family_name,
              identity_assurance_level
            }
          } = accessJWTToken(res[0].data);

          if (identity_assurance_level < 3) {
            history.push("/criminalrecordcheck/transition");
            return;
          }

          // Convert gender text
          const formatGender = gender === "female" ? "F" : "M";

          // Convert date format
          const formatBirthDt = birthdate.split("-").join("/");

          // Convert given names
          const givenNamesArray = given_names.split(" ");

          givenNamesArray.shift();

          const formatSecondNm = givenNamesArray.join(" ");

          // Convert province name
          const regionMap = new Map([
            ["BC", "BRITISH COLUMBIA"],
            ["AB", "ALBERTA"],
            ["NL", "NEWFOUNDLAND"],
            ["PE", "PRINCE EDWARD ISLAND"],
            ["NS", "NOVA SCOTIA"],
            ["NB", "NEW BRUNSWICK"],
            ["QC", "QUEBEC"],
            ["ON", "ONTARIO"],
            ["MB", "MANITOBA"],
            ["SK", "SASKATCHEWAN"],
            ["YT", "YUKON"],
            ["NT", "NORTH WEST TERRITORIES"],
            ["NU", "NUNAVUT"]
          ]);

          let formatProvinceNm = regionMap.get(region);
          if (formatProvinceNm === undefined) {
            formatProvinceNm = "Invalid Province";
          }

          setApplicant({
            legalFirstNm: given_name,
            legalSecondNm: formatSecondNm,
            legalSurnameNm: family_name,
            birthDt: formatBirthDt,
            genderTxt: formatGender,
            addressLine1: street_address,
            cityNm: locality,
            provinceNm: formatProvinceNm,
            postalCodeTxt: postal_code,
            countryNm: "CANADA"
          });

          setToggleLoader({
            loader: { display: "none" },
            content: { display: "block" }
          });
        })
        .catch(error => {
          if (
            error &&
            error.response &&
            error.response.status &&
            error.response.data &&
            error.response.data.message
          ) {
            setError({
              status: error.response.status,
              message: error.response.data.message
            });
          }
          history.push("/criminalrecordcheck/error");
        });
    } else {
      setToggleLoader({
        loader: { display: "none" },
        content: { display: "block" }
      });
    }
  }, [setError, setProvinces]);

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
        placeholder: "City, Country",
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
        phone: true,
        placeholder: "250 555-1234",
        value: phoneNum,
        note: "(Including area code)",
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
        note: "We may use this to communicate with you about your application",
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
        label: "Applicant's Position/Job Title",
        id: "applicantPosition",
        placeholder: "Position/Job Title",
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
      placeholder: "Organization Facility",
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
    title: null,
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
    title: null,
    textInputs: [
      {
        label: "Street",
        id: "mailingAddressLine1",
        placeholder: "Street or PO Box",
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
        placeholder: "City",
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
        placeholder: "Select Province",
        value: mailingProvince,
        options: provinces,
        isRequired: true,
        errorMsg: mailingProvinceError,
        onChange: event => {
          setMailingProvince(event);
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
    buttonStyle: "btn ecrc_go_btn mr-0",
    buttonSize: "btn",
    type: "submit"
  };

  const cancelButton = {
    label: "Cancel",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const validateBirthPlace = birthPlaceTxt => {
    const re = /^[\w]+,?[ ]{1}[\w]+/;
    return re.test(birthPlaceTxt);
  };

  const validatePhoneNumber = phone => {
    return phone.length === 12;
  };

  const validateEmail = emailTxt => {
    const re = /[a-zA-Z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    return re.test(emailTxt);
  };

  const validatePostalCode = postalCode => {
    const re = /^[A-Z][0-9][A-Z][ -]*[0-9][A-Z][0-9]$/;
    return re.test(postalCode.toUpperCase());
  };

  let hasScrolled = false;

  const scrollToRef = ref => {
    if (ref && ref.current) {
      window.scrollTo(0, ref.current.offsetTop);
      hasScrolled = true;
    }
  };

  const birthLocRef = useRef(null);
  const phoneNumRef = useRef(null);
  const emailRef = useRef(null);
  const jobRef = useRef(null);
  const organizationFacilityRef = useRef(null);
  const mailingAddressLine1Ref = useRef(null);
  const mailingCityRef = useRef(null);
  const mailingProvinceRef = useRef(null);
  const mailingPostalCodeRef = useRef(null);

  const applicationVerification = () => {
    if (!isAuthorized()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      history.push("/criminalrecordcheck/error");
      return;
    }

    if (!birthLoc || !validateBirthPlace(birthLoc)) {
      setBirthPlaceError("City and country of birth are required");
      if (!hasScrolled) {
        scrollToRef(birthLocRef);
      }
    }

    if (!phoneNum) {
      setPhoneNumberError("Primary phone number is required");
      if (!hasScrolled) {
        scrollToRef(phoneNumRef);
      }
    } else if (!validatePhoneNumber(phoneNum)) {
      setPhoneNumberError("Phone number must be in the form XXX XXX-XXXX");
      if (!hasScrolled) {
        scrollToRef(phoneNumRef);
      }
    }

    if (!email) {
      setEmailAddressError("Personal email address is required");
      if (!hasScrolled) {
        scrollToRef(emailRef);
      }
    } else if (!validateEmail(email)) {
      setEmailAddressError("Email address must be in the form name@company.ca");
      if (!hasScrolled) {
        scrollToRef(emailRef);
      }
    }

    if (!job) {
      setJobTitleError("Position/job title is required");
      if (!hasScrolled) {
        scrollToRef(jobRef);
      }
    }

    if (defaultScheduleTypeCd === "WBSD" && !organizationLocation) {
      setOrganizationFacilityError("Organization facility is required");
      if (!hasScrolled) {
        scrollToRef(organizationFacilityRef);
      }
    }

    if (!sameAddress && !mailingAddressLine1) {
      setMailingAddressLine1Error("Street or PO box is required");
      if (!hasScrolled) {
        scrollToRef(mailingAddressLine1Ref);
      }
    }

    if (!sameAddress && !mailingCity) {
      setMailingCityError("City is required");
      if (!hasScrolled) {
        scrollToRef(mailingCityRef);
      }
    }

    if (!sameAddress && !mailingProvince) {
      setMailingProvinceError("Province is required");
      if (!hasScrolled) {
        scrollToRef(mailingProvinceRef);
      }
    }

    if (!sameAddress) {
      if (!mailingPostalCode) {
        setMailingPostalCodeError("Postal code is required");
        if (!hasScrolled) {
          scrollToRef(mailingPostalCodeRef);
        }
      } else if (!validatePostalCode(mailingPostalCode)) {
        setMailingPostalCodeError("Postal code must be in the form V9V 9V9");
        if (!hasScrolled) {
          scrollToRef(mailingPostalCodeRef);
        }
      }
    }

    if (
      birthLoc !== "" &&
      validateBirthPlace(birthLoc) &&
      phoneNum !== "" &&
      validatePhoneNumber(phoneNum) &&
      email !== "" &&
      validateEmail(email) &&
      job !== "" &&
      !(defaultScheduleTypeCd === "WBSD" && organizationLocation === "") &&
      ((!sameAddress &&
        mailingAddressLine1 !== "" &&
        mailingCity !== "" &&
        mailingProvince !== "" &&
        validatePostalCode(mailingPostalCode)) ||
        (sameAddress && addressLine1 && cityNm && provinceNm && postalCodeTxt))
    ) {
      const areaCode = phoneNum.slice(2, 5);
      const localCode = phoneNum.slice(5, 8);
      const phoneEnd = phoneNum.slice(8, 12);
      const formatedPhone = `${areaCode} ${localCode}-${phoneEnd}`;

      let formatedMailingPostalCode = mailingPostalCode
        .replace(/[ -]*/g, "")
        .toUpperCase();

      const postalCodeFront = formatedMailingPostalCode.slice(0, 3);
      const postalCodeEnd = formatedMailingPostalCode.slice(3, 6);
      formatedMailingPostalCode = `${postalCodeFront} ${postalCodeEnd}`;

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
        addressLine1,
        mailingLine1: sameAddress ? addressLine1 : mailingAddressLine1,
        cityNm,
        mailingCityNm: sameAddress ? cityNm : mailingCity,
        provinceNm,
        mailingProvinceNm: sameAddress ? provinceNm : mailingProvince,
        postalCodeTxt,
        mailingPostalCodeTxt: sameAddress
          ? postalCodeTxt
          : formatedMailingPostalCode,
        countryNm,
        birthPlace: birthLoc,
        driversLicNo: driversLicence,
        phoneNumber: formatedPhone,
        emailAddress: email,
        emailType: emailType || "Home",
        jobTitle: job,
        organizationFacility: organizationLocation
      });

      const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
      const newPayload = {
        ...currentPayload,
        actionsPerformed: ["appForm"]
      };
      generateJWTToken(newPayload);

      history.push("/criminalrecordcheck/informationreview");
    }

    hasScrolled = false;
  };

  const back = () => {
    const wishToRedirect = window.confirm(
      "You are in the middle of completing your eCRC. If you leave, your changes will be lost. Are you sure you would like to leave?"
    );

    if (wishToRedirect) {
      sessionStorage.clear();
      history.push("/");
    }
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
          <p>Complete the application form below to continue.</p>
          <div style={toggleLoader.loader}>
            <br />
            <br />
            <Loader page />
            <br />
            Loading... Please Wait
          </div>
          <div style={toggleLoader.content}>
            <FullName title={"PERSONAL INFORMATION"} fullname={currentName} />
            <div className="heading">
              <span className="previousHeader">PREVIOUS NAME&nbsp;</span>
              <span className="note">
                - Including birth name, previous name, maiden name, and/or alias
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
              </span>
            )}
            <div ref={birthLocRef}>
              <div ref={phoneNumRef}>
                <div ref={emailRef}>
                  <SimpleForm simpleForm={applicantInformation} />
                </div>
              </div>
            </div>
            <br />
            <div ref={jobRef}>
              <SimpleForm simpleForm={positionInformation} />
            </div>
            <br />
            <div className="smallHeading">
              <span className="simpleForm_title">Addresses</span>
            </div>
            <div className="heading">
              <span className="previousHeader">
                Current Residential Address
              </span>
            </div>
            <SimpleForm simpleForm={address} />
            <p className="heading">
              Is your current mailing address the same as your current
              residential address?&nbsp;
            </p>
            <div className="heading">
              <span>Yes&nbsp;</span>
              <input
                type="radio"
                id="yes"
                checked={sameAddress}
                onChange={e => setSameAddress(e.target.id === "yes")}
                data-testid="sameAddress"
              />
              <span>&nbsp;No&nbsp;</span>
              <input
                type="radio"
                id="no"
                checked={!sameAddress}
                onChange={e => setSameAddress(e.target.id === "yes")}
                data-testid="differentAddress"
              />
            </div>
            <br />
            <div className="heading">
              <span className="previousHeader">Current Mailing Address</span>
            </div>
            <div ref={mailingAddressLine1Ref}>
              <div ref={mailingCityRef}>
                <div ref={mailingProvinceRef}>
                  <div ref={mailingPostalCodeRef}>
                    {sameAddress && <SimpleForm simpleForm={address} />}
                    {!sameAddress && <SimpleForm simpleForm={mailing} />}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <section className="p-4">
              Entering your mailing address in this application will not update
              your BC Services Card Address. To update your BC Services Card
              information you must contact&nbsp;
              <a
                href="https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Service BC
              </a>
              ,&nbsp;
              <a
                href="https://www.icbc.com/Pages/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                ICBC
              </a>
              &nbsp;or&nbsp;
              <a
                href="https://www.addresschange.gov.bc.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AddressChangeBC
              </a>
            </section>
            <div className="buttons pt-4">
              <Button button={cancelButton} onClick={back} />
              <Button
                button={continueButton}
                onClick={applicationVerification}
              />
            </div>
          </div>
        </div>
        <div style={toggleLoader.content}>
          <div className="sidecard">
            <SideCards type={"personalinformation"} />
            <SideCards type={"collectionnotice"} />
          </div>
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
      emailType: PropTypes.string,
      jobTitle: PropTypes.string,
      organizationFacility: PropTypes.string,
      mailingLine1: PropTypes.string,
      mailingCityNm: PropTypes.string,
      mailingProvinceNm: PropTypes.string,
      mailingPostalCodeTxt: PropTypes.string
    }),
    setApplicant: PropTypes.func.isRequired,
    org: PropTypes.shape({
      defaultScheduleTypeCd: PropTypes.string.isRequired
    }),
    setError: PropTypes.func.isRequired,
    provinces: PropTypes.array,
    setProvinces: PropTypes.func,
    sameAddress: PropTypes.bool.isRequired,
    setSameAddress: PropTypes.func.isRequired
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
      emailType: "",
      jobTitle: "",
      organizationFacility: "",
      mailingLine1: "",
      mailingCityNm: "",
      mailingProvinceNm: "",
      mailingPostalCodeTxt: ""
    }
  }
};
