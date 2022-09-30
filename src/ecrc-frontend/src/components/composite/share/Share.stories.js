import React from "react";

import Share from "./Share";

export default {
  title: "Share",
  component: Share
};

const clickShare = () => {};

export function Default() {
  return <Share newOrg="New Org" clickShare={clickShare} boxChecked={false} />;
}
