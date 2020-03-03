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
    { name: "Last Name", value: legalSurnameNm }
  ];

  if (orgApplicantRelationship !== "VOLUNTEER") {
    receiptInfo.push({ name: "Date/Time", value: paymentInfo.trnDate });
    receiptInfo.push({ name: "Amount", value: paymentInfo.trnAmount });
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
      applPartyId: partyId,
      serviceId,
      // cC_Authorization?
      paymentDate: paymentInfo.trnDate,
      // payor_Type_Cd?
      // payment_Status_Cd?
      sessionId,
      invoiceId,
      // transactionId:
      transactionAmount: paymentInfo.trnAmount
    };

    axios.post("/ecrc/updateServiceFinancialTxn", logSuccess).then(res => {
      console.log(res);
      console.log("Saved a thing");
    });
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          {/* Volunteer / Payment Success / Payment Failure Heading */}

          <h1>
            {orgApplicantRelationship === "VOLUNTEER" && "Application Approved"}
            {paymentInfo.trnApproved === "0" && "Payment Failed"}
            {paymentInfo.trnApproved === "1" && "Payment Approved"}
          </h1>
          {paymentInfo.trnApproved === "1" && (
            <div>
              Your payment has been approved and a request to conduct a criminal
              record check has been submited to the Criminal Records Review
              Program ad the Ministry of Justice.
            </div>
          )}
          <div>
            The service number below can be used to help locate your file.
            Please
            <b> contact your organization </b>
            sould you have a question about your application for a criminal
            record check.
          </div>
          <Table table={receiptInfoTable} />
          <span>
            Once complete, the results will be provided directly to
            {orgNm}
            that is the organization requesting the check.
          </span>
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
