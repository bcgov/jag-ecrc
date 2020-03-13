/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import { Button } from "../../base/button/Button";
import "./UserConfirmation.css";
import {
  generateJWTToken,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

export default function UserConfirmation({ page: { header, setApplicant } }) {
  const [toConsent, setToConsent] = useState(false);
  const [toTransition, setToTransition] = useState(false);
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const payload = { authorities: ["ROLE"] };
    const token = generateJWTToken(payload);

    axios
      .get(`/ecrc/protected/login?code=${code}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        sessionStorage.setItem("jwt", res.data);

        const {
          userInfo: {
            birthdate,
            address: { street_address, locality, region, postal_code },
            gender,
            given_name,
            given_names,
            family_name,
            identity_assurance_level
          }
        } = accessJWTToken(res.data);

        // TODO Check identity assurance level
        if (identity_assurance_level < 3) {
          setToTransition(true);
        }

        // Convert gender text
        const genderTxt = gender === "female" ? "F" : "M";

        // Convert date format
        const birthDt = birthdate.split("-").join("/");

        // Convert province name
        const regionMap = new Map([
          ["BC", "BRITISH COLUMBIA"],
          ["AB", "ALBERTA"],
          ["NL", "NEWFOUNDLAND"],
          ["PE", "PRINCE EDWARD ISLAND"],
          ["NS", "NOVA SCOTIA"],
          ["NB", "NEW BRUNSWICK"],
          ["QC", "QUEBEC"],
          ["ON", "ONTARIO"],
          ["MB", "MANITOBA"],
          ["SK", "SASKATCHEWAN"],
          ["YT", "YUKON"],
          ["NT", "NORTH WEST TERRITORIES"],
          ["NU", "NUNAVUT"]
        ]);

        let provinceNm = regionMap.get(region);
        if (provinceNm === undefined) {
          provinceNm = "Invalid Province";
        }

        setUser({
          legalFirstNm: given_name,
          legalSecondNm: given_names,
          legalSurnameNm: family_name,
          birthDt,
          genderTxt,
          addressLine1: street_address,
          cityNm: locality,
          provinceNm,
          postalCodeTxt: postal_code,
          countryNm: "CANADA"
        });

        setFullName(`${given_name} ${family_name}`);
      })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, []);

  const yesButton = {
    label: "Yes",
    buttonStyle: "btn btn-primary",
    buttonSize: "btn",
    type: "submit"
  };

  const noButton = {
    label: "No",
    buttonStyle: "btn ecrc_accessary_btn",
    buttonSize: "btn",
    type: "submit"
  };

  function onYesClick() {
    setApplicant(user);
    setToConsent(true);
  }

  if (toConsent) {
    return <Redirect to="/ecrc/userconfirmation" />;
  }

  if (toTransition) {
    return <Redirect to="/ecrc/transition" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="user-confirm-content col-md-12">
          <strong>
            Please confirm the name associated with the BC Service card login
            provided.
          </strong>
          <p />
          <p>{fullName}</p>
          <p>Is this correct?</p>
          <div className="row">
            <div className="col-md-12">
              <Button button={yesButton} onClick={() => onYesClick()} />
              <Button button={noButton} onClick={() => {}} />
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer isSmallPage />
    </main>
  );
}

UserConfirmation.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    setApplicant: PropTypes.func.isRequired
  }).isRequired
};
