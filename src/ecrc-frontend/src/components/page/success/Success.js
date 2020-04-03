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
  const [toError, setToError] = useState(false);
  const [toHostHome, setToHostHome] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  let headerColor = paymentInfo.trnApproved === "0" ? "#ff0000" : "#00d000";

  useEffect(() => {
    window.scrollTo(0, 0);

    if (
      !isAuthorized() ||
      !isActionPerformed("consent") ||
      (!paymentInfo.trnApproved && orgApplicantRelationship !== "VOLUNTEER")
    ) {
      setError({
        status: 403
      });
      setToError(true);
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

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
  }

  const handleError = error => {
    setToError(true);
    if (error && error.response && error.response.status) {
      if (
        error.request &&
        error.request.response &&
        JSON.parse(error.request.response)
      ) {
        setError({
          status: error.response.status,
          message: JSON.parse(error.request.response).message
        });
      } else {
        setError({
          status: error.response.status,
          message: error.response.data
        });
      }
    }
  };

  const receiptInfo = [
    { name: "First Name", value: legalFirstNm },
    { name: "Last Name", value: legalSurnameNm }
  ];

  if (paymentInfo.trnApproved === "1") {
    receiptInfo.unshift({ name: "Service Number", value: serviceId });
    receiptInfo.push({ name: "Organization", value: orgNm });
    receiptInfo.push({ name: "Amount", value: paymentInfo.trnAmount });
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

  if (orgApplicantRelationship === "VOLUNTEER") {
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
      appl_Party_Id: partyId,
      service_Id: serviceId,
      cC_Authorization: paymentInfo.trnId,
      payment_Date: `${paymentDateArr[2]}/${paymentDateArr[0]}/${paymentDateArr[1]}`,
      payor_Type_Cd: "A",
      payment_Status_Cd: "A",
      session_Id: sessionId,
      invoice_Id: invoiceId,
      transaction_Id: paymentInfo.trnId,
      transaction_Amount: paymentInfo.trnAmount
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
      setToHostHome(true);
    }
  };

  if (toHostHome) {
    return <Redirect to="/hosthome" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1 style={{ color: headerColor }}>
            {orgApplicantRelationship === "VOLUNTEER" &&
              "Application Submitted"}
            {paymentInfo.trnApproved === "0" && "Payment Declined/Cancelled"}
            {paymentInfo.trnApproved === "1" && "Payment Approved"}
          </h1>
          {orgApplicantRelationship === "VOLUNTEER" && (
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

          <div className="buttons pt-4">
            <Button button={cancelButton} onClick={cancelClick} />
            <Button button={tryAgainButton} onClick={retryPayment} />
          </div>
        </div>

        <div className="content-success-sidecard">
          <p
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
          </p>
          <p
            className="print-page-success"
            role="button"
            onKeyDown={downloadPDF}
            onClick={downloadPDF}
            tabIndex={0}
          >
            <FaDownload style={{ marginRight: "10px" }} />
            Download
          </p>
          <a
            className="print-page-success"
            href="mailto:?subject=Criminal Record Check"
          >
            <FaEnvelope style={{ marginRight: "10px" }} />
            Email
          </a>
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
