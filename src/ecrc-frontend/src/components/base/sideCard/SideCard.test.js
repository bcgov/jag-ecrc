import React from "react";
import { create } from "react-test-renderer";
import { shallow } from "enzyme";
import SideCard from "./SideCard";

describe("SideCard Component", () => {
  const sideCardProps = {
    heading: "header",
    content: ["content"],
    type: "notice"
  };

  test("Renders the notice card when the type is notice", () => {
    const sideCard = shallow(<SideCard sideCard={sideCardProps} />);
    expect(sideCard.exists("#notice-section")).toEqual(true);
  });

  test("Renders the blue card when the type is blue", () => {
    const sideCard = shallow(
      <SideCard sideCard={{ ...sideCardProps, type: "blue" }} />
    );
    expect(sideCard.exists("#blue-section")).toEqual(true);
  });

  test("Renders the bluegrey card when the type is bluegrey", () => {
    const sideCard = shallow(
      <SideCard sideCard={{ ...sideCardProps, type: "bluegrey" }} />
    );
    expect(sideCard.exists("#bluegrey-section")).toEqual(true);
  });

  test("Renders as expected", () => {
    const sideCard = create(<SideCard sideCard={sideCardProps} />);
    expect(sideCard.toJSON()).toMatchSnapshot();
  });
});
