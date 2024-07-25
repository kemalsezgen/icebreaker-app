import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to IceBreaker Game</h1>
      <div className="buttons">
        <Link to="/create-room">
          <button>Create Room</button>
        </Link>
        <Link to="/join-room">
          <button>Join Room</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
