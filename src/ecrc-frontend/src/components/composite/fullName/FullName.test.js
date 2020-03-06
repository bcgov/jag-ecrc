import React from "react";
import { create } from "react-test-renderer";

import FullName from "./FullName";

describe("FullName Component", () => {
  test("Matches the snapshot", () => {
    const fullname = {
      legalFirstNm: {
        label: "First Name",
        id: "firstName",
        value: "First",
        textInputStyle: "textinput_non_editable_gray"
      },
      legalSecondNm: {
        label: "Middle Name",
        id: "middleName",
        value: "Middle",
        textInputStyle: "textinput_non_editable_gray"
      },
      legalSurnameNm: {
        label: "Last Name",
        id: "lastName",
        value: "Last",
        textInputStyle: "textinput_non_editable_gray"
      }
    };

    const testFullName = create(
      <FullName title={"Full Name"} fullname={fullname} />
    );
    expect(testFullName.toJSON()).toMatchSnapshot();
  });
});
