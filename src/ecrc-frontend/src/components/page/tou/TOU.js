import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Header from "../../base/header/Header";
import Footer from "../../base/footer/Footer";
import TermsOfUse from "../../base/termsOfUse/TermsOfUse";
import "../page.css";
import {
  isAuthenticated,
  generateJWTToken
} from "../../../modules/AuthenticationHelper";

export default function TOU({ page: { header } }) {
  const [toBCSCRedirect, setToBCSCRedirect] = React.useState(false);
  const [toHome, setToHome] = React.useState(false);
  const [secondBoxChecked, setSecondBoxChecked] = React.useState(false);
  const [firstBoxChecked, setFirstBoxChecked] = React.useState(false);
  const [continueBtnEnabled, setContinueBtnEnabled] = React.useState(false);
  const [reachedEnd, setReachedEnd] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated("orgVerification")) setToHome(true);

    const payload = {
      authorities: ["ROLE"],
      visited: ["orgValidation", "orgVerification", "tou"]
    };
    generateJWTToken(payload);

    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
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
    return <Redirect to="/ecrc/bcscRedirect" />;
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
