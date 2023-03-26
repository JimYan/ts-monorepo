import React from "react";
import { Link } from "react-router-dom";

export default function Expenses() {
  return (
    <div className="">
      <h2>About</h2>
      <p>
        <Link data-testid="custom-element" to="/">
          go Index
        </Link>
      </p>
    </div>
  );
}
