import React, { useContext, useEffect } from "react";
import { Context } from "../../context";
import { useCollapse } from "react-collapsed";
import { IoReload } from "react-icons/io5";
import "./UsersSidebar.css";

const UsersSidebar = ({ fetchRoomInformations }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const { roomInfos } = useContext(Context);

  useEffect(() => {
    if (isExpanded) {
      fetchRoomInformations();
    }
  }, [isExpanded, fetchRoomInformations]);

  const handleReload = () => {
    fetchRoomInformations();
  };

  return (
    <div className="online-users-container">
      <div className={`online-users-buttons ${isExpanded ? "expanded" : ""}`}>
        <button {...getToggleProps()}>
          {isExpanded ? "Hide user list" : `Users (${roomInfos?.usernameList?.length})`}
        </button>
        <button onClick={handleReload}>
          <IoReload />
        </button>
      </div>
      <section className="userlist"{...getCollapseProps()}>
        {roomInfos && <h3>Users in room ({roomInfos.usernameList?.length})</h3>}
        {roomInfos?.usernameList?.map((username, index) => {
          return <p key={index}>{username}</p>;
        })}
      </section>
    </div>
  );
};

export default UsersSidebar;
