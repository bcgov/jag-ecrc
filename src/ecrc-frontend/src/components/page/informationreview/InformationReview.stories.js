import React from "react";
import { MemoryRouter } from "react-router-dom";

import InformationReview from "./InformationReview";

export default {
  title: "InformationReview",
  component: InformationReview
};

const header = {
  name: "Criminal Record Check"
};

const page = {
  header
};

export const Default = () => (
  <MemoryRouter>
    <InformationReview page={page} />
  </MemoryRouter>
);
