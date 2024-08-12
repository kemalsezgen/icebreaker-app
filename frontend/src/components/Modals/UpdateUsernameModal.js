import React, { useState, useContext } from "react";
import { Context } from "../../context";
import Modal from "react-modal";
import { updateUsername } from "../../services/api";
import { toast } from "sonner";

const UpdateUsernameModal = ({
  isUpdateUsernameModalOpen,
  setIsUpdateUsernameModalOpen,
  closeModal,
}) => {
  const [newUsername, setNewUsername] = useState("");
  const { inputError, setInputError, username, setUsername, token } =
    useContext(Context);

  const modalStyles = {
    content: {
      width: "300px",
      height: "150px",
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#1a1f3c",
      justifyContent: "center",
      borderRadius: "20px"
    },
  };

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
      setIsUpdateUsernameModalOpen(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Modal
      isOpen={isUpdateUsernameModalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
    >
      <div className="update-username-container">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter new username"
          className={inputError ? "input-error" : ""}
        />
        <button onClick={handleUpdateUsername}>OK</button>
      </div>
    </Modal>
  );
};

export default UpdateUsernameModal;
