/* eslint-disable camelcase */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";

import "./ApplicationForm.css";
import { ToastContainer, toast } from "react-toastify";
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

import "react-toastify/dist/ReactToastify.css";

const [SURNAME_LEN, FIRSTNAME_LEN, SECONDENAME_LEN] = [40, 25, 25];
const [
  BIRTH_PLACE_LEN,
  ADDR_1_LEN,
  ADDR_2_LEN,
  CITY_LEN,
  EMAIL_ADDR_LEN,
  DRIVERS_LIC_LEN,
  APPLICANT_POSITION_LEN
] = [40, 40, 80, 25, 80, 80, 3900];

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
      addressLine2,
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
      mailingLine2 = "",
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
  const [alias1FirstError, setAlias1FirstError] = useState("");
  const [alias1Second, setAlias1Second] = useState(alias1SecondNm || "");
  const [alias1SecondError, setAlias1SecondError] = useState("");
  const [alias1Surname, setAlias1Surname] = useState(alias1SurnameNm || "");
  const [alias1SurnameError, setAlias1SurnameError] = useState("");

  const [alias2First, setAlias2First] = useState(alias2FirstNm || "");
  const [alias2FirstError, setAlias2FirstError] = useState("");
  const [alias2Second, setAlias2Second] = useState(alias2SecondNm || "");
  const [alias2SecondError, setAlias2SecondError] = useState("");
  const [alias2Surname, setAlias2Surname] = useState(alias2SurnameNm || "");
  const [alias2SurnameError, setAlias2SurnameError] = useState("");

  const [alias3First, setAlias3First] = useState(alias3FirstNm || "");
  const [alias3FirstError, setAlias3FirstError] = useState("");
  const [alias3Second, setAlias3Second] = useState(alias3SecondNm || "");
  const [alias3SecondError, setAlias3SecondError] = useState("");
  const [alias3Surname, setAlias3Surname] = useState(alias3SurnameNm || "");
  const [alias3SurnameError, setAlias3SurnameError] = useState("");

  const [birthLoc, setBirthLoc] = useState(birthPlace || "");
  const [birthPlaceError, setBirthPlaceError] = useState("");
  const [driversLicence, setDriversLicence] = useState(driversLicNo || "");
  const [driversLicenceError, setDriversLicenceError] = useState("");
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

  const [mailingAddressLine1, setMailingAddressLine1] = useState(
    mailingLine1 || ""
  );
  const [mailingAddressLine1Error, setMailingAddressLine1Error] = useState("");
  const [mailingAddressLine2, setMailingAddressLine2] = useState(
    mailingLine2 || ""
  );
  const [mailingAddressLine2Error, setMailingAddressLine2Error] = useState("");
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
  // Create a gender text Map
  const genderTxtMap = new Map([
    ["female", "F"],
    ["male", "M"],
    ["diverse", "U"],
    ["unknown", "U"]
  ]);
  const location = useLocation();

  const getAge = birthdateString => {
    const today = new Date();
    const birthdate = new Date(birthdateString);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!sessionStorage.getItem("org")) {
      setError({
        status: 403
      });
      history.push("/criminalrecordcheck/error");
    }
  }, [history, setError]);

  useEffect(() => {
    const urlParam = queryString.parse(location.search);
    const { code } = urlParam;
    const token = sessionStorage.getItem("jwt");
    const uuid = sessionStorage.getItem("uuid");

    if (!isActionPerformed("appForm") && code) {
      Promise.all([
        axios.get(
          `/ecrc/protected/login?code=${code}&requestGuid=${uuid}&returnUrl=${window.location.origin}/criminalrecordcheck/applicationform`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ),
        axios.get(`/ecrc/protected/getProvinceList?requestGuid=${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ])
        .then(res => {
          sessionStorage.setItem("jwt", res[0].data);

          if (!isAuthorized()) {
            setError({
              status: 403
            });
            history.push("/criminalrecordcheck/error");
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
          const formatGender = genderTxtMap.get(gender.toLowerCase());

          const age = getAge(birthdate);

          if (age < 12) {
            setError({
              status: 403,
              message: "User is under the age of 12"
            });
            history.push("/criminalrecordcheck/error");
          }

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

          const index = street_address.indexOf("\n");
          const addressLine_1 =
            index !== -1 ? street_address.slice(0, index) : street_address;
          const addressLine_2 =
            index !== -1 ? street_address.slice(index + 1) : "";

          setApplicant({
            legalFirstNm: given_name,
            legalSecondNm: formatSecondNm,
            legalSurnameNm: family_name,
            birthDt: formatBirthDt,
            genderTxt: formatGender,
            addressLine1: addressLine_1,
            addressLine2: addressLine_2,
            cityNm: locality,
            provinceNm: formatProvinceNm,
            postalCodeTxt: postal_code,
            countryNm: "CANADA"
          });

          setToggleLoader({
            loader: { display: "none" },
            content: { display: "block" }
          });

          if (addressLine_2 && addressLine_2.length > ADDR_2_LEN) {
            setTimeout(() => {
              toast.warn(
                `Error: additional street or PO box exceeds ${ADDR_2_LEN} characters. Please enter a valid address.`
              );
            }, 200);
          }
        })
        .catch(error => {
          if (error && error.response && error.response.status) {
            if (error.response.data && error.response.data.message) {
              setError({
                status: error.response.status,
                message: error.response.data.message
              });
            } else {
              setError({
                status: error.response.status
              });
            }
          }
          history.push("/criminalrecordcheck/error");
        });
    } else {
      setToggleLoader({
        loader: { display: "none" },
        content: { display: "block" }
      });
    }
  }, [setError, setProvinces, setApplicant, location.search]);

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
      errorMsg: alias1FirstError,
      onChange: event => {
        setAlias1First(event);
        setAlias1FirstError("");
      }
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "alias1Seocnd",
      value: alias1Second,
      errorMsg: alias1SecondError,
      onChange: event => {
        setAlias1Second(event);
        setAlias1SecondError("");
      }
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "alias1Surname",
      value: alias1Surname,
      errorMsg: alias1SurnameError,
      onChange: event => {
        setAlias1Surname(event);
        setAlias1SurnameError("");
      }
    }
  };

  const previousNameTwo = {
    legalFirstNm: {
      label: "First Name",
      id: "alias2First",
      value: alias2First,
      errorMsg: alias2FirstError,
      onChange: event => {
        setAlias2First(event);
        setAlias2FirstError("");
      }
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "alias2Second",
      value: alias2Second,
      errorMsg: alias2SecondError,
      onChange: event => {
        setAlias2Second(event);
        setAlias2SecondError("");
      }
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "alias2Surname",
      value: alias2Surname,
      errorMsg: alias2SurnameError,
      onChange: event => {
        setAlias2Surname(event);
        setAlias2SurnameError("");
      }
    }
  };

  const previousNameThree = {
    legalFirstNm: {
      label: "First Name",
      id: "alias3First",
      value: alias3First,
      errorMsg: alias3FirstError,
      onChange: event => {
        setAlias3First(event);
        setAlias3FirstError("");
      }
    },
    legalSecondNm: {
      label: "Middle Name",
      id: "alias3Second",
      value: alias3Second,
      errorMsg: alias3SecondError,
      onChange: event => {
        setAlias3Second(event);
        setAlias3SecondError("");
      }
    },
    legalSurnameNm: {
      label: "Last Name",
      id: "alias3Surname",
      value: alias3Surname,
      errorMsg: alias3SurnameError,
      onChange: event => {
        setAlias3Surname(event);
        setAlias3SurnameError("");
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
        errorMsg: driversLicenceError,
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
        label: "Additional Street",
        id: "addressLine2",
        value: addressLine2,
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
        label: "Additional Street",
        id: "mailingAddressLine2",
        placeholder: "Additional Street or PO Box",
        value: mailingAddressLine2,
        errorMsg: mailingAddressLine2Error,
        onChange: event => {
          setMailingAddressLine2(event);
          setMailingAddressLine2Error("");
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

  const fullNameRef = useRef(null);
  const birthLocRef = useRef(null);
  const phoneNumRef = useRef(null);
  const emailRef = useRef(null);
  const driversLicenceRef = useRef(null);
  const jobRef = useRef(null);
  const organizationFacilityRef = useRef(null);
  const mailingAddressLine1Ref = useRef(null);
  const mailingAddressLine2Ref = useRef(null);
  const mailingCityRef = useRef(null);
  const mailingProvinceRef = useRef(null);
  const mailingPostalCodeRef = useRef(null);

  const verifyAliasFirstNameExceedLen = (name, setName) => {
    if (name && name.length > FIRSTNAME_LEN) {
      setName(`First name can not be greater than ${FIRSTNAME_LEN} characters`);
      if (!hasScrolled) {
        scrollToRef(fullNameRef);
      }
      return true;
    }
    return false;
  };

  const verifyAliasMiddleNameExceedLen = (name, setName) => {
    if (name && name.length > SECONDENAME_LEN) {
      setName(
        `Middle name can not be greater than ${SECONDENAME_LEN} characters`
      );
      if (!hasScrolled) {
        scrollToRef(fullNameRef);
      }
      return true;
    }
    return false;
  };

  const verifyAliasSurNameExceedLen = (name, setName) => {
    if (name && name.length > SURNAME_LEN) {
      setName(`Last name can not be greater than ${SURNAME_LEN} characters`);
      if (!hasScrolled) {
        scrollToRef(fullNameRef);
      }
      return true;
    }
    return false;
  };

  const applicationVerification = () => {
    let exceedLength = false;

    if (!isAuthorized()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      history.push("/criminalrecordcheck/error");
      return;
    }

    if (sameAddress && addressLine2 && addressLine2.length > ADDR_2_LEN) {
      toast.warn(
        `Error: additional street or PO box exceeds ${ADDR_2_LEN} characters. Please enter a valid address.`
      );
      return;
    }

    exceedLength =
      verifyAliasFirstNameExceedLen(alias1First, setAlias1FirstError) ||
      exceedLength;
    exceedLength =
      verifyAliasMiddleNameExceedLen(alias1Second, setAlias1SecondError) ||
      exceedLength;
    exceedLength =
      verifyAliasSurNameExceedLen(alias1Surname, setAlias1SurnameError) ||
      exceedLength;
    exceedLength =
      verifyAliasFirstNameExceedLen(alias2First, setAlias2FirstError) ||
      exceedLength;
    exceedLength =
      verifyAliasMiddleNameExceedLen(alias3Second, setAlias2SecondError) ||
      exceedLength;
    exceedLength =
      verifyAliasSurNameExceedLen(alias3Surname, setAlias2SurnameError) ||
      exceedLength;
    exceedLength =
      verifyAliasFirstNameExceedLen(alias3First, setAlias3FirstError) ||
      exceedLength;
    exceedLength =
      verifyAliasMiddleNameExceedLen(alias3Second, setAlias3SecondError) ||
      exceedLength;
    exceedLength =
      verifyAliasSurNameExceedLen(alias3Surname, setAlias3SurnameError) ||
      exceedLength;

    if (!birthLoc || !validateBirthPlace(birthLoc)) {
      setBirthPlaceError("City and country of birth are required");
      if (!hasScrolled) {
        scrollToRef(birthLocRef);
      }
    } else if (birthLoc && birthLoc.length > BIRTH_PLACE_LEN) {
      exceedLength = true;
      setBirthPlaceError(
        `City and country of birth can not be greater than ${BIRTH_PLACE_LEN} characters`
      );
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

    if (driversLicence && driversLicence.length > DRIVERS_LIC_LEN) {
      exceedLength = true;
      setDriversLicenceError(
        "BC driver's licence number can not be greater than " +
          `${DRIVERS_LIC_LEN} characters`
      );
      if (!hasScrolled) {
        scrollToRef(driversLicenceRef);
      }
    }

    if (!email) {
      setEmailAddressError("Personal email address is required");
      if (!hasScrolled) {
        scrollToRef(emailRef);
      }
    } else if (email.length > EMAIL_ADDR_LEN) {
      exceedLength = true;
      setEmailAddressError(
        `Email address must be can not be greater than ${EMAIL_ADDR_LEN} characters`
      );
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
    } else if (job.length > APPLICANT_POSITION_LEN) {
      exceedLength = true;
      setJobTitleError(
        `Position/job title is required can not be greater than ${APPLICANT_POSITION_LEN} characters`
      );
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

    if (!sameAddress) {
      if (!mailingAddressLine1) {
        setMailingAddressLine1Error("Street or PO box is required");
        if (!hasScrolled) {
          scrollToRef(mailingAddressLine1Ref);
        }
      } else if (mailingAddressLine1.length > ADDR_1_LEN) {
        exceedLength = true;
        setMailingAddressLine1Error(
          `Street or PO box can not be greater than ${ADDR_1_LEN} characters`
        );
        if (!hasScrolled) {
          scrollToRef(mailingAddressLine1Ref);
        }
      }
    }

    if (
      !sameAddress &&
      mailingAddressLine2 &&
      mailingAddressLine2.length > ADDR_2_LEN
    ) {
      exceedLength = true;
      setMailingAddressLine2Error(
        `Additional street or PO box can not be greater than ${ADDR_2_LEN} characters`
      );
      if (!hasScrolled) {
        scrollToRef(mailingAddressLine2Ref);
      }
    }

    if (!sameAddress) {
      if (!mailingCity) {
        setMailingCityError("City is required");
        if (!hasScrolled) {
          scrollToRef(mailingCityRef);
        }
      } else if (mailingCity.length > CITY_LEN) {
        exceedLength = true;
        setMailingCityError(
          `City can not be greater than ${CITY_LEN} characters`
        );
        if (!hasScrolled) {
          scrollToRef(mailingCityRef);
        }
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
      !exceedLength &&
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
        addressLine2,
        mailingLine1: sameAddress ? addressLine1 : mailingAddressLine1,
        mailingLine2: sameAddress ? addressLine2 : mailingAddressLine2,
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
        emailType: emailType || "HOEM",
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
            <div ref={fullNameRef}>
              <FullName title={null} fullname={previousNameOne} />
              {previousNames.previousTwo && (
                <FullName title={null} fullname={previousNameTwo} />
              )}
              {previousNames.previousThree && (
                <FullName title={null} fullname={previousNameThree} />
              )}
            </div>
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
                  <div ref={driversLicenceRef}>
                    <SimpleForm simpleForm={applicantInformation} />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div ref={jobRef}>
              <div ref={organizationFacilityRef}>
                <SimpleForm simpleForm={positionInformation} />
              </div>
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
              <div ref={mailingAddressLine2Ref}>
                <div ref={mailingCityRef}>
                  <div ref={mailingProvinceRef}>
                    <div ref={mailingPostalCodeRef}>
                      {sameAddress && <SimpleForm simpleForm={address} />}
                      {!sameAddress && <SimpleForm simpleForm={mailing} />}
                    </div>
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
              .
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
      addressLine2: PropTypes.string.isRequired,
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
      mailingLine2: PropTypes.string,
      mailingCityNm: PropTypes.string,
      mailingProvinceNm: PropTypes.string,
      mailingPostalCodeTxt: PropTypes.string
    }),
    setApplicant: PropTypes.func.isRequired,
    org: PropTypes.shape({
      defaultScheduleTypeCd: PropTypes.string.isRequired
    }),
    setError: PropTypes.func.isRequired,
    provinces: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    ).isRequired,
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
      emailType: "HOEM",
      jobTitle: "",
      organizationFacility: "",
      mailingLine1: "",
      mailingLine2: "",
      mailingCityNm: "",
      mailingProvinceNm: "",
      mailingPostalCodeTxt: ""
    }
  }
};
