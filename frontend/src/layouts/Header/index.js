import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/" className="header-link">
      <h1 className="header-title">IceBreaker</h1>
    </Link>
  );
};

export default Header;
