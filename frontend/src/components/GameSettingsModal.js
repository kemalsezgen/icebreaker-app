import React, { useState } from "react";
import Modal from "react-modal";

const GameSettingsModal = ({ isOpen, onRequestClose, handleStartGame }) => {
  const [questionCount, setQuestionCount] = useState(3);

  const handleSliderChange = (e) => {
    setQuestionCount(e.target.value);
  };

  const handleSubmit = () => {
    handleStartGame(questionCount);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Game Settings"
      ariaHideApp={false}
    >
      <h2>Game Settings</h2>
      <label>
        Number of Questions: {questionCount}
        <input
          type="range"
          min="1"
          max="10"
          value={questionCount}
          onChange={handleSliderChange}
          style={{ width: "100%" }}
        />
      </label>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSubmit}>OK</button>
        <button onClick={onRequestClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default GameSettingsModal;
