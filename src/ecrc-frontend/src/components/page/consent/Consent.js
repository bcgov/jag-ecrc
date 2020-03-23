/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
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
      mailingAddressLine1,
      mailingCity,
      mailingProvince,
      mailingPostalCode,
      birthPlace,
      driversLicNo,
      phoneNumber,
      jobTitle
    },
    org: {
      orgApplicantRelationship,
      orgTicketNumber,
      defaultScheduleTypeCd,
      defaultCrcScopeLevelCd
    },
    setApplicationInfo,
    saveApplicant,
    saveOrg,
    saveApplicationInfo,
    setError
  }
}) {
  const [toAppHome, setToAppHome] = useState(false);
  const [toHome, setToHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toSuccess, setToSuccess] = useState(false);
  const [toError, setToError] = useState(false);
  const [firstBoxChecked, setFirstBoxChecked] = useState(false);
  const [secondBoxChecked, setSecondBoxChecked] = useState(false);
  const [thirdBoxChecked, setThirdBoxChecked] = useState(false);
  const [continueBtnEnabled, setContinueBtnEnabled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthorized() || !isActionPerformed("infoReview")) {
      setToAppHome(true);
    }
  }, []);

  useEffect(() => {
    if (firstBoxChecked && secondBoxChecked && thirdBoxChecked) {
      setContinueBtnEnabled(true);
    } else {
      setContinueBtnEnabled(false);
    }
  }, [firstBoxChecked, secondBoxChecked, thirdBoxChecked]);

  const cancelButton = {
    label: "Cancel and Exit",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit",
    disabled: !continueBtnEnabled,
    loader: loading
  };

  const confirm = () => {
    setLoading(true);

    if (!isAuthorized()) {
      setError("session expired");
      setToError(true);
      return;
    }
    const token = sessionStorage.getItem("jwt");
    const uuid = sessionStorage.getItem("uuid");

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
      addressLine1: mailingAddressLine1,
      cityNm: mailingCity,
      provinceNm: mailingProvince,
      countryNm,
      postalCodeTxt: mailingPostalCode,
      driversLicNo
    };

    let partyId;
    let sessionId;
    let invoiceId;
    let serviceFeeAmount;
    let serviceId;

    Promise.all([
      axios.post("/ecrc/private/createApplicant", createApplicantInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get(
        `/ecrc/private/getNextSessionId?orgTicketNumber=${orgTicketNumber}&requestGuid=${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ),
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
    ])
      .then(all => {
        partyId = all[0].data.partyId;
        sessionId = all[1].data.sessionId;
        invoiceId = all[2].data.invoiceId;
        serviceFeeAmount = all[3].data.serviceFeeAmount;

        // NEED CLARIFICATION: - as per Jason Lee, awaiting confirmation
        // eivPassDetailsResults - String returned from equifax, see Shaun
        const newCRC = {
          orgTicketNumber,
          requestGuid: uuid,
          schedule_Type_Cd: defaultScheduleTypeCd,
          scope_Level_Cd: defaultCrcScopeLevelCd,
          appl_Party_Id: partyId,
          org_Appl_To_Pay: "A",
          applicant_Posn: jobTitle,
          child_Care_Fac_Nm: "child_Care_Fac_Nm",
          governing_Body_Nm: "governing_Body_Nm",
          session_Id: sessionId,
          invoice_Id: invoiceId,
          auth_Release_EIV_Vendor_YN: "Y",
          auth_Conduct_CRC_Check_YN: "Y",
          auth_Release_To_Org_YN: "Y",
          appl_Identity_Verified_EIV_YN: "Y",
          eivPassDetailsResults: "eivPassDetailsResults"
        };

        return axios.post("/ecrc/private/createNewCRCService", newCRC, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(crcResponse => {
        serviceId = crcResponse.data.serviceId;

        const appInfo = {
          partyId,
          sessionId,
          invoiceId,
          serviceFeeAmount,
          serviceId
        };

        setApplicationInfo(appInfo);

        if (orgApplicantRelationship === "VOLUNTEER") {
          setToSuccess(true);
        } else {
          saveApplicant();
          saveOrg();
          saveApplicationInfo(appInfo);

          const createURL = {
            invoiceNumber: invoiceId,
            requestGuid: uuid,
            approvedPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/ecrc/success`,
            declinedPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/ecrc/success`,
            errorPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/ecrc/success`,
            totalItemsAmount: serviceFeeAmount,
            serviceIdRef1: serviceId,
            partyIdRef2: partyId
          };

          const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
          const newPayload = {
            ...currentPayload,
            actionsPerformed: [...currentPayload.actionsPerformed, "infoReview"]
          };
          generateJWTToken(newPayload);

          axios
            .post("/ecrc/private/createPaymentUrl", createURL, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(urlResponse => {
              window.location.href = urlResponse.data.paymentUrl;
            });
        }
      })
      .catch(() => {});
  };

  if (toHome) {
    return <Redirect to="/hosthome" />;
  }

  if (toAppHome) {
    return <Redirect to="/" />;
  }

  if (toSuccess) {
    if (!isAuthorized()) {
      setError("session expired");
      return setToError(true);
    }

    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const newPayload = {
      ...currentPayload,
      actionsPerformed: [...currentPayload.actionsPerformed, "consent"]
    };
    generateJWTToken(newPayload);
    return <Redirect to="/criminalrecordcheck/success" />;
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
            style={{ paddingBottom: "30px" }}
            checkFirstBox={() => setFirstBoxChecked(!firstBoxChecked)}
            checkSecondBox={() => setSecondBoxChecked(!secondBoxChecked)}
            checkThirdBox={() => setThirdBoxChecked(!thirdBoxChecked)}
          />
          <br />
          <div className="buttons" style={{ paddingLeft: "20px" }}>
            <Button
              button={cancelButton}
              onClick={() => {
                setToHome(true);
              }}
            />
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
      addressLine1: PropTypes.string.isRequired,
      cityNm: PropTypes.string.isRequired,
      provinceNm: PropTypes.string.isRequired,
      postalCodeTxt: PropTypes.string.isRequired,
      countryNm: PropTypes.string.isRequired,
      mailingAddressLine1: PropTypes.string.isRequired,
      mailingCity: PropTypes.string.isRequired,
      mailingProvince: PropTypes.string.isRequired,
      mailingPostalCode: PropTypes.string.isRequired,
      birthPlace: PropTypes.string.isRequired,
      driversLicNo: PropTypes.string,
      phoneNumber: PropTypes.string.isRequired,
      emailAddress: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      organizationFacility: PropTypes.string
    }),
    org: PropTypes.shape({
      orgApplicantRelationship: PropTypes.string.isRequired,
      orgTicketNumber: PropTypes.string.isRequired,
      defaultScheduleTypeCd: PropTypes.string.isRequired,
      defaultCrcScopeLevelCd: PropTypes.string.isRequired
    }),
    setApplicationInfo: PropTypes.func.isRequired,
    saveApplicant: PropTypes.func.isRequired,
    saveOrg: PropTypes.func.isRequired,
    saveApplicationInfo: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  }).isRequired
};
