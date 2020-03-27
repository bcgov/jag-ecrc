import React from "react";

import "./Share.css";
import Button from "../../base/button/Button";

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
      <span>It was prepared for: {previousOrg}</span>
      <span>It is valid until: {expiration}</span>
      <p>Would you like to share it with {newOrg}?</p>

      <Button button={shareButton} onClick={clickShare} />
    </div>
  );
}
