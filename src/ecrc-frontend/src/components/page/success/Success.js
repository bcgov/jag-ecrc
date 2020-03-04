import React from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Table from "../../composite/table/Table";

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
    }
  }
}) {
  const location = useLocation();

  const paymentInfo = queryString.parse(location.search);
  console.log(paymentInfo);

  const receiptInfo = [
    { name: "Service Number", value: serviceId },
    { name: "First Name", value: legalFirstNm },
    { name: "Last Name", value: legalSurnameNm },
    { name: "Organization", value: orgNm }
  ];

  if (paymentInfo.trnApproved === "1") {
    receiptInfo.push({ name: "Amount", value: paymentInfo.trnAmount });
  }

  if (orgApplicantRelationship !== "VOLUNTEER") {
    receiptInfo.push({ name: "Date/Time", value: paymentInfo.trnDate });
    receiptInfo.push({
      name: "Transaction ID",
      value: paymentInfo.trnOrderNumber
    });
  }

  const receiptInfoTable = {
    header: "APPLICATION INFORMATION",
    tableElements: receiptInfo,
    tableStyle: "white"
  };
  // IF PaymentFailure: LogPaumentFailure
  if (paymentInfo.trnApproved === "0") {
    const logFailure = {
      orgTicketNumber,
      serviceId,
      applPartyId: partyId,
      sessionId,
      invoiceId,
      serviceFeeAmount,
      bcepErrorMsg: paymentInfo.messageText
    };

    console.log(logFailure);

    axios.post("/ecrc/logPaymentFailure", logFailure).then(res => {
      console.log(res);
      console.log("We didid a thing");
    });
  }

  // IF Success and not volunteer: UpdateServiceFinancialTxn?
  if (paymentInfo.trnApproved === "1") {
    const logSuccess = {
      orgTicketNumber,
      appl_Party_Id: String(partyId),
      service_Id: String(serviceId),
      cC_Authorization: paymentInfo.trnOrderNumber,
      payment_Date: paymentInfo.trnDate,
      payor_Type_Cd: "A",
      payment_Status_Cd: "A",
      session_Id: sessionId,
      invoice_Id: invoiceId,
      transaction_Id: paymentInfo.trnOrderNumber,
      transaction_Amount: paymentInfo.trnAmount
    };

    console.log(JSON.stringify(logSuccess));

    axios
      .post("/ecrc/updateServiceFinancialTxn", logSuccess)
      .then(res => {
        console.log(res);
        console.log("Saved a thing");
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          {/* Volunteer / Payment Success / Payment Failure Heading */}

          <h1>
            {orgApplicantRelationship === "VOLUNTEER" &&
              "Application Submitted"}
            {paymentInfo.trnApproved === "0" && "Payment Declined"}
            {paymentInfo.trnApproved === "1" && "Payment Approved"}
          </h1>
          {paymentInfo.trnApproved !== "0" && (
            <>
              <p>
                Thank you for submitting your application to the Criminal
                Records Review Program.
              </p>
              <p>
                Your application will be reviewed shortly. Once complete, the
                results will be provided directly to the requesting
                organization. We will contact you if further information is
                required.
              </p>
            </>
          )}
          {paymentInfo.trnApproved === "0" && (
            <>
              <span>
                Unfortunately, your payment transaction was declined. Please
                ensure you have the correct credit card information:
              </span>
              <ul className="bodyList">
                <li>16 digit credit card number</li>
                <li>3 digit CVD number</li>
                <li>Non-expired date</li>
                <li>Availale funds to transfer</li>
              </ul>
              <span>
                You may try again. Otherwise, please refer to our website for
                submission options.
              </span>
            </>
          )}
          <Table table={receiptInfoTable} />
          <div>Print Download Email?</div>
        </div>
        <div className="sidecard">Sidecards?</div>
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
      partyId: PropTypes.string.isRequired,
      sessionId: PropTypes.string.isRequired,
      invoiceId: PropTypes.string.isRequired,
      serviceFeeAmount: PropTypes.string,
      serviceId: PropTypes.string.isRequired
    })
  }).isRequired
};
