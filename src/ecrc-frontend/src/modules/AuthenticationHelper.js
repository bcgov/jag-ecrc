/* eslint-disable import/prefer-default-export */
import axios from "axios";

const jwt = require("jsonwebtoken");

export function isAuthenticated(page) {
  const token = sessionStorage.getItem("jwt");
  const validator = sessionStorage.getItem("validator");
  let isAuthed = false;

  if (!token || !validator) return false;

  // verify a token symmetric
  jwt.verify(token, validator, (err, decoded) => {
    console.log(decoded);
    if (!decoded.visited) {
      isAuthed = false;
    } else if (decoded.visited.includes(page)) {
      isAuthed = true;
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
    console.log(decoded);
    if (!decoded.authorities) {
      isAuthorize = false;
    } else if (decoded.authorities.includes("Authorized")) {
      isAuthorize = true;
    }
  });

  return isAuthorize;
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
  console.log("OKATY ", token);
  const validator = sessionStorage.getItem("validator");

  console.log("VALIDATOR", validator);

  const payload = jwt.verify(token, validator);

  return payload;
}
