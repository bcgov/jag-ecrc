/* eslint-disable react/jsx-fragments */ // this is for sonarqube
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import "./InformationReview.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import Table from "../../composite/table/Table";
import { Button } from "../../base/button/Button";
import SideCards from "../../composite/sideCards/SideCards";
import Share from "../../composite/share/Share";
import {
  generateJWTToken,
  accessJWTToken,
  isActionPerformed,
  isAuthorized
} from "../../../modules/AuthenticationHelper";

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
      addressLine2,
      cityNm,
      provinceNm,
      postalCodeTxt,
      countryNm,
      mailingLine1,
      mailingLine2,
      mailingCityNm,
      mailingProvinceNm,
      mailingPostalCodeTxt,
      birthPlace,
      driversLicNo,
      phoneNumber,
      emailAddress,
      jobTitle,
      organizationFacility
    },
    org: { orgTicketNumber, defaultCrcScopeLevelCd },
    setApplicationInfo,
    setError,
    setShare
  }
}) {
  const history = useHistory();
  const [toError, setToError] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);

  // SHARE STATES
  const [shareAvailable, setShareAvailable] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthorized() || !isActionPerformed("appForm")) {
      setError({
        status: 403
      });
      setToError(true);
    } else {
      const uuid = sessionStorage.getItem("uuid");
      const token = sessionStorage.getItem("jwt");
      const shareInfo = {
        orgTicketNumber,
        legalSurnameNm,
        legalFirstNm,
        birthDt,
        genderTxt,
        postalCodeTxt: mailingPostalCodeTxt,
        driversLicNo,
        scopeLevelCd: defaultCrcScopeLevelCd,
        requestGuid: uuid
      };

      // Make axios call to check for sharing service
      axios
        .post("/ecrc/private/checkApplicantForPrevCRC", shareInfo, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          setApplicationInfo({ previousServiceId: res.data.serviceId });
          setShareAvailable(true);
        })
        .catch(error => {
          if (
            error &&
            error.response &&
            error.response.status &&
            error.response.status !== 400
          ) {
            setToError(true);
            if (error.response.data && error.response.data.message) {
              setError({
                status: error.response.status,
                message: error.response.data.message
              });
            } else {
              setError({
                status: error.response.status
              });
            }
          }
        });
    }
  }, [
    birthDt,
    defaultCrcScopeLevelCd,
    driversLicNo,
    genderTxt,
    legalFirstNm,
    legalSurnameNm,
    orgTicketNumber,
    postalCodeTxt,
    setApplicationInfo,
    setError
  ]);

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
    header: "Personal Information",
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
    header: (
      <div>
        PREVIOUS NAMES
        <span className="smallTableHeader">
          (Including birth name, previous name, maiden name, and alias)
        </span>
      </div>
    ),
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
    header: "Position With Organization",
    tableElements: positionInfoElement
  };

  const contactElement = [
    {
      name: "Residential Address",
      value: addressLine1
    },
    {
      name: "Additional Residential Address",
      value: addressLine2
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

  const contactTable = {
    header: "Contact Information",
    tableElements: contactElement
  };

  const mailingAddressElement = [
    {
      name: "Mailing Address",
      value: mailingLine1
    },
    {
      name: "Additional Mailing Address",
      value: mailingLine2
    },
    {
      name: "City",
      value: mailingCityNm
    },
    {
      name: "Province",
      value: mailingProvinceNm
    },
    {
      name: "Postal Code",
      value: mailingPostalCodeTxt
    },
    {
      name: "Country",
      value: countryNm
    }
  ];

  const mailingAddressTable = {
    header: "Mailing Address",
    tableElements: mailingAddressElement
  };

  const confirmButton = {
    label: shareAvailable ? "Submit New CRC" : "Submit",
    buttonStyle: "btn ecrc_go_btn mr-0",
    buttonSize: "btn",
    type: "submit",
    disabled: !boxChecked
  };

  const shareButton = {
    label: "Share Previous CRC",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit",
    disabled: !boxChecked
  };

  const cancelButton = {
    label: "Edit Application",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  const edit = () => {
    history.push("/criminalrecordcheck/applicationform");
  };

  const confirm = () => {
    if (!isAuthorized()) {
      setError({
        status: 590,
        message: "Session Expired"
      });
      setToError(true);
      return;
    }

    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const newPayload = {
      ...currentPayload,
      actionsPerformed: [...currentPayload.actionsPerformed, "infoReview"]
    };
    generateJWTToken(newPayload);

    history.push("/criminalrecordcheck/consent");
  };

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Information Review</h1>
          <p>
            Please confirm that the information provided below is accurate. If
            it is not, please select Edit Application.
          </p>
          <Table table={personalInfoTable} />
          <br />
          {previousNamesElement.length > 0 ? (
            <React.Fragment>
              <Table table={previousNamesTable} />
              <br />
            </React.Fragment>
          ) : null}
          <Table table={positionInfoTable} />
          <br />
          <Table table={contactTable} />
          <br />
          <Table table={mailingAddressTable} />
          <div className="declareTitle mt-4">DECLARATION</div>
          <section className="declareSection">
            <label htmlFor="certify">
              <input
                id="certify"
                type="checkbox"
                onClick={() => {
                  setBoxChecked(!boxChecked);
                }}
              />
              <span>
                I certify that, to the best of my knowledge, the information I
                have provided and will provide as necessary is complete and
                accurate.
              </span>
              <span id="asterisk" className="mandatory">
                *
              </span>
            </label>
          </section>
          {shareAvailable && (
            <>
              <br />
              <Share />
              <br />
            </>
          )}
          <div className="buttons info-buttons pt-4">
            <Button button={cancelButton} onClick={edit} />
            {shareAvailable && (
              <Button
                button={shareButton}
                onClick={() => {
                  setShare(true);
                  confirm();
                }}
              />
            )}
            <Button button={confirmButton} onClick={confirm} />
          </div>
        </div>
        <div className="sidecard">
          <SideCards type={"personalinformation"} />
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
      addressLine2: PropTypes.string.isRequired,
      cityNm: PropTypes.string.isRequired,
      provinceNm: PropTypes.string.isRequired,
      postalCodeTxt: PropTypes.string.isRequired,
      countryNm: PropTypes.string.isRequired,
      mailingLine1: PropTypes.string.isRequired,
      mailingLine2: PropTypes.string.isRequired,
      mailingCityNm: PropTypes.string.isRequired,
      mailingProvinceNm: PropTypes.string.isRequired,
      mailingPostalCodeTxt: PropTypes.string.isRequired,
      birthPlace: PropTypes.string.isRequired,
      driversLicNo: PropTypes.string,
      phoneNumber: PropTypes.string.isRequired,
      emailAddress: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      organizationFacility: PropTypes.string
    }),
    org: PropTypes.shape({
      orgNm: PropTypes.string.isRequired,
      orgTicketNumber: PropTypes.string.isRequired,
      defaultCrcScopeLevelCd: PropTypes.string.isRequired
    }),
    setApplicationInfo: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setShare: PropTypes.func.isRequired
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
