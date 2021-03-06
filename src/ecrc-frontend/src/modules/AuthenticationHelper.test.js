import { wait } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  isAuthenticated,
  isAuthorized,
  isActionPerformed,
  storeJWTDetails,
  storeUUID,
  generateJWTToken,
  accessJWTToken
} from "./AuthenticationHelper";

const jwt = require("jsonwebtoken");

describe("AuthenticationHelper Module", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("isAuthenticated returns false when token not present in session storage", () => {
    sessionStorage.setItem("validator", "secret");
    const result = isAuthenticated();

    expect(result).toEqual(false);
  });

  test("isAuthenticated returns false when validator not present in session storage", () => {
    sessionStorage.setItem("jwt", "token");
    const result = isAuthenticated();

    expect(result).toEqual(false);
  });

  test("isAuthenticated returns false if jwt verify leads to an error", () => {
    const payload = { key: "value" };
    const wrongValidator = "wrongsecret";
    const token = jwt.sign(payload, wrongValidator);

    sessionStorage.setItem("validator", "correctsecret");
    sessionStorage.setItem("jwt", token);

    const result = isAuthenticated();

    expect(result).toEqual(false);
  });

  test("isAuthenticated returns true when we are authed", () => {
    const payload = { key: "value" };
    const validator = "secret";
    const token = jwt.sign(payload, validator);

    sessionStorage.setItem("validator", validator);
    sessionStorage.setItem("jwt", token);

    const result = isAuthenticated();

    expect(result).toEqual(true);
  });

  test("isAuthorized returns false when token not present in session storage", () => {
    sessionStorage.setItem("validator", "secret");
    const result = isAuthorized();

    expect(result).toEqual(false);
  });

  test("isAuthorized returns false when validator not present in session storage", () => {
    sessionStorage.setItem("jwt", "token");
    const result = isAuthorized();

    expect(result).toEqual(false);
  });

  test("isAuthorized returns false if jwt verify leads to an error", () => {
    const payload = { key: "value" };
    const wrongValidator = "wrongsecret";
    const token = jwt.sign(payload, wrongValidator);

    sessionStorage.setItem("validator", "correctsecret");
    sessionStorage.setItem("jwt", token);

    const result = isAuthorized();

    expect(result).toEqual(false);
  });

  test("isAuthorized returns false if jwt verify decoded payload does not have authorities", () => {
    const payload = { key: "value" };
    const validator = "secret";
    const token = jwt.sign(payload, validator);

    sessionStorage.setItem("validator", validator);
    sessionStorage.setItem("jwt", token);

    const result = isAuthorized();

    expect(result).toEqual(false);
  });

  test("isAuthorized returns false if jwt verify decoded payload does not have correct authorities", () => {
    const payload = { authorities: ["ROLE"] };
    const validator = "secret";
    const token = jwt.sign(payload, validator);

    sessionStorage.setItem("validator", validator);
    sessionStorage.setItem("jwt", token);

    const result = isAuthorized();

    expect(result).toEqual(false);
  });

  test("isAuthorized returns true when we are authed", () => {
    const payload = { authorities: ["Authorized"] };
    const validator = "secret";
    const token = jwt.sign(payload, validator);

    sessionStorage.setItem("validator", validator);
    sessionStorage.setItem("jwt", token);

    const result = isAuthorized();

    expect(result).toEqual(true);
  });

  test("isActionPerformed returns false when token not present in session storage", () => {
    sessionStorage.setItem("validator", "secret");
    const result = isActionPerformed("action");

    expect(result).toEqual(false);
  });

  test("isActionPerformed returns false when validator not present in session storage", () => {
    sessionStorage.setItem("jwt", "token");
    const result = isActionPerformed("action");

    expect(result).toEqual(false);
  });

  test("isActionPerformed returns false if jwt verify leads to an error", () => {
    const payload = { key: "value" };
    const wrongValidator = "wrongsecret";
    const token = jwt.sign(payload, wrongValidator);

    sessionStorage.setItem("validator", "correctsecret");
    sessionStorage.setItem("jwt", token);

    const result = isActionPerformed("action");

    expect(result).toEqual(false);
  });

  test("isActionPerformed returns false if jwt verify decoded payload does not have authorities", () => {
    const payload = { key: "value" };
    const validator = "secret";
    const token = jwt.sign(payload, validator);

    sessionStorage.setItem("validator", validator);
    sessionStorage.setItem("jwt", token);

    const result = isActionPerformed("action");

    expect(result).toEqual(false);
  });

  test("isActionPerformed returns true when we are authed", () => {
    const payload = { actionsPerformed: ["action"] };
    const validator = "secret";
    const token = jwt.sign(payload, validator);

    sessionStorage.setItem("validator", validator);
    sessionStorage.setItem("jwt", token);

    const result = isActionPerformed("action");

    expect(result).toEqual(true);
  });

  test("storeJWTDetails should return false when no uuid is present in session storage", () => {
    const result = storeJWTDetails();

    expect(result).toEqual(false);
  });

  test("storeJWTDetails sets the validator and client id in session storage when we retrieve them from backend", async () => {
    const mock = new MockAdapter(axios);
    const API_REQUEST = "/ecrc/initialHandshake?requestGuid=unique123";
    mock.onGet(API_REQUEST).reply(200, {
      secret: "secret",
      clientId: "123"
    });

    sessionStorage.setItem("uuid", "unique123");

    const result = storeJWTDetails();
    const validator = "secret";
    const clientId = "123";

    await wait(() => {
      expect(sessionStorage.getItem("validator")).toEqual(validator);
      expect(sessionStorage.getItem("clientId")).toEqual(clientId);
      expect(result).toEqual(true);
    });
  });

  test("storeJWTDetails does not set validator when backend does not return data properly", async () => {
    const mock = new MockAdapter(axios);
    const API_REQUEST = "/ecrc/initialHandshake?requestGuid=unique123";
    mock.onGet(API_REQUEST).reply(200);

    sessionStorage.setItem("uuid", "unique123");

    storeJWTDetails();

    await wait(() => {
      expect(sessionStorage.getItem("validator")).toBeFalsy();
    });
  });

  test("storeJWTDetails does not set validator when backend errors", async () => {
    const mock = new MockAdapter(axios);
    const API_REQUEST = "/ecrc/initialHandshake?requestGuid=unique123";
    mock.onGet(API_REQUEST).reply(400);

    sessionStorage.setItem("uuid", "unique123");

    storeJWTDetails();

    await wait(() => {
      expect(sessionStorage.getItem("validator")).toBeFalsy();
    });
  });

  test("storeUUID sets uuid in session storage after generating it", () => {
    storeUUID();

    expect(sessionStorage.getItem("uuid")).toBeTruthy();
  });

  test("generateJWTToken returns false when no validator present in session storage", () => {
    const payload = { key: "value" };
    const result = generateJWTToken(payload);

    expect(result).toEqual(false);
  });

  test("generateJWTToken sets token in session storage when it works", () => {
    sessionStorage.setItem("validator", "secret");
    sessionStorage.setItem("clientId", "123");

    const payload = { key: "value" };

    generateJWTToken(payload);

    expect(sessionStorage.getItem("jwt")).toBeTruthy();
  });

  test("accessJWTToken returns payload of the token passed in", () => {
    const validator = "secret";
    sessionStorage.setItem("validator", validator);
    const payload = { key: "value" };
    const token = jwt.sign(payload, validator);

    const result = accessJWTToken(token);

    expect(result.key).toEqual(payload.key);
  });
});
