import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, getByText, wait } from "@testing-library/react";

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

  window.open = jest.fn();

  test("AccessCode sidecard", () => {
    const accessCode = create(<SideCards type={"accesscode"} />);
    expect(accessCode.toJSON()).toMatchSnapshot();
  });

  test("GetBcServices sidecard", () => {
    const bcServices = create(<SideCards type={"getbcservice"} />);
    expect(bcServices.toJSON()).toMatchSnapshot();
  });

  test("Clicking Get BCSC Button on GetBcServices sidecard opens the appropriate link", async () => {
    const { container } = render(<SideCards type={"getbcservice"} />);

    fireEvent.click(getByText(container, "READ MORE"));

    await wait(() => {
      expect(window.open).toHaveBeenCalledWith(
        "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
      );
    });
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

  test("Clicking Visit CRRW Button on CriminalRecord sidecard opens the appropriate link", async () => {
    const { container } = render(<SideCards type={"criminalrecord"} />);

    fireEvent.click(
      getByText(container, "VISIT THE CRIMINAL RECORD REVIEW WEBSITE")
    );

    await wait(() => {
      expect(window.open).toHaveBeenCalledWith(
        "https://www2.gov.bc.ca/gov/content/safety/crime-prevention/criminal-record-check"
      );
    });
  });

  test("AccessCode sidecard", () => {
    const usefulLink = create(
      <SideCards type={"usefullinks"} sideCardLinks={links} />
    );
    expect(usefulLink.toJSON()).toMatchSnapshot();
  });
});
