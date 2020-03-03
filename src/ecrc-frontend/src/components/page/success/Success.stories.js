import React from "react";
import { MemoryRouter } from "react-router-dom";

import Success from "./Success";

export default {
  title: "Success",
  component: Success
};

const header = {
  name: "Criminal Record Check"
};

const applicant = {
  legalFirstNm: "Robert",
  legalSurnameNm: "Ross"
};

const org = {
  orgApplicantRelationship: "EMPLOYEE",
  orgTicketNumber: "pbs",
  orgNm: "Public Broadcast Network"
};

const applicationInfo = {
  partyId: "123",
  sessionId: "456",
  invoiceId: "789",
  serviceFeeAmount: "60",
  serviceId: "987"
};

const page = {
  header,
  applicant,
  org,
  applicationInfo
};

const succesUrl =
  "http://localhost:3000/ecrc/success?trnApproved=1&trnId=123&messageId=200&messageText=Declined+%2D+Entered+Information+Cannot+Be+Authenticated&authCode=&responseType=T&trnAmount=60&trnDate=3%2F2%2F2020+8%3A43%3A52+AM&trnOrderNumber=2946&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=0&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+Verification+not+performed+for+this+transaction%2E&cardType=Visa&trnType=&paymentMethod=&ref1=Service+Id%3A+22478&ref2=CRRP+%2D+Org+Party+Id%3A+49074&ref3=&ref4=&ref5=";
const failureUrl =
  "http://localhost:3000/ecrc/success?trnApproved=0&trnId=&messageId=804&messageText=Declined+%2D+Entered+Information+Cannot+Be+Authenticated&authCode=&responseType=T&trnAmount=&trnDate=3%2F2%2F2020+8%3A43%3A52+AM&trnOrderNumber=2946&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=0&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+Verification+not+performed+for+this+transaction%2E&cardType=&trnType=&paymentMethod=&ref1=Service+Id%3A+22478&ref2=CRRP+%2D+Org+Party+Id%3A+49074&ref3=&ref4=&ref5=";

export const Volunteer = () => (
  <MemoryRouter initialEntries={["http://localhost:3000/ecrc/success"]}>
    <Success
      page={{ ...page, org: { ...org, orgApplicantRelationship: "VOLUNTEER" } }}
    />
  </MemoryRouter>
);

export const PaymentSuccess = () => (
  <MemoryRouter initialEntries={[succesUrl]}>
    <Success page={page} />
  </MemoryRouter>
);

export const PaymentFailure = () => (
  <MemoryRouter initialEntries={[failureUrl]}>
    <Success page={page} />
  </MemoryRouter>
);
