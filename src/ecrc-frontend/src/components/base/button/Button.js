import React from "react";

export default function Button(props) {
  return (
    <button className="btn btn-default" onClick={this.props.handleClick}>
      {this.props.label}
    </button>
  );
}
