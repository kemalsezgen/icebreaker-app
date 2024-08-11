import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Context } from "../context";
import { getRoomById, joinRoom } from "../services/api";
import RoomPage from "../pages/RoomPage/RoomPage";

const RoomGuard = ({ children }) => {
  const { roomId } = useParams();
  const {
    setToken,
    joinedToRoom,
    setJoinedToRoom,
    setUsername,
    setRoomName,
  } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [roomExists, setRoomExists] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);

        await checkRoomExists();
        if (storedToken) await attemptJoinRoom(storedToken);

        setLoading(false);
      } catch (error) {
        console.error("Initialization error:", error);
        setLoading(false);
      }
    };

    const checkRoomExists = async () => {
      try {
        await getRoomById(roomId);
        setRoomExists(true);
      } catch {
        setRoomExists(false);
      }
    };

    const attemptJoinRoom = async (token) => {
      try {
        const joinRoomRequest = { roomCode: roomId, token };
        const res = await joinRoom(joinRoomRequest);
        setUsername(res.data.username);
        setRoomName(res.data.roomName);
        setJoinedToRoom(true);
      } catch {
        setJoinedToRoom(false);
      }
    };

    initialize();
  }, [roomId, setToken, setUsername, setRoomName, setJoinedToRoom]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (roomExists === false) {
    return <Navigate to="/not-found" replace />;
  }

  if (joinedToRoom) {
    return <RoomPage />;
  }

  return children;
};

export default RoomGuard;
