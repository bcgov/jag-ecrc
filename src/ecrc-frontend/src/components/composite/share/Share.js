/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";

import "./Share.css";
import { Button } from "../../base/button/Button";

export default function Share({ newOrg, clickShare, boxChecked }) {
  const shareButton = {
    label: "Share",
    buttonStyle: "btn ecrc_go_btn",
    buttonSize: "btn",
    type: "submit",
    disabled: !boxChecked
  };

  return (
    <div className="share">
      <span>You have a valid previous CRC.</span>
      <p>
        Would you like to share it with&nbsp;
        {newOrg}?
      </p>

      <Button button={shareButton} onClick={clickShare} />
    </div>
  );
}

Share.propTypes = {
  newOrg: PropTypes.string.isRequired,
  clickShare: PropTypes.func.isRequired,
  boxChecked: PropTypes.bool.isRequired
};
