import React from "react";
import { create } from "react-test-renderer";

import CriminalRecordSideCard from "./CriminalRecordSideCard";

describe("CriminalRecordSideCard Component", () => {
  test("Matches the snapshot", () => {
    const criminalRecord = create(<CriminalRecordSideCard />);
    expect(criminalRecord.toJSON()).toMatchSnapshot();
  });
});
