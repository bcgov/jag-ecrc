/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
  const uuid = sessionStorage.getItem("uuid");

  if (!uuid) return false;

  axios
    .get(`/ecrc/initialHandshake?requestGuid=${uuid}`)
    .then(res => {
      const value = res.data;

      if (value) {
        sessionStorage.setItem("validator", value);
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });

  return true;
}

export function storeUUID() {
  const uuid = uuidv4();
  sessionStorage.setItem("uuid", uuid);
}

export function generateJWTToken(payload) {
  const validator = sessionStorage.getItem("validator");

  if (!validator) return false;

  let token;

  if (payload.exp) {
    token = jwt.sign(payload, validator);
  } else {
    token = jwt.sign(payload, validator, { expiresIn: "1h" });
  }

  sessionStorage.setItem("jwt", token);

  return token;
}

export function accessJWTToken(token) {
  const validator = sessionStorage.getItem("validator");

  const payload = jwt.verify(token, validator);

  return payload;
}
