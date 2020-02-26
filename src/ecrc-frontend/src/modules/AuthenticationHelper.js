const jwt = require("jsonwebtoken");

export function isAuthenticated() {
  const token = sessionStorage.getItem("jwt");

  // verify a token symmetric
  jwt.verify(token, "shhhhh", (err, decoded) => {
    if (err) {
      console.log("deal with error here");
      return;
    }

    console.log(decoded);
  });
}
