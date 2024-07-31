import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <Link to="/" className="header-link">
      <h1 className="header-title">IceBreaker Header</h1>
    </Link>
  );
};

export default index;
