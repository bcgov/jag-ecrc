import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import Success from "./Success";
import { generateJWTToken } from "../../../modules/AuthenticationHelper";

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
  partyId: 123,
  sessionId: 456,
  invoiceId: 789,
  serviceFeeAmount: 60,
  serviceId: 987
};

const saveApplicationInfo = () => {};
const setError = () => {};

const page = {
  header,
  applicant,
  org,
  applicationInfo,
  saveApplicationInfo,
  setError
};

sessionStorage.setItem("validator", "secret");
sessionStorage.setItem("uuid", "unique123");

const newPayload = {
  actionsPerformed: [
    "infoReview",
    "appForm",
    "tou",
    "bcscRedirect",
    "orgVerification",
    "consent"
  ],
  authorities: ["Authorized", "ROLE"]
};
generateJWTToken(newPayload);

const successUrl =
  "/success?trnApproved=1&trnId=10001213&messageId=1&messageText=Approved&authCode=TEST&responseType=T&trnAmount=28.00&trnDate=3%2F4%2F2020+1%3A01%3A36+PM&trnOrderNumber=2991&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=U&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+information+is+unavailable%2E&cvdId=1&cardType=VI&trnType=P&paymentMethod=CC&ref1=Service+Id%3A+22522&ref2=CRRP+%2D+Org+Party+Id%3A+49119&ref3=&ref4=&ref5=";
const failureUrl =
  "/success?trnApproved=0&trnId=&messageId=804&messageText=Declined+%2D+Entered+Information+Cannot+Be+Authenticated&authCode=&responseType=T&trnAmount=&trnDate=3%2F2%2F2020+8%3A43%3A52+AM&trnOrderNumber=2946&trnLanguage=eng&trnCustomerName=&trnEmailAddress=&trnPhoneNumber=&avsProcessed=0&avsId=0&avsResult=0&avsAddrMatch=0&avsPostalMatch=0&avsMessage=Address+Verification+not+performed+for+this+transaction%2E&cardType=&trnType=&paymentMethod=&ref1=Service+Id%3A+22478&ref2=CRRP+%2D+Org+Party+Id%3A+49074&ref3=&ref4=&ref5=";

const LoadData = props => {
  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/private/updateServiceFinancialTxn";

  mock.onPost(API_REQUEST).reply(200, {});

  return props.children({ page });
};

const FailData = props => {
  const mock = new MockAdapter(axios);
  const API_REQUEST = "/ecrc/private/logPaymentFailure";

  mock.onPost(API_REQUEST).reply(200, {});

  return props.children({ page });
};

export const Volunteer = () => (
  <MemoryRouter>
    <Success
      page={{ ...page, org: { ...org, orgApplicantRelationship: "VOLUNTEER" } }}
    />
  </MemoryRouter>
);

export const MobileVolunteer = () => (
  <MemoryRouter>
    <Success
      page={{ ...page, org: { ...org, orgApplicantRelationship: "VOLUNTEER" } }}
    />
  </MemoryRouter>
);

export const Onetime = () => (
  <MemoryRouter>
    <Success
      page={{ ...page, org: { ...org, orgApplicantRelationship: "ONETIME" } }}
    />
  </MemoryRouter>
);

export const MobileOnetime = () => (
  <MemoryRouter>
    <Success
      page={{ ...page, org: { ...org, orgApplicantRelationship: "ONETIME" } }}
    />
  </MemoryRouter>
);

export const PaymentSuccess = () => (
  <LoadData props={page}>
    {data => (
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={data.page} />
      </MemoryRouter>
    )}
  </LoadData>
);

export const MobilePaymentSuccess = () => (
  <LoadData props={page}>
    {data => (
      <MemoryRouter initialEntries={[successUrl]}>
        <Success page={data.page} />
      </MemoryRouter>
    )}
  </LoadData>
);

export const PaymentFailure = () => (
  <FailData props={page}>
    {data => (
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={data.page} />
      </MemoryRouter>
    )}
  </FailData>
);

export const MobilePaymentFailure = () => (
  <FailData props={page}>
    {data => (
      <MemoryRouter initialEntries={[failureUrl]}>
        <Success page={data.page} />
      </MemoryRouter>
    )}
  </FailData>
);

MobileVolunteer.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};

MobilePaymentSuccess.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};

MobilePaymentFailure.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
