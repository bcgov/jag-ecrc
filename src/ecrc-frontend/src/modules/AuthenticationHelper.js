/* eslint-disable import/prefer-default-export */
import axios from "axios";

const jwt = require("jsonwebtoken");

export function isAuthenticated() {
  const token = sessionStorage.getItem("jwt");
  const validator = sessionStorage.getItem("validator");
  let isAuthed = true;

  if (!token || !validator) return false;

  // verify a token symmetric
  jwt.verify(token, validator, err => {
    if (err) {
      isAuthed = false;
    }
  });

  return isAuthed;
}

export function isAuthorized() {
  const token = sessionStorage.getItem("jwt");
  const validator = sessionStorage.getItem("validator");
  let isAuthorize = false;

  if (!token || !validator) return false;

  // verify a token symmetric
  jwt.verify(token, validator, (err, decoded) => {
    if (err || !decoded.authorities) {
      isAuthorize = false;
    } else if (decoded.authorities.includes("Authorized")) {
      isAuthorize = true;
    }
  });

  return isAuthorize;
}

export function isActionPerformed(action) {
  const token = sessionStorage.getItem("jwt");
  const validator = sessionStorage.getItem("validator");
  let isPerformed = false;

  if (!token || !validator) return false;

  // verify a token symmetric
  jwt.verify(token, validator, (err, decoded) => {
    if (err || !decoded.actionsPerformed) {
      isPerformed = false;
    } else if (decoded.actionsPerformed.includes(action)) {
      isPerformed = true;
    }
  });

  return isPerformed;
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

  const token = jwt.sign(payload, validator);

  sessionStorage.setItem("jwt", token);

  return token;
}

export function accessJWTToken(token) {
  const validator = sessionStorage.getItem("validator");

  const payload = jwt.verify(token, validator);

  return payload;
}
