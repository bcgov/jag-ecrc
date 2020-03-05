/* eslint-disable import/prefer-default-export */
import axios from "axios";

const jwt = require("jsonwebtoken");

export function isAuthenticated() {
  const token = sessionStorage.getItem("jwt");
  const validator = sessionStorage.getItem("validator");

  if (!token || !validator) return false;

  // verify a token symmetric
  jwt.verify(token, validator, err => {
    if (err) {
      return false;
    }
  });

  return true;
}

export function storeValidator() {
  axios
    .get(`/ecrc/initialHandshake`)
    .then(res => {
      const value = res.data;

      if (value) {
        sessionStorage.setItem("validator", value);
      }
    })
    .catch(() => {});
}

export function generateJWTToken(payload) {
  const validator = sessionStorage.getItem("validator");

  if (!validator) return false;

  const token = jwt.sign(payload, validator, { expiresIn: "2h" });

  return token;
}
