import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import { logout } from "../../services/api";
import "./Header.css";

const Header = ({ roomId }) => {
  const navigate = useNavigate();
  const { roomName, joinedToRoom, username, token, setInputError } =
    useContext(Context);

  const handleLogout = async () => {
    try {
      await logout({ token, roomCode: roomId });
      localStorage.setItem("token", null);
      setInputError("");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="header">
      <Link to="/" className="header-link">
        <h1 className="header-title">IceBreaker</h1>
      </Link>
      {joinedToRoom && roomName && (
        <div className="header-center">
          <h1 className="header-room-name">Room {roomName}</h1>
        </div>
      )}
      {joinedToRoom && roomName && (
        <div className="header-right">
          <h1>{username}</h1>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
