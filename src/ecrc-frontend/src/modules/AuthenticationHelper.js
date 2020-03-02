import React from "react";
import { Redirect } from "react-router-dom";

const jwt = require("jsonwebtoken");

export function isAuthenticated() {
  const token = sessionStorage.getItem("jwt");

  // verify a token symmetric
  jwt.verify(token, "shhhhh", (err, decoded) => {
    if (err) {
      window.location.replace("http://www.google.ca");
      return;
    }

    console.log(decoded);
  });
}
