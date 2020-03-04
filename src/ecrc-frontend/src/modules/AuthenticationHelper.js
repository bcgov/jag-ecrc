const jwt = require("jsonwebtoken");

export default function isAuthenticated() {
  const token = sessionStorage.getItem("jwt");

  // verify a token symmetric
  jwt.verify(token, "shhhhh", (err, decoded) => {
    if (err) {
      window.location.replace("http://www.google.ca");
      return;
    }
  });
}
