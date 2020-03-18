import React from "react";
import { MemoryRouter } from "react-router-dom";

import Error from "./Error";

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
