import React from "react";
import PropTypes from "prop-types";

import "./OrgVerificationText.css";
import TableElement from "../../base/tableelement/TableElement";

export default function OrgVerificationText({
  org: {
    orgNm,
    addressLine1,
    cityNm,
    provinceNm,
    countryNm,
    orgApplicantRelationship
  }
}) {
  const address = [addressLine1, cityNm, provinceNm, countryNm];

  return (
    <table>
      <TableElement element={{ name: "Organization Name", value: orgNm }} />
      <TableElement element={{ name: "Address", value: address }} />
      <TableElement
        element={{
          name: "Applicant Relationship",
          value: orgApplicantRelationship
        }}
      />
    </table>
  );
}

OrgVerificationText.propTypes = {
  org: PropTypes.shape({
    orgNm: PropTypes.string.isRequired,
    addressLine1: PropTypes.string.isRequired,
    cityNm: PropTypes.string.isRequired,
    provinceNm: PropTypes.string.isRequired,
    countryNm: PropTypes.string.isRequired,
    orgApplicantRelationship: PropTypes.string.isRequired
  }).isRequired
};
