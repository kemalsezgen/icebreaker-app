import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Context } from "./context";

import HomePage from "./pages/HomePage";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import EnterUsername from "./pages/EnterUsername";
import RoomGuard from "./components/RoomGuard";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./layouts/Header";

function App() {
  const [inviteCode, setInviteCode] = useState("");
  const [token, setToken] = useState();
  const [joinedToRoom, setJoinedToRoom] = useState(false);
  const [username, setUsername] = useState();
  const [roomName, setRoomName] = useState();
  const [isRoomOwner, setIsRoomOwner] = useState();
  const [roomCode, setRoomCode] = useState();
  const [roomInfos, setRoomInfos] = useState();
  const [inputError, setInputError] = useState(false);
  const location = useLocation();

  const contextData = {
    token,
    setToken,
    inviteCode,
    setInviteCode,
    joinedToRoom,
    setJoinedToRoom,
    username,
    setUsername,
    roomName,
    setRoomName,
    isRoomOwner,
    setIsRoomOwner,
    roomCode,
    setRoomCode,
    roomInfos,
    setRoomInfos,
    inputError,
    setInputError,
  };

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname.includes("create-room") ||
      location.pathname.includes("join-room")
    ) {
      setRoomName(null);
      setJoinedToRoom(false);
    }
  }, [location, setRoomName, setJoinedToRoom]);

  return (
    <Context.Provider value={contextData}>
      <div className="App">
        <Header roomId={roomCode} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-room" element={<CreateRoomPage />} />
            <Route path="/join-room" element={<JoinRoomPage />} />
            <Route
              path="/room/:roomId"
              element={
                <RoomGuard>
                  <EnterUsername />
                </RoomGuard>
              }
            />
            <Route path="/not-found" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Context.Provider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
