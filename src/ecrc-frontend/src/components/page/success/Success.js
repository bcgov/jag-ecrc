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
    org: { orgApplicantRelationship, orgTicketNumber },
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
  // LogPaymentFailure when?
  // UpdateServiceFinancialTxn when?
  const paymentInfo = queryString.parse(location.search);
  console.log(paymentInfo);

  const receiptInfo = [
    { name: "Service Number", value: serviceId },
    { name: "First Name", value: legalFirstNm },
    { name: "Last Name", value: legalSurnameNm }
  ];

  if (orgApplicantRelationship !== "VOLUNTEER") {
    receiptInfo.push({ name: "Date/Time", value: paymentInfo.trnDate });
    receiptInfo.push({ name: "Amount", value: paymentInfo.trnAmount });
  }

  const receiptInfoTable = {
    header: "APPLICATION INFORMATION",
    tableElements: receiptInfo
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

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          {/* Volunteer / Payment Success / Payment Failure Heading */}

          <h1>
            {orgApplicantRelationship === "VOLUNTEER"
              ? "Application Approved"
              : paymentInfo.messageId === "804"
              ? "Payment Failed"
              : "Payment Approved"}
          </h1>

          {legalFirstNm}
          {legalSurnameNm}

          <Table table={receiptInfoTable} />

          {/* On payment: invoice details for failure success? Tables? */}
        </div>
        <div className="sidecard">Sidecards!</div>
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
      orgApplicantRelationship: PropTypes.string.isRequired
    }),
    applicationInfo: PropTypes.shape({
      partyId: PropTypes.string.isRequired,
      sessionId: PropTypes.string.isRequired,
      invoiceId: PropTypes.string.isRequired,
      serviceFeeAmount: PropTypes.string,
      serviceId: PropTypes.string.isRequired
    })
  })
};
