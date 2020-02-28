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
    org: { orgApplicantRelationship },
    saveApplicant,
    saveOrg
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
    if (orgApplicantRelationship === "VOLUNTEER") {
      setToSuccess(true);
    } else {
      saveApplicant();
      saveOrg();
      console.log("Saved");

      // CALL THAT API
      const apiFOrm = {
        legalFirstNm: "Robert",
        legalSecondNm: "Norman",
        legalSurnameNm: "Ross",
        birthDt: "1942/10/29",
        genderTxt: "M",
        addressLine1: "123 Somewhere",
        cityNm: "Here",
        provinceNm: "British Columbia",
        postalCodeTxt: "V9V 9V9",
        countryNm: "Canada",
        orgTicketNumber: "crce",
        callPurpose: "CRC"
      };

      console.log(JSON.stringify(apiFOrm));
      console.log(apiFOrm);

      Promise.all([
        axios.post("/ecrc/createApplicant", apiFOrm),
        axios.get(
          `/ecrc/getNextSessionId?orgTicketId=${apiFOrm.orgTicketNumber}`
        ),
        axios.get(
          `/ecrc/getNextInvoiceId?orgTicketId=${apiFOrm.orgTicketNumber}`
        ),
        axios.get(
          `/ecrc/getServiceFeeAmount?orgTicketId=${apiFOrm.orgTicketNumber}&scheduleTypeCd=WBSD&scopeLevelCd=WWCH`
        )
      ]).then(all => {
        console.log(all[0].data.partyId);
        console.log(all[1].data.sessionId);
        console.log(all[2].data.invoiceId);
        console.log(all[3].data.serviceFeeAmount);

        const newCRC = {
          orgTicketNumber: apiFOrm.orgTicketNumber,
          schedule_Type_Cd: "WBSD",
          scope_Level_Cd: "WWCH",
          appl_Party_Id: all[0].data.partyId,
          org_Appl_To_Pay: "A",
          applicant_Posn: "Wrkr",
          child_Care_Fac_Nm: "child_Care_Fac_Nm",
          governing_Body_Nm: "governing_Body_Nm",
          session_Id: all[1].data.sessionId,
          invoice_Id: all[2].data.invoiceId,
          auth_Release_EIV_Vendor_YN: "Y",
          auth_Conduct_CRC_Check_YN: "Y",
          auth_Release_To_Org_YN: "Y",
          appl_Identity_Verified_EIV_YN: "Y",
          eivPassDetailsResults: "eivPassDetailsResults"
        };

        axios.post("/ecrc/createNewCRCService", newCRC).then(res => {
          const createURL = {
            invoiceNumber: all[2].data.invoiceId,
            approvedPage: "http://localhost:3000/ecrc/success",
            declinedPage: "http://localhost:3000/ecrc/success",
            errorPage: "http://localhost:3000/ecrc/success",
            totalItemsAmount: all[3].data.serviceFeeAmount,
            serviceIdRef1: res.data.serviceId,
            partyIdRef2: all[0].data.partyId
          };

          console.log(createURL);

          axios.post("/ecrc/getPaymentUrl", createURL).then(res => {
            console.log(res.data);
          });
        });
      });
    }
    // TODO: everything required to build payment link, and redirect to said link
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
    })
  }).isRequired
};
