import React from "react";
import { Button } from "./components/base/button/Button";

export default function App() {
  return (
    <div>
      <h1>eCRC Frontend</h1>
      <Button
        onClick={() => console.log("button clicked!")}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--small"
      >
        test
      </Button>
    </div>
  );
}
