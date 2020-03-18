import React from "react";
import { MemoryRouter } from "react-router-dom";

import Error from "./Error";
import { storiesOf } from "@storybook/react";

export default {
  title: "Error",
  component: Error
};

const header = {
  name: "Criminal Record Check"
};

const error = "403";

const genericPage = {
  header,
  error
};

// storiesOf("Error", module)
//   .add("Default - generic", () => <Error page={genericPage} />)
//   .add("Default - session expired", () => <Error page={sessionExpiredPage} />);

export const Default = () => (
  <MemoryRouter>
    <Error page={genericPage} />
  </MemoryRouter>
);

export const Mobile = () => (
  <MemoryRouter>
    <Error page={genericPage} />
  </MemoryRouter>
);

export const SessionExpired = () => (
  <MemoryRouter>
    <Error page={{ header, error: "session expired" }} />
  </MemoryRouter>
);

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
