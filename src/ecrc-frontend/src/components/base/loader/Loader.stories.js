import React from "react";

import Loader from "./Loader";

export default {
  title: "Loader",
  component: Loader
};

export function Default() {
  return (
    <div style={{ background: "grey" }}>
      <Loader />
    </div>
  );
}

export function Page() {
  return <Loader page />;
}

export function Mobile() {
  return <Loader page />;
}

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
