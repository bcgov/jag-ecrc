/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Declaration from "../../base/declaration/Declaration";
import { Button } from "../../base/button/Button";
import "../page.css";
import SideCards from "../../composite/sideCards/SideCards";
import {
  isAuthorized,
  accessJWTToken,
  generateJWTToken,
  isActionPerformed
} from "../../../modules/AuthenticationHelper";

export default function Consent({
  page: {
    header,
    applicant: {
      legalFirstNm,
      legalSecondNm,
      legalSurnameNm,
      alias1FirstNm,
      alias1SecondNm,
      alias1SurnameNm,
      alias2FirstNm,
      alias2SecondNm,
      alias2SurnameNm,
      alias3FirstNm,
      alias3SecondNm,
      alias3SurnameNm,
      birthDt,
      genderTxt,
      countryNm,
      mailingLine1,
      mailingCityNm,
      mailingProvinceNm,
      mailingPostalCodeTxt,
      birthPlace,
      driversLicNo,
      emailAddress,
      emailType,
      phoneNumber,
      jobTitle,
      organizationFacility
    },
    org: {
      orgNm,
      orgApplicantRelationship,
      orgTicketNumber,
      defaultScheduleTypeCd,
      defaultCrcScopeLevelCd
    },
    applicationInfo: { previousServiceId },
    setApplicationInfo,
    saveApplicant,
    saveOrg,
    saveApplicationInfo,
    setError,
    share
  }
}) {
  const history = useHistory();
  const [toHostHome, setToHostHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toError, setToError] = useState(false);
  const [firstBoxChecked, setFirstBoxChecked] = useState(false);
  const [secondBoxChecked, setSecondBoxChecked] = useState(false);
  const [thirdBoxChecked, setThirdBoxChecked] = useState(false);
  const [fourthBoxChecked, setFourthBoxChecked] = useState(false);
  const [continueBtnEnabled, setContinueBtnEnabled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);

    if (!isAuthorized() || !isActionPerformed("infoReview")) {
      setError({
        status: 403
      });
      setToError(true);
    }
  }, []);

  useEffect(() => {
    if (
      firstBoxChecked &&
      secondBoxChecked &&
      thirdBoxChecked &&
      fourthBoxChecked
    ) {
      setContinueBtnEnabled(true);
    } else {
      setContinueBtnEnabled(false);
    }
  }, [firstBoxChecked, secondBoxChecked, thirdBoxChecked, fourthBoxChecked]);

  const cancelButton = {
    label: "Cancel and Exit",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn mr-0",
    buttonSize: "btn",
    type: "submit",
    disabled: !continueBtnEnabled || loading,
    loader: loading
  };

  const cancelClick = () => {
    const wishToRedirect = window.confirm(
      "You are in the middle of completing your eCRC. If you leave, your changes will be lost. Are you sure you would like to leave?"
    );

    if (wishToRedirect) {
      sessionStorage.clear();
      setToHostHome(true);
    }
  };

  const handleError = error => {
    setToError(true);

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
    setLoading(false);
  };

  const confirm = () => {
    setLoading(true);
    sessionStorage.setItem("validExit", true);

    if (!isAuthorized()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      setToError(true);
      return;
    }
    const token = sessionStorage.getItem("jwt");
    const uuid = sessionStorage.getItem("uuid");

    const currentPayload = accessJWTToken(token);
    const newPayload = {
      ...currentPayload,
      actionsPerformed: [...currentPayload.actionsPerformed, "consent"]
    };
    generateJWTToken(newPayload);

    const createApplicantInfo = {
      orgTicketNumber,
      requestGuid: uuid,
      callPurpose: "CRC",
      legalSurnameNm,
      legalFirstNm,
      legalSecondNm,
      birthDt,
      genderTxt,
      birthPlace,
      alias1FirstNm,
      alias1SecondNm,
      alias1SurnameNm,
      alias2FirstNm,
      alias2SecondNm,
      alias2SurnameNm,
      alias3FirstNm,
      alias3SecondNm,
      alias3SurnameNm,
      phoneNumber,
      addressLine1: mailingLine1,
      cityNm: mailingCityNm,
      provinceNm: mailingProvinceNm,
      countryNm,
      postalCodeTxt: mailingPostalCodeTxt,
      driversLicNo,
      emailAddress,
      emailType
    };

    let appInfo = {
      previousServiceId
    };

    // NEED CLARIFICATION: - as per Jason Lee, awaiting confirmation
    // eivPassDetailsResults - String returned from equifax, see Shaun
    const CRC = {
      orgTicketNumber,
      requestGuid: uuid,
      scheduleTypeCd: defaultScheduleTypeCd,
      scopeLevelCd: defaultCrcScopeLevelCd,
      applPartyId: null,
      orgApplToPay: "",
      applicantPosn: jobTitle,
      childCareFacNm: organizationFacility,
      governingBodyNm: orgNm,
      sessionId: null,
      invoiceId: null,
      authReleaseEIVVendorYN: "Y",
      authConductCRCCheckYN: "Y",
      authReleaseToOrgYN: "Y",
      applIdentityVerifiedEIVYN: "Y",
      eivPassDetailsResults: "eivPassDetailsResults"
    };

    const crcApplicant = {
      requestGuid: uuid,
      returnPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
      applType: orgApplicantRelationship,
      requestCreateApplicant: createApplicantInfo,
      requestNewCRCService: CRC
    };

    axios
      .post("/ecrc/private/createNewCRCApplicant", crcApplicant, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(crcApplicantResponse => {
        const appResponseInfo = crcApplicantResponse.data;

        appInfo = {
          ...appInfo,
          ...appResponseInfo
        };

        setApplicationInfo(appInfo);
        saveApplicant();
        saveOrg();
        saveApplicationInfo(appInfo);

        if (appInfo.paymentUrl) {
          window.location.href = appInfo.paymentUrl;
          setLoading(false);
        } else {
          history.push("/criminalrecordcheck/success");
        }
      })
      .catch(error => {
        handleError(error);
      });
  };

  if (toHostHome) {
    return <Redirect to="/hosthome" />;
  }

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Consent for Criminal Record Check</h1>
          <p>
            I{", "}
            <i>
              {legalFirstNm} {legalSurnameNm}
            </i>
            {", "}consent to the following:
          </p>
          <Declaration
            checkFirstBox={() => setFirstBoxChecked(!firstBoxChecked)}
            checkSecondBox={() => setSecondBoxChecked(!secondBoxChecked)}
            checkThirdBox={() => setThirdBoxChecked(!thirdBoxChecked)}
            checkFourthBox={() => setFourthBoxChecked(!fourthBoxChecked)}
            shareConsent={share}
          />
          <div className="buttons pt-4">
            <Button button={cancelButton} onClick={cancelClick} />
            <Button button={continueButton} onClick={confirm} />
          </div>
        </div>

        <div className="sidecard">
          <SideCards type="contactinformation" />
          <SideCards type="collectionnotice" />
        </div>
      </div>
      <Footer />
    </main>
  );
}

