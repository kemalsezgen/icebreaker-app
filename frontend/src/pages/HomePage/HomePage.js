import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import "./HomePage.css";

const HomePage = () => {
  const { token, setToken, setRoomName, setJoinedToRoom } = useContext(Context);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token, setToken]);

  useEffect(() => {
    setRoomName(null);
    setJoinedToRoom(false);
  }, [setRoomName, setJoinedToRoom]);

  return (
    <div className="home-page">
      <div className="content">
        <h2>What is breakingICES?</h2>
        <p>
          Welcome to IceBreaker Game! This fun and interactive app is perfect
          for remote teams looking to connect and strengthen their bonds. Create
          or join rooms where you and your colleagues can answer entertaining
          and thought-provoking questions. Start a session, share your answers,
          and get to know each other better in a relaxed and enjoyable setting.
          It's the ideal way to break the ice, build team spirit, and have a
          good time!
        </p>
        <div className="buttons">
          <Link to="/create-room">
            <button className="btn">create room</button>
          </Link>
          <span className="or">or</span>
          <Link to="/join-room">
            <button className="btn">join to room</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
