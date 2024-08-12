import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import { logout } from "../../services/api";
import "./Header.css";
import UpdateUsernameModal from "../../components/Modals/UpdateUsernameModal";
import { FaEdit } from "react-icons/fa";

const Header = ({ roomId }) => {
  const navigate = useNavigate();
  const { roomName, joinedToRoom, username, token, setInputError } =
    useContext(Context);
  const [isUpdateUsernameModalOpen, setIsUpdateUsernameModalOpen] =
    useState(false);

  const closeModal = () => {
    setIsUpdateUsernameModalOpen(false);
  };

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

  const openUpdateUsernameModal = () => {
    setIsUpdateUsernameModalOpen(true);
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
          <h2 className="update-icon">
            <FaEdit onClick={openUpdateUsernameModal} />
          </h2>
          <h1>{username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <UpdateUsernameModal
        isUpdateUsernameModalOpen={isUpdateUsernameModalOpen}
        setIsUpdateUsernameModalOpen={setIsUpdateUsernameModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Header;
