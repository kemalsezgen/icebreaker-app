import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Context } from "./context";

import HomePage from "./pages/HomePage";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
//import RoomPage from "./pages/RoomPage";
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
  };

  return (
    <Context.Provider value={contextData}>
      <Router>
        <div className="App">
          <header className="header">
            <Header />
          </header>
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
      </Router>
    </Context.Provider>
  );
}

export default App;
