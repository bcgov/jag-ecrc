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

  const toSuccess = () => {
    if (!isAuthorized()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      setToError(true);
      return;
    }

    history.push("/criminalrecordcheck/success");
  };

  const handleError = error => {
    setToError(true);
    let errorMessage = "";

    if (error && error.response && error.response.status) {
      if (error.request && error.request.response) {
        try {
          JSON.parse(error.request.response);
          errorMessage = JSON.parse(error.request.response).message;
        } catch (err) {
          errorMessage =
            "An unexpected error occurred. Please make sure all your data is entered accurately and is complete. We apologize for the inconvenience.";
        }

        setError({
          status: error.response.status,
          message: errorMessage
        });
      } else {
        setError({
          status: error.response.status,
          message: error.response.data
        });
      }
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

    let partyId;
    let sessionId;
    let invoiceId;
    let serviceFeeAmount;
    let serviceId;

    let appInfo = {
      previousServiceId
    };

    // NEED CLARIFICATION: - as per Jason Lee, awaiting confirmation
    // eivPassDetailsResults - String returned from equifax, see Shaun
    const CRC = {
      orgTicketNumber,
      requestGuid: uuid,
      schedule_Type_Cd: defaultScheduleTypeCd,
      scope_Level_Cd: defaultCrcScopeLevelCd,
      appl_Party_Id: null,
      org_Appl_To_Pay: "A",
      applicant_Posn: jobTitle,
      child_Care_Fac_Nm: organizationFacility,
      governing_Body_Nm: orgNm,
      session_Id: null,
      invoice_Id: null,
      auth_Release_EIV_Vendor_YN: "Y",
      auth_Conduct_CRC_Check_YN: "Y",
      auth_Release_To_Org_YN: "Y",
      appl_Identity_Verified_EIV_YN: "Y",
      eivPassDetailsResults: "eivPassDetailsResults"
    };

    axios
      .post("/ecrc/private/createApplicant", createApplicantInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(createApplicantResponse => {
        partyId = createApplicantResponse.data.partyId;

        if (share) {
          const shareCRC = {
            orgTicketNumber,
            applPartyId: partyId,
            scopeLevelCd: defaultCrcScopeLevelCd,
            applicantPosn: jobTitle,
            authReleaseEivVendorYN: "Y",
            authReleaseToOrgYN: "Y",
            applIdentityVerifiedEivYN: "Y",
            previousServiceId,
            eivPassDetailsResults: "eivPassDetailsResults",
            requestGuid: uuid
          };

          axios
            .post("/ecrc/private/createSharingService", shareCRC, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(createShareResponse => {
              serviceId = createShareResponse.data.serviceId;

              appInfo = {
                ...appInfo,
                serviceId
              };
              setApplicationInfo(appInfo);

              toSuccess();
              setLoading(false);
            });
        }

        return axios.get(
          `/ecrc/private/getNextSessionId?orgTicketNumber=${orgTicketNumber}&requestGuid=${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      })
      .then(getSessionResponse => {
        sessionId = getSessionResponse.data.sessionId;

        const newCRC = {
          ...CRC,
          appl_Party_Id: partyId,
          org_Appl_To_Pay: orgApplicantRelationship === "ONETIME" ? "O" : "A",
          session_Id: sessionId
        };

        return axios.post("/ecrc/private/createNewCRCService", newCRC, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(newCRCRespose => {
        serviceId = newCRCRespose.data.serviceId;

        appInfo = {
          ...appInfo,
          serviceId,
          partyId,
          sessionId
        };

        if (
          orgApplicantRelationship === "VOLUNTEER" ||
          orgApplicantRelationship === "ONETIME"
        ) {
          setApplicationInfo(appInfo);

          setLoading(false);
          toSuccess();
        }

        return Promise.all([
          axios.get(
            `/ecrc/private/getNextInvoiceId?orgTicketNumber=${orgTicketNumber}&requestGuid=${uuid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),
          axios.get(
            `/ecrc/private/getServiceFeeAmount?orgTicketNumber=${orgTicketNumber}&scheduleTypeCd=${defaultScheduleTypeCd}&scopeLevelCd=${defaultCrcScopeLevelCd}&requestGuid=${uuid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
        ]);
      })
      .then(allResponse => {
        invoiceId = allResponse[0].data.invoiceId;
        serviceFeeAmount = allResponse[1].data.serviceFeeAmount;

        appInfo = {
          ...appInfo,
          invoiceId,
          serviceFeeAmount
        };

        setApplicationInfo(appInfo);
        saveApplicant();
        saveOrg();
        saveApplicationInfo(appInfo);

        const createURL = {
          invoiceNumber: invoiceId,
          requestGuid: uuid,
          approvedPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
          declinedPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
          errorPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
          totalItemsAmount: serviceFeeAmount,
          serviceIdRef1: serviceId,
          partyIdRef2: partyId
        };

        return axios.post("/ecrc/private/createPaymentUrl", createURL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(urlResponse => {
        if (!urlResponse) {
          return;
        }

        window.location.href = urlResponse.data.paymentUrl;
        setLoading(false);
      })
      .catch(error => {
        handleError(error);
      });
  };

  if (toHostHome) {
    return <Redirect to="/hosthome" />;
  }

  const asterisk = (
    <span id="asterisk" className="mandatory">
      *
    </span>
  );

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
            In this section, you consent to a criminal background check. Please
            read the declaration before agreeing.
          </p>
          <p>You must complete all mandatory fields ({asterisk} ):</p>
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
