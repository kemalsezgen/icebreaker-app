import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";

const HomePage = () => {
  const { token, setToken } = useContext(Context);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token, setToken]);

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
      <h1>token: {token}</h1>
    </div>
  );
};

export default HomePage;
