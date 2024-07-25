import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>Room not found</h2>
      <p>
        The room you're trying to access does not exist. Please check the URL or
        create a new room.
      </p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
