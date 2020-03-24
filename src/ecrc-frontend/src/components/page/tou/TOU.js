import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";

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

export default function TOU({ page: { header, setError } }) {
  const history = useHistory();
  const [toHome, setToHome] = useState(false);
  const [toError, setToError] = useState(false);
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
    if (!isAuthenticated()) {
      setError("session expired");
      setToError(true);
      return;
    }

    const currentPayload = accessJWTToken(sessionStorage.getItem("jwt"));
    const actionsPerformed = [...currentPayload.actionsPerformed, "tou"];
    const newPayload = {
      ...currentPayload,
      actionsPerformed
    };
    generateJWTToken(newPayload);

    history.push("/criminalrecordcheck/bcscredirect");
  };

  const termOfUseOnScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    if (!reachedEnd && scrollHeight - scrollTop <= clientHeight + 5) {
      setReachedEnd(true);
    }
  };

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
    }),
    setError: PropTypes.func.isRequired
  }).isRequired
};
