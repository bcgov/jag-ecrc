import React from "react";
import { create } from "react-test-renderer";

import SideCards from "./SideCards";

describe("SideCards Component", () => {
  const links = [
    {
      name: "Home",
      url: "/"
    },
    {
      name: "Somewhere",
      url: "/somewhere"
    },
    {
      name: "Somewhere else",
      url: "/somewhereelse"
    },
    {
      name: "Somewhere with a long name for no reason",
      url: "/here"
    }
  ];

  test("AccessCode sidecard", () => {
    const accessCode = create(<SideCards type={"accesscode"} />);
    expect(accessCode.toJSON()).toMatchSnapshot();
  });

  test("GetBcServices sidecard", () => {
    const bcServices = create(<SideCards type={"getbcservice"} />);
    expect(bcServices.toJSON()).toMatchSnapshot();
  });

  test("BcServices sidecard", () => {
    const bcServices = create(<SideCards type={"bcservice"} />);
    expect(bcServices.toJSON()).toMatchSnapshot();
  });

  test("ContactInformation sidecard", () => {
    const contactInformation = create(
      <SideCards type={"contactinformation"} />
    );
    expect(contactInformation.toJSON()).toMatchSnapshot();
  });

  test("CriminalRecord sidecard", () => {
    const criminalRecord = create(<SideCards type={"criminalrecord"} />);
    expect(criminalRecord.toJSON()).toMatchSnapshot();
  });

  test("AccessCode sidecard", () => {
    const usefulLink = create(
      <SideCards type={"usefullinks"} sideCardLinks={links} />
    );
    expect(usefulLink.toJSON()).toMatchSnapshot();
  });
});
