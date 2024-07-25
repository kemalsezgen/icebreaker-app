import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomPage = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [emptyClicked, setEmptyClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmptyClicked(false);
  }, [inviteCode]);

  const handleJoinRoom = () => {
    if (inviteCode !== "") {
      navigate(`/room/${inviteCode}`);
    } else {
      setEmptyClicked(true);
    }
  };

  return (
    <div className="join-room-page">
      <h2>Join a Room</h2>
      <div className="join-room-page-sub">
        <input
          className={emptyClicked ? `invite-code-textbox` : ``}
          type="text"
          placeholder="Enter invite code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
