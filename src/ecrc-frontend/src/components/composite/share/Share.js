/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";

import "./Share.css";
import { Button } from "../../base/button/Button";

export default function Share({
  previousOrg,
  expiration,
  newOrg,
  clickShare,
  boxChecked
}) {
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
      <span>
        It was prepared for:&nbsp;
        {previousOrg}
      </span>
      <span>
        It is valid until:&nbsp;
        {expiration}
      </span>
      <p>
        Would you like to share it with&nbsp;
        {newOrg}?
      </p>

      <Button button={shareButton} onClick={clickShare} />
    </div>
  );
}

Share.propTypes = {
  previousOrg: PropTypes.string.isRequired,
  expiration: PropTypes.string.isRequired,
  newOrg: PropTypes.string.isRequired,
  clickShare: PropTypes.func.isRequired,
  boxChecked: PropTypes.bool.isRequired
};
