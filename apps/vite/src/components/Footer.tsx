import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <Link to="/" className="mr-3">
      Index
    </Link>
    <Link to="/about" className="mr-3">
      About
    </Link>
    <Link to="/user" className="mr-3">
      User
    </Link>
  </>
);

export default Footer;
