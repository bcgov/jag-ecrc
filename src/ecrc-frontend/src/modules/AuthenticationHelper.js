/* eslint-disable import/prefer-default-export */
import axios from "axios";

const jwt = require("jsonwebtoken");

export function isAuthenticated(page) {
  console.log(page);
  const token = sessionStorage.getItem("jwt");
  console.log(token);
  const validator = sessionStorage.getItem("validator");
  let isAuthed = false;

  if (!token || !validator) return false;

  // verify a token symmetric
  jwt.verify(token, validator, (err, decoded) => {
    if (decoded.visited.includes(page)) isAuthed = true;
  });

  return isAuthed;
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

  sessionStorage.setItem("jwt", token);

  return token;
}

export function accessJWTToken(token) {
  const validator = sessionStorage.getItem("validator");

  const payload = jwt.verify(token, validator);

  return payload;
}
