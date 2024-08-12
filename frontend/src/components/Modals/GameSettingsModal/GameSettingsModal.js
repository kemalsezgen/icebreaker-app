import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./GameSettingsModal.css";
import Select from "react-select";

const GameSettingsModal = ({ isOpen, onRequestClose, handleStartGame }) => {
  const [questionCount, setQuestionCount] = useState(3);
  const [categoryList] = useState([
    {
      value: "movies",
      label: "Movies",
    },
    {
      value: "general",
      label: "General",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    console.log("selectedCategory:", selectedCategory);
  }, [selectedCategory]);

  const handleSliderChange = (e) => {
    setQuestionCount(e.target.value);
  };

  const handleSubmit = () => {
    handleStartGame(questionCount);
    onRequestClose();
  };

  const modalStyles = {
    content: {
      width: "30%",
      height: "40%",
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#1a1f3c",
      justifyContent: "center",
      borderRadius: "20px",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Game Settings"
      ariaHideApp={false}
      style={modalStyles}
    >
      <div className="game-settings-modal">
        <h2>Game Settings</h2>
        <div className="question-count">
          <p>Number of Questions: {questionCount}</p>
          <input
            type="range"
            min="1"
            max="10"
            value={questionCount}
            onChange={handleSliderChange}
            style={{ width: "100%" }}
          />
        </div>

        <div className="category">
          <p>Select category:</p>
          <div className="select">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={categoryList[0]}
              isClearable={true}
              name="category"
              options={categoryList}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "black",
                }),
              }}
              onChange={(category) => setSelectedCategory(category.value)}
            />
          </div>
        </div>

        <button onClick={handleSubmit}>OK</button>
      </div>
    </Modal>
  );
};

export default GameSettingsModal;