Consent.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    applicant: PropTypes.shape({
      legalFirstNm: PropTypes.string.isRequired,
      legalSecondNm: PropTypes.string.isRequired,
      legalSurnameNm: PropTypes.string.isRequired,
      alias1FirstNm: PropTypes.string,
      alias1SecondNm: PropTypes.string,
      alias1SurnameNm: PropTypes.string,
      alias2FirstNm: PropTypes.string,
      alias2SecondNm: PropTypes.string,
      alias2SurnameNm: PropTypes.string,
      alias3FirstNm: PropTypes.string,
      alias3SecondNm: PropTypes.string,
      alias3SurnameNm: PropTypes.string,
      birthDt: PropTypes.string.isRequired,
      genderTxt: PropTypes.string.isRequired,
      countryNm: PropTypes.string.isRequired,
      mailingLine1: PropTypes.string.isRequired,
      mailingCityNm: PropTypes.string.isRequired,
      mailingProvinceNm: PropTypes.string.isRequired,
      mailingPostalCodeTxt: PropTypes.string.isRequired,
      birthPlace: PropTypes.string.isRequired,
      driversLicNo: PropTypes.string,
      emailAddress: PropTypes.string.isRequired,
      emailType: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      organizationFacility: PropTypes.string.isRequired
    }),
    org: PropTypes.shape({
      orgNm: PropTypes.string.isRequired,
      orgApplicantRelationship: PropTypes.string.isRequired,
      orgTicketNumber: PropTypes.string.isRequired,
      defaultScheduleTypeCd: PropTypes.string.isRequired,
      defaultCrcScopeLevelCd: PropTypes.string.isRequired
    }),
    applicationInfo: PropTypes.shape({
      previousServiceId: PropTypes.string
    }),
    setApplicationInfo: PropTypes.func.isRequired,
    saveApplicant: PropTypes.func.isRequired,
    saveOrg: PropTypes.func.isRequired,
    saveApplicationInfo: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    share: PropTypes.bool.isRequired
  })
};

Consent.defaultProps = {
  page: {
    applicationInfo: {
      previousServiceId: ""
    }
  }
};
