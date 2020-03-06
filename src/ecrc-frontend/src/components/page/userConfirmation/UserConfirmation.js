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
            address: { street_address, country, locality, region, postal_code },
            gender,
            given_name,
            given_names,
            family_name,
            identity_assurance_level
          }
        } = accessJWTToken(res.data);

        const genderTxt = gender === "female" ? "F" : "M";

        const countryNm = country === "CA" ? "CANADA" : "Fail Country";

        const birthDt = birthdate.split("-").join("/");

        const provinceNm =
          region === "BC" ? "BRITISH COLUMBIA" : "Fail Province";

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
          countryNm
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
    console.log(user);
    setApplicant(user);
    setToConsent(true);
  }

  if (toConsent) {
    return <Redirect to="/ecrc/userconfirmation" />;
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
  header: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};
