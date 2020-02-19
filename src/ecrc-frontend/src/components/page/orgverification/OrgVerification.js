import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "../page.css";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import SideCard from "../../base/sideCard/SideCard";
import { Button } from "../../base/button/Button";
import Table from "../../composite/table/Table";
import BcServiceSideCard from "../../composite/bcservicesidecard/BcServiceSideCard";
import UsefulLinksSideCard from "../../composite/usefullinkssidecard/UsefulLinksSideCard";
import ContactInformationSideCard from "../../composite/contactinformationsidecard/ContactInformationSideCard";

export default function OrgVerification({
  page: {
    pageLayout: { header, sideCard1, sideCard2 },
    org,
    setOrg
  }
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const orgVerification = () => {};

  const back = () => {
    setOrg({});
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

  const continueButton = {
    label: "Continue",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const cancelButton = {
    label: "Back",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn btn-sm",
    type: "submit"
  };

  const organizationInfoElements = [
    { name: "Organization Name", value: org.orgNm },
    {
      name: "Address",
      value: `${org.addressLine1}\n${org.cityNm}\n${org.provinceNm}\n${org.postalCodeTxt}\n${org.countryNm}`
    },
    {
      name: "Phone Number",
      value: org.contactPhoneNo
    }
  ];

  const organizationInfoTable = {
    header: "Organization Information",
    tableElements: organizationInfoElements
  };

  const organizationTypeElements = [
    { name: "Role", value: org.orgApplicantRelationship }
  ];

  const organizationTypeTable = {
    header: "Organization Type",
    tableElements: organizationTypeElements
  };

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content col-md-8">
          <h1>Organization Information</h1>
          <p>
            You have provided the access code of the organization that has
            requested you to complete a criminal record check. Below are the
            details of that organization. Please confirm that this is the
            organization. If it’s not, please do NOT proceed and contact the
            organization that has requested you to complete a criminal record
            check.
          </p>
          <Table table={organizationInfoTable} />
          <Table table={organizationTypeTable} />
          <div>
            <p>
              To continue with your online criminal record check request, please
              ensure you meet the following criteria:
            </p>
            <ul>
              <li>
                You must have a BC Service Card Account. If you do not already
                have a BC Service Card Account, you can initiate the process at
                the
                <a href="https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/login-with-card">
                  BC Service Card website
                </a>
                .
              </li>
              <li>
                Pay a fee by credit card (Visa, MasterCard, or AMEX). For
                volunteers completing a request for criminal record check, no
                payment is required.
              </li>
            </ul>
            <p>
              Once the criminal record check is complete, the organization noted
              above will receive the results.
            </p>
            <p>
              By selecting continue, you are consenting to have your information
              released to this organization.
            </p>
          </div>
          <div className="buttons">
            <Button button={cancelButton} onClick={back} />
            <Button button={continueButton} onClick={orgVerification} />
          </div>
        </div>
        <div className="sidecard">
          <BcServiceSideCard />
          <UsefulLinksSideCard sideCardLinks={links} />
          <ContactInformationSideCard />
        </div>
      </div>
      <Footer />
    </main>
  );
}

OrgVerification.propTypes = {
  page: PropTypes.shape({
    org: PropTypes.object.isRequired,
    setOrg: PropTypes.func.isRequired,
    pageLayout: PropTypes.shape({
      header: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      sideCard1: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      }),
      sideCard2: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      })
    }).isRequired
  }).isRequired
};
