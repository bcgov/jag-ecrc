import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Table from "../../composite/table/Table";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";

export default function InformationReview({
  page: {
    header,
    applicant: {
      legalFirstNm,
      legalSecondNm,
      legalSurnameNm,
      birthDt,
      genderTxt,
      addressLine1,
      cityNm,
      provinceNm,
      postalCodeTxt,
      countryNm,
      birthPlace,
      driversLicNo,
      phoneNumber,
      emailAddress,
      jobTitle,
      organizationFacility
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
    saveApplicationInfo
  }
}) {
  const [toBack, setToBack] = useState(false);
  const [toSuccess, setToSuccess] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const personalInfoElement = [
    { name: "First Name", value: legalFirstNm },
    {
      name: "Middle Name",
      value: legalSecondNm
    },
    {
      name: "Last Name",
      value: legalSurnameNm
    },
    {
      name: "City and Country of Birth",
      value: birthPlace
    },
    {
      name: "Birth Date",
      value: birthDt
    },
    {
      name: "Sex",
      value: genderTxt
    }
  ];

  if (driversLicNo) {
    personalInfoElement.push({
      name: "BC Driver's Licence",
      value: driversLicNo
    });
  }

  const personalInfoTable = {
    header: "PERSONAL INFORMATION",
    tableElements: personalInfoElement
  };

  const positionInfoElement = [
    {
      name: "Your Position/Job Title",
      value: jobTitle
    }
  ];

  if (organizationFacility) {
    positionInfoElement.push({
      name: "Organization Facility",
      value: organizationFacility
    });
  }

  const positionInfoTable = {
    header: "POSITION WITH ORGANIZATION",
    tableElements: positionInfoElement
  };

  const addressElement = [
    {
      name: "Street",
      value: addressLine1
    },
    {
      name: "City",
      value: cityNm
    },
    {
      name: "Province",
      value: provinceNm
    },
    {
      name: "Postal Code",
      value: postalCodeTxt
    },
    {
      name: "Country",
      value: countryNm
    },
    {
      name: "Primary Phone Number",
      value: phoneNumber
    },
    {
      name: "Personal Email Address",
      value: emailAddress
    }
  ];

  const addressTable = {
    header: "CONTACT INFORMATION",
    tableElements: addressElement
  };

  const links = [
    {
      name: "I'm an employee or volunteer",
      url: "/tbd"
    },
    {
      name: "Electronic Identity Verification (EIV)",
      url:
        "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/electronic-identity-verification-eiv"
    },
    {
      name: "Results and Reconsideration",
      url:
        "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check/results-and-reconsiderations"
    }
  ];

  const confirmButton = {
    label: "SUBMIT",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit",
    disabled: !boxChecked
  };

  const confirm = () => {
    // TODO: Check if volunteer, if yes, success, else, cont.
    // CALL THAT API
    const createApplicantInfo = {
      orgTicketNumber,
      callPurpose: "CRC",
      legalSurnameNm,
      legalFirstNm,
      legalSecondNm,
      birthDt,
      genderTxt,
      birthPlace,
      phoneNumber,
      addressLine1,
      cityNm,
      provinceNm,
      countryNm,
      postalCodeTxt,
      driversLicNo
    };

    let partyId;
    let sessionId;
    let invoiceId;
    let serviceFeeAmount;
    let serviceId;

    Promise.all([
      axios.post("/ecrc/createApplicant", createApplicantInfo),
      axios.get(`/ecrc/getNextSessionId?orgTicketId=${orgTicketNumber}`),
      axios.get(`/ecrc/getNextInvoiceId?orgTicketId=${orgTicketNumber}`),
      axios.get(
        `/ecrc/getServiceFeeAmount?orgTicketId=${orgTicketNumber}&scheduleTypeCd=${defaultScheduleTypeCd}&scopeLevelCd=${defaultCrcScopeLevelCd}`
      )
    ])
      .then(all => {
        partyId = all[0].data.partyId;
        sessionId = all[1].data.sessionId;
        invoiceId = all[2].data.invoiceId;
        serviceFeeAmount = all[3].data.serviceFeeAmount;

        // NEED CLARIFICATION:
        // child_Care_Fac_Nm?
        // governing_body_Nm?
        // eivPassDetailsResults?
        const newCRC = {
          orgTicketNumber,
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

        return axios.post("/ecrc/createNewCRCService", newCRC);
      })
      .then(res => {
        serviceId = res.data.serviceId;

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
            approvedPage: "http://localhost:3000/ecrc/success",
            declinedPage: "http://localhost:3000/ecrc/success",
            errorPage: "http://localhost:3000/ecrc/success",
            totalItemsAmount: serviceFeeAmount,
            serviceIdRef1: serviceId,
            partyIdRef2: partyId
          };

          axios.post("/ecrc/getPaymentUrl", createURL).then(res => {
            window.location.href = res.data.paymentUrl;
          });
        }
      });
  };

  const cancelButton = {
    label: "EDIT APPLICATION",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const edit = () => {
    setToBack(true);
  };

  if (toBack) {
    return <Redirect to="/ecrc/applicationform" />;
  }

  if (toSuccess) {
    return <Redirect to="/ecrc/success" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Information Review</h1>
          <p>TEXT TO BE CONFIRMED</p>
          <p>
            Please confirm that the information provided s accurate. If it is
            not, please do NOT proceed and contact __________
          </p>
          <Table table={personalInfoTable} />
          <Table table={positionInfoTable} />
          <Table table={addressTable} />
          <div className="declareTitle">DECLARATION</div>
          <section className="declareSection">
            <input
              type="checkbox"
              onClick={() => {
                setBoxChecked(!boxChecked);
              }}
            />
            <span className="declaration-cb">
              I certify that, to the best of my knowledge, the information I
              have provided on my application and will provide as necessary is
              complete, honest and accurate. I understand that a false statement
              or omission of facts herein may lead to a denial of a cannabis
              workers registration. I am also aware that later discovery of an
              omission or misrepresentation may be grounds for any finding of
              suitability to be suspended or revoked.
            </span>
          </section>
          <div className="buttons">
            <Button button={cancelButton} onClick={edit} />
            <Button button={confirmButton} onClick={confirm} />
          </div>
        </div>
        <div className="sidecard">
          <SideCards type={"usefullinks"} sideCardLinks={links} />
          <SideCards type={"contactinformation"} />
          <SideCards type={"collectionnotice"} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

InformationReview.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    applicant: PropTypes.shape({
      legalFirstNm: PropTypes.string.isRequired,
      legalSecondNm: PropTypes.string.isRequired,
      legalSurnameNm: PropTypes.string.isRequired,
      birthDt: PropTypes.string.isRequired,
      genderTxt: PropTypes.string.isRequired,
      addressLine1: PropTypes.string.isRequired,
      cityNm: PropTypes.string.isRequired,
      provinceNm: PropTypes.string.isRequired,
      postalCodeTxt: PropTypes.string.isRequired,
      countryNm: PropTypes.string.isRequired,
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
    saveApplicationInfo: PropTypes.func.isRequired
  }).isRequired
};
