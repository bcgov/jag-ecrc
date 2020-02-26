import React from "react";
import { MemoryRouter } from "react-router-dom";

import Success from "./Success";

export default {
  title: "Success",
  component: Success
};

const header = {
  name: "Criminal Record Check"
};

const page = {
  header
};

export const Default = () => (
  <MemoryRouter>
    <Success page={page} />
  </MemoryRouter>
);
