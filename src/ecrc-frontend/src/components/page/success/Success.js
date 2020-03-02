import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";

export default function Success({
  page: {
    header,
    applicant: { legalFirstNm, legalSurnameNm },
    org: { orgApplicantRelationship },
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

  // IF PaymentFailure: LogPaumentFailure

  // IF Success and not volunteer: UpdateServiceFinancialTxn?

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          {legalFirstNm}
          {legalSurnameNm}
          {paymentInfo.messageId === "804" ||
          orgApplicantRelationship === "VOLUNTEER"
            ? "FAILURE"
            : "Success?"}
        </div>
        <div className="sidecard">Sidecards!</div>
      </div>
      <Footer />
    </main>
  );
}
