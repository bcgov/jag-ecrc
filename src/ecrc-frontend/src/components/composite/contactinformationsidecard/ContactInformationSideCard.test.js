import React from "react";
import { create } from "react-test-renderer";

import ContactInformationSideCard from "./ContactInformationSideCard";

describe("ContactInformationSideCard Component", () => {
  test("Matches the snapshot", () => {
    const contactInformation = create(<ContactInformationSideCard />);
    expect(contactInformation.toJSON()).toMatchSnapshot();
  });
});
