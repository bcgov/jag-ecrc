import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import TermsOfUse from "../../base/termsOfUse/TermsOfUse";
import "../page.css";
import {
  isAuthenticated,
  generateJWTToken,
  isActionPerformed,
  accessJWTToken
} from "../../../modules/AuthenticationHelper";

export default function TOU({ page: { header } }) {
  const [toBCSCRedirect, setToBCSCRedirect] = useState(false);
  const [toHome, setToHome] = useState(false);
  const [secondBoxChecked, setSecondBoxChecked] = useState(false);
  const [firstBoxChecked, setFirstBoxChecked] = useState(false);
  const [continueBtnEnabled, setContinueBtnEnabled] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isAuthenticated() || !isActionPerformed("orgVerification")) {
      setToHome(true);
    }
  }, []);

  useEffect(() => {
    if (firstBoxChecked && secondBoxChecked && reachedEnd) {
      setContinueBtnEnabled(true);
    } else {
      setContinueBtnEnabled(false);
    }
  }, [firstBoxChecked, secondBoxChecked, reachedEnd]);

  const onContinueClick = () => {
    setToBCSCRedirect(true);
  };

  if (toBCSCRedirect) {
    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const actionsPerformed = [...currentPayload.actionsPerformed, "tou"];
    const newPayload = {
      ...currentPayload,
      actionsPerformed
    };
    generateJWTToken(newPayload);
    return <Redirect to="/criminalrecordcheck/bcscredirect" />;
  }
  const termOfUseOnScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    if (!reachedEnd && scrollHeight - scrollTop <= clientHeight + 5) {
      setReachedEnd(true);
    }
  };

  if (toHome) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <Header header={header} />
      <div className="page">
        <div className="content">
          <TermsOfUse
            onContinueClick={onContinueClick}
            termOfUseOnScroll={termOfUseOnScroll}
            checkFirstBox={() => setFirstBoxChecked(!firstBoxChecked)}
            checkSecondBox={() => setSecondBoxChecked(!secondBoxChecked)}
            continueBtnEnabled={continueBtnEnabled}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}

TOU.propTypes = {
  page: PropTypes.shape({
    header: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired
};
