import React from "react";

export default function Button(props) {
  return (
    <button className="btn btn-default" onClick="{props.handleClick}">
      {props.label}
    </button>
  );
}
