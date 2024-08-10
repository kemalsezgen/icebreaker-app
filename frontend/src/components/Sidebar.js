import React, { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import { useCollapse } from "react-collapsed";
import { IoReload } from "react-icons/io5";
import { updateUsername } from "../services/api";
import { toast } from "sonner";

const Sidebar = ({ fetchRoomInformations }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const { username, setUsername, roomInfos, token, inputError, setInputError } =
    useContext(Context);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    if (isExpanded) {
      fetchRoomInformations();
    }
  }, [isExpanded, fetchRoomInformations]);

  const handleUpdateUsername = async () => {
    if (newUsername.trim() === "") {
      setInputError(true);
      toast.warning("Username cannot be empty.");
      return;
    }

    if (newUsername === username) {
      setInputError(true);
      toast.warning("Please enter a different username.");
      return;
    }

    setInputError(false);
    try {
      await updateUsername({ token, newUsername });
      setUsername(newUsername);
      toast.success("Username updated successfully!");
      setNewUsername("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleReload = () => {
    fetchRoomInformations();
  };

  return (
    <div className="side-containers">
      <div className="side-sub-container update-username-container">
        <div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            className={inputError ? "input-error" : ""}
          />
          <button onClick={handleUpdateUsername}>Update Username</button>
        </div>
      </div>

      <div className="side-sub-container online-users-container">
        <div>
          <div className="online-users-buttons">
            <button {...getToggleProps()}>
              {isExpanded ? "Hide user list" : "Show user list"}
            </button>
            <button onClick={handleReload}>
              <IoReload />
            </button>
          </div>
          <section {...getCollapseProps()}>
            {roomInfos && (
              <h3>Users in room: {roomInfos.usernameList?.length}</h3>
            )}
            {roomInfos?.usernameList?.map((username, index) => {
              return <p key={index}>{username}</p>;
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
