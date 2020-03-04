const jwt = require("jsonwebtoken");

export function isAuthenticated() {
  const token = sessionStorage.getItem("jwt");

  // verify a token symmetric
  jwt.verify(token, "shhhhh", err => {
    if (err) {
      window.location.replace("http://www.google.ca");
    }
  });
}
