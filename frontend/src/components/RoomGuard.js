import React, { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Context } from "../context";
import { getRoomById, joinRoom } from "../services/api";
import RoomPage from "../pages/RoomPage";

const RoomGuard = ({ children }) => {
  const { roomId } = useParams();
  const {
    token,
    setToken,
    joinedToRoom,
    setJoinedToRoom,
    setUsername,
    setRoomName,
  } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [roomExists, setRoomExists] = useState(false);

  // Check if room exists
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        await getRoomById(roomId);
        setRoomExists(true);
      } catch (err) {
        console.log("error:", err);
        setRoomExists(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  // Read token from localStorage and set it in context
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  // Join room if token exists and room exists
  useEffect(() => {
    const joinRoomIfNeeded = async () => {
      if (roomExists && token) {
        try {
          const joinRoomRequest = { roomCode: roomId, token };
          const res = await joinRoom(joinRoomRequest);
          setUsername(res.data.username);
          setRoomName(res.data.roomName);
          setJoinedToRoom(true);
        } catch (err) {
          console.error("error:", err);
          setJoinedToRoom(false);
        }
      } else if (roomExists && !token) {
        setJoinedToRoom(false);
      }
    };
    joinRoomIfNeeded();
  }, [roomExists, token, roomId, setJoinedToRoom, setUsername, setRoomName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!roomExists) {
    return <Navigate to="/not-found" replace />;
  }

  if (joinedToRoom) {
    return <RoomPage />;
  }

  if (joinedToRoom !== null && joinedToRoom === false) {
    return <>{children}</>;
  }
};

export default RoomGuard;
