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
  accessJWTToken,
  isAuthenticated
} from "../../../modules/AuthenticationHelper";
import Loader from "../../base/loader/Loader";

export default function UserConfirmation({
  page: { header, setApplicant, setError }
}) {
  const [toConsent, setToConsent] = useState(false);
  const [toHome, setToHome] = React.useState(false);
  const [toTransition, setToTransition] = useState(false);
  const [toError, setToError] = useState(false);
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [toggleLoader, setToggleLoader] = useState({ display: "inline-block" });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!isAuthenticated() || !code) setToHome(true);

    const token = sessionStorage.getItem("jwt");
    const uuid = sessionStorage.getItem("uuid");

    axios
      .get(`/ecrc/protected/login?code=${code}&requestGuid=${uuid}`, {
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

        // Convert given names
        const givenNamesArray = given_names.split(" ");

        givenNamesArray.shift();

        const legalSecondNm = givenNamesArray.join(" ");

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
          legalSecondNm,
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
        setToggleLoader({ display: "none" });
      })
      .catch(error => {
        setToError(true);
        setError(error.response.status.toString());
        setToggleLoader({ display: "none" });
      });
    window.scrollTo(0, 0);
  }, [setError]);

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
    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const newPayload = {
      ...currentPayload,
      actionsPerformed: ["userConfirmation"]
    };
    generateJWTToken(newPayload);

    setApplicant(user);
    setToConsent(true);
  }

  if (toConsent) {
    return <Redirect to="/criminalrecordcheck/userconfirmation" />;
  }

  if (toTransition) {
    return <Redirect to="/criminalrecordcheck/transition" />;
  }

  if (toHome) {
    return <Redirect to="/" />;
  }

  if (toError) {
    return <Redirect to="/criminalrecordcheck/error" />;
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
          <div style={toggleLoader}>
            <Loader page />
          </div>
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
      <Footer />
    </main>
  );
}

UserConfirmation.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    setApplicant: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  }).isRequired
};
