import React from "react";
import { MemoryRouter } from "react-router-dom";

import Error from "./Error";

export default {
  title: "Error",
  component: Error
};

const header = {
  name: "Criminal Record Check"
};

const error = {};

const genericPage = {
  header,
  error
};

export function Default() {
  return (
    <MemoryRouter>
      <Error page={genericPage} />
    </MemoryRouter>
  );
}

export function Mobile() {
  return (
    <MemoryRouter>
      <Error page={genericPage} />
    </MemoryRouter>
  );
}

export function SessionExpired() {
  return (
    <MemoryRouter>
      <Error
        page={{ header, error: { status: 590, message: "Session Expired" } }}
      />
    </MemoryRouter>
  );
}

export function ApiError() {
  return (
    <MemoryRouter>
      <Error page={{ header, error: { status: 400, message: "Not Found" } }} />
    </MemoryRouter>
  );
}

export function AppUnauthorizedError() {
  return (
    <MemoryRouter>
      <Error page={{ header, error: { status: 403 } }} />
    </MemoryRouter>
  );
}

export function BcscUnauthorizedError() {
  return (
    <MemoryRouter>
      <Error
        page={{ header, error: { status: 403, message: "BCSC login failed" } }}
      />
    </MemoryRouter>
  );
}

export function UnauthorizedAgeGroup() {
  return (
    <MemoryRouter>
      <Error
        page={{
          header,
          error: { status: 403, message: "User is under the age of 12" }
        }}
      />
    </MemoryRouter>
  );
}

Mobile.story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2"
    }
  }
};
