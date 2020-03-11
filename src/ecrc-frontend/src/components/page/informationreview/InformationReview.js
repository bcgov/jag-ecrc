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
      alias1FirstNm,
      alias1SecondNm,
      alias1SurnameNm,
      alias2FirstNm,
      alias2SecondNm,
      alias2SurnameNm,
      alias3FirstNm,
      alias3SecondNm,
      alias3SurnameNm,
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

  const previousNamesElement = [];

  if (alias1FirstNm || alias1SecondNm || alias1SurnameNm) {
    previousNamesElement.push({
      key: "alias1FirstNm",
      name: "First Name",
      value: alias1FirstNm
    });
    previousNamesElement.push({
      key: "alias1SecondNm",
      name: "Middle Name",
      value: alias1SecondNm
    });
    previousNamesElement.push({
      key: "alias1SurnameNm",
      name: "Last Name",
      value: alias1SurnameNm
    });
  }

  if (alias2FirstNm || alias2SecondNm || alias2SurnameNm) {
    previousNamesElement.push({
      key: "alias2FirstNm",
      name: "First Name",
      value: alias2FirstNm
    });
    previousNamesElement.push({
      key: "alias2SecondNm",
      name: "Middle Name",
      value: alias2SecondNm
    });
    previousNamesElement.push({
      key: "alias2SurnameNm",
      name: "Last Name",
      value: alias2SurnameNm
    });
  }

  if (alias3FirstNm || alias3SecondNm || alias3SurnameNm) {
    previousNamesElement.push({
      key: "alias3FirstNm",
      name: "First Name",
      value: alias3FirstNm
    });
    previousNamesElement.push({
      key: "alias3SecondNm",
      name: "Middle Name",
      value: alias3SecondNm
    });
    previousNamesElement.push({
      key: "alias3SurnameNm",
      name: "Last Name",
      value: alias3SurnameNm
    });
  }

  const previousNamesTable = {
    header: "PREVIOUS NAMES",
    tableElements: previousNamesElement
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
    const token = sessionStorage.getItem("jwt");

    const createApplicantInfo = {
      orgTicketNumber,
      callPurpose: "CRC",
      legalSurnameNm,
      legalFirstNm,
      legalSecondNm,
      birthDt,
      genderTxt,
      birthPlace,
      alias1FirstNm,
      alias1SecondNm,
      alias1SurnameNm,
      alias2FirstNm,
      alias2SecondNm,
      alias2SurnameNm,
      alias3FirstNm,
      alias3SecondNm,
      alias3SurnameNm,
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
      axios.post("/ecrc/private/createApplicant", createApplicantInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      axios.get(
        `/ecrc/private/getNextSessionId?orgTicketNumber=${orgTicketNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ),
      axios.get(
        `/ecrc/private/getNextInvoiceId?orgTicketNumber=${orgTicketNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ),
      axios.get(
        `/ecrc/private/getServiceFeeAmount?orgTicketNumber=${orgTicketNumber}&scheduleTypeCd=${defaultScheduleTypeCd}&scopeLevelCd=${defaultCrcScopeLevelCd}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    ])
      .then(all => {
        partyId = all[0].data.partyId;
        sessionId = all[1].data.sessionId;
        invoiceId = all[2].data.invoiceId;
        serviceFeeAmount = all[3].data.serviceFeeAmount;

        // NEED CLARIFICATION: - as per Jason Lee, awaiting confirmation
        // eivPassDetailsResults - String returned from equifax, see Shaun
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

        return axios.post("/ecrc/private/createNewCRCService", newCRC, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(crcResponse => {
        serviceId = crcResponse.data.serviceId;

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
            approvedPage: `${window.location.hostname}/ecrc/success`,
            declinedPage: `${window.location.hostname}/ecrc/success`,
            errorPage: `${window.location.hostname}/ecrc/success`,
            totalItemsAmount: serviceFeeAmount,
            serviceIdRef1: serviceId,
            partyIdRef2: partyId
          };

          axios
            .post("/ecrc/private/createPaymentUrl", createURL, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(urlResponse => {
              window.location.href = urlResponse.data.paymentUrl;
            });
        }
      })
      .catch(() => {});
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
          {previousNamesElement.length > 0 ? (
            <Table table={previousNamesTable} />
          ) : null}
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
      alias1FirstNm: PropTypes.string,
      alias1SecondNm: PropTypes.string,
      alias1SurnameNm: PropTypes.string,
      alias2FirstNm: PropTypes.string,
      alias2SecondNm: PropTypes.string,
      alias2SurnameNm: PropTypes.string,
      alias3FirstNm: PropTypes.string,
      alias3SecondNm: PropTypes.string,
      alias3SurnameNm: PropTypes.string,
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
  })
};

InformationReview.defaultProps = {
  page: {
    applicant: {
      alias1FirstNm: "",
      alias1SecondNm: "",
      alias1SurnameNm: "",
      alias2FirstNm: "",
      alias2SecondNm: "",
      alias2SurnameNm: "",
      alias3FirstNm: "",
      alias3SecondNm: "",
      alias3SurnameNm: ""
    }
  }
};
