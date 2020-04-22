/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";

import "./Share.css";
import { Button } from "../../base/button/Button";

export default function Share() {
  return (
    <div className="share">
      <div className="declareTitle">
        Share Your Existing Criminal Record Check
      </div>
      <span>
        If you are an employee or volunteer, you can share the results of your
        criminal record check at no cost.
      </span>
      <br />
      <p>
        <b>Note:</b> An organization can decide whether or not they will accept
        a shared criminal record check result and may ask you to consent to a
        new criminal record check manually or online.
      </p>
    </div>
  );
}
