/* eslint-disable new-cap */
/* eslint-disable no-alert */
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { FaPrint, FaDownload, FaEnvelope } from "react-icons/fa";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Table from "../../composite/table/Table";
import { Button } from "../../base/button/Button";
import {
  isActionPerformed,
  isAuthorized
} from "../../../modules/AuthenticationHelper";
import "./Success.css";

export default function Success({
  page: {
    header,
    applicant: { legalFirstNm, legalSurnameNm },
    org: { orgApplicantRelationship, orgTicketNumber, orgNm },
    applicationInfo: {
      partyId,
      sessionId,
      invoiceId,
      serviceFeeAmount,
      serviceId
    },
    saveApplicationInfo,
    setError
  }
}) {
  const location = useLocation();
  const paymentInfo = queryString.parse(location.search);
  const uuid = sessionStorage.getItem("uuid");
  const [isHidden, setIsHidden] = useState(true);
  const headerColor =
    paymentInfo.trnApproved === "0" ? "#ff0000" : "rgb(43, 153, 76)";

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      !isAuthorized() ||
      !isActionPerformed("consent") ||
      (!paymentInfo.trnApproved && orgApplicantRelationship === "EMPLOYEE")
    ) {
      setError({
        status: 403
      });
      history.push("/criminalrecordcheck/error");
    }
  }, [paymentInfo.trnApproved, orgApplicantRelationship]);

  useLayoutEffect(() => {
    if (!isHidden) {
      window.print();
    }
    setIsHidden(true);
  }, [isHidden]);

  const history = useHistory();
  let isBackClicked = false;

  history.listen((_, action) => {
    if (action === "POP") {
      // If a "POP" action event occurs, send user back to the originating location
      history.go(1);

      setTimeout(() => {
        if (!isBackClicked) {
          const wishToRedirect = window.confirm(
            "Are you sure you would like to leave this page?"
          );

          if (wishToRedirect) {
            sessionStorage.clear();
            history.push("/");
          }

          isBackClicked = true;
        }
      }, 100);
    }
  });

  const handleError = error => {
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
  };

  const receiptInfo = [
    { name: "First Name", value: legalFirstNm },
    { name: "Last Name", value: legalSurnameNm }
  ];

  if (paymentInfo.trnApproved === "1") {
    receiptInfo.unshift({ name: "Service Number", value: serviceId });
    receiptInfo.push({ name: "Organization", value: orgNm });
    receiptInfo.push({ name: "Amount", value: `$${paymentInfo.trnAmount}` });
    receiptInfo.push({ name: "Date/Time", value: paymentInfo.trnDate });
    receiptInfo.push({
      name: "Transaction ID",
      value: paymentInfo.trnOrderNumber
    });
  }

  if (paymentInfo.trnApproved === "0") {
    receiptInfo.push({ name: "Date/Time", value: paymentInfo.trnDate });
    receiptInfo.push({
      name: "Transaction ID",
      value: paymentInfo.trnOrderNumber
    });
  }

  if (orgApplicantRelationship !== "EMPLOYEE") {
    receiptInfo.unshift({ name: "Service Number", value: serviceId });
    receiptInfo.push({ name: "Organization", value: orgNm });
  }

  const cancelButton = {
    label: "Cancel and Exit",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const tryAgainButton = {
    label: "Try Again",
    buttonStyle: "btn ecrc_go_btn mr-0",
    buttonSize: "btn",
    type: "submit"
  };

  const receiptInfoTable = {
    id: "print",
    tableElements: receiptInfo,
    tableStyle: "white"
  };
  // IF PaymentFailure: LogPaymentFailure
  if (paymentInfo.trnApproved === "0") {
    const token = sessionStorage.getItem("jwt");

    const logFailure = {
      orgTicketNumber,
      requestGuid: uuid,
      serviceId,
      applPartyId: partyId,
      sessionId,
      invoiceId,
      serviceFeeAmount,
      bcepErrorMsg: paymentInfo.messageText
    };

    axios
      .post("/ecrc/private/logPaymentFailure", logFailure, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {})
      .catch(error => {
        handleError(error);
      });
  }

  // IF Success and not volunteer: UpdateServiceFinancialTxn?
  // cC_Authorization - Unsure, defer to Shaun
  // payor_Type_Cd - based on application type O for ONETIME, A otherwise
  if (paymentInfo.trnApproved === "1") {
    const token = sessionStorage.getItem("jwt");

    const paymentDateArr = paymentInfo.trnDate.split(" ")[0].split("/");

    const logSuccess = {
      orgTicketNumber,
      requestGuid: uuid,
      applPartyId: partyId,
      serviceId,
      cCAuthorization: paymentInfo.trnId,
      paymentDate: `${paymentDateArr[2]}/${paymentDateArr[0]}/${paymentDateArr[1]}`,
      payorTypeCd: "A",
      paymentStatusCd: "A",
      sessionId,
      invoiceId,
      transactionId: paymentInfo.trnId,
      transactionAmount: paymentInfo.trnAmount
    };

    axios
      .post("/ecrc/private/updateServiceFinancialTxn", logSuccess, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {})
      .catch(error => {
        handleError(error);
      });
  }

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(10);
    doc.setFontType("bold");

    const img = new Image();
    img.src = "/criminalrecordcheck/images/bc-gov-logo.png";
    doc.addImage(img, "png", 15, 5, 30, 15);

    doc.text(50, 14, "Criminal Record Check");

    doc.autoTable({ theme: "plain", html: "#print" });
    doc.save(`${serviceId}${legalSurnameNm}${legalFirstNm}.pdf`);
  };

  const retryPayment = () => {
    sessionStorage.setItem("validExit", true);
    const token = sessionStorage.getItem("jwt");

    axios
      .get(
        `/ecrc/private/getNextInvoiceId?orgTicketNumber=${orgTicketNumber}&requestGuid=${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(invoiceResponse => {
        const newInvoiceId = invoiceResponse.data.invoiceId;

        saveApplicationInfo({
          partyId,
          sessionId,
          invoiceId: newInvoiceId,
          serviceFeeAmount,
          serviceId
        });

        const createURL = {
          invoiceNumber: newInvoiceId,
          requestGuid: uuid,
          approvedPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
          declinedPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
          errorPage: `${process.env.REACT_APP_FRONTEND_BASE_URL}/criminalrecordcheck/success`,
          totalItemsAmount: serviceFeeAmount,
          serviceIdRef1: serviceId,
          partyIdRef2: partyId
        };

        return axios.post("/ecrc/private/createPaymentUrl", createURL, {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then(urlResponse => {
        window.location.href = urlResponse.data.paymentUrl;
      })
      .catch(error => {
        handleError(error);
      });
  };

  const cancelClick = () => {
    const wishToRedirect = window.confirm(
      "Are you sure you would like to leave this page?"
    );

    if (wishToRedirect) {
      sessionStorage.clear();
      history.push("/hosthome");
    }
  };

  const emailReceipt = () => {
    window.open("mailto:?subject=Criminal Record Check");
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1 style={{ color: headerColor }}>
            {orgApplicantRelationship !== "EMPLOYEE" && "Application Submitted"}
            {paymentInfo.trnApproved === "0" && "Payment Declined/Cancelled"}
            {paymentInfo.trnApproved === "1" && "Payment Approved"}
          </h1>
          {orgApplicantRelationship !== "EMPLOYEE" && (
            <>
              <p>
                Thank you for submitting your application to the Criminal
                Records Review Program.
              </p>
              <p>
                Your application will be reviewed shortly. We will contact you
                if further information is required.
              </p>
            </>
          )}
          {paymentInfo.trnApproved === "0" && (
            <>
              <p>
                The transaction has been declined, or cancelled, and payment was
                not received. Please ensure you have entered your credit card
                information correctly or try a different payment method.
              </p>
              <p>
                Otherwise, please refer to our Criminal Records Review Program
                website, or your organization, for submission options.
              </p>
            </>
          )}
          {paymentInfo.trnApproved === "1" && (
            <>
              <p>
                Thank you for submitting your application to the Criminal
                Records Review Program.
              </p>
              <p>
                Your payment has been received and your application will be
                reviewed shortly. You will be contacted if it is found to be
                incomplete or inaccurate.
              </p>
            </>
          )}
          <br />
          <div className="print">
            <div hidden={isHidden}>
              <img
                src="/criminalrecordcheck/images/bc-gov-logo.png"
                width="181"
                height="64"
                alt="B.C. Government Logo"
                style={{ marginRight: "30px" }}
              />
              <b>Criminal Record Check</b>
            </div>
            <Table table={receiptInfoTable} />
          </div>

          {paymentInfo.trnApproved === "0" && (
            <div className="buttons pt-4">
              <Button button={cancelButton} onClick={cancelClick} />
              <Button button={tryAgainButton} onClick={retryPayment} />
            </div>
          )}
        </div>

        <div className="content-success-sidecard">
          <div
            role="button"
            className="print-page-success"
            onKeyDown={() => {
              setIsHidden(false);
            }}
            onClick={() => {
              setIsHidden(false);
            }}
            tabIndex={0}
          >
            <FaPrint style={{ marginRight: "10px" }} />
            Print
          </div>
          <div
            className="print-page-success"
            role="button"
            onKeyDown={downloadPDF}
            onClick={downloadPDF}
            tabIndex={0}
          >
            <FaDownload style={{ marginRight: "10px" }} />
            Download
          </div>
          <div
            className="print-page-success"
            role="button"
            onKeyDown={emailReceipt}
            onClick={emailReceipt}
            tabIndex={0}
          >
            <FaEnvelope style={{ marginRight: "10px" }} />
            Email
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

Success.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    applicant: PropTypes.shape({
      legalFirstNm: PropTypes.string.isRequired,
      legalSurnameNm: PropTypes.string.isRequired
    }),
    org: PropTypes.shape({
      orgApplicantRelationship: PropTypes.string.isRequired,
      orgTicketNumber: PropTypes.string.isRequired,
      orgNm: PropTypes.string.isRequired
    }),
    applicationInfo: PropTypes.shape({
      partyId: PropTypes.number.isRequired,
      sessionId: PropTypes.number.isRequired,
      invoiceId: PropTypes.number.isRequired,
      serviceFeeAmount: PropTypes.number,
      serviceId: PropTypes.number.isRequired
    }),
    saveApplicationInfo: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  }).isRequired
};
