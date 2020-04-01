import React from "react";

import Share from "./Share";

export default {
  title: "Share",
  component: Share
};

const clickShare = () => {};

export const Default = () => (
  <Share
    previousOrg={"Previous Org"}
    expiration={"2021-01-04"}
    newOrg={"New Org"}
    clickShare={clickShare}
  />
);
