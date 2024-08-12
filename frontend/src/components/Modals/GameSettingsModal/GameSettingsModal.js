import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./GameSettingsModal.css";
import Select from "react-select";
import { questionTypes } from "../../../constants/QuestionTypes";
import { toast } from "sonner";

const GameSettingsModal = ({ isOpen, onRequestClose, handleStartGame }) => {
  const [questionCount, setQuestionCount] = useState(3);
  const [categoryList] = useState(questionTypes);
  const [selectedCategory, setSelectedCategory] = useState(questionTypes[0].value);

  useEffect(() => {
    console.log("selectedCategory:", selectedCategory);
  }, [selectedCategory]);

  const handleSliderChange = (e) => {
    setQuestionCount(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedCategory === "") {
      toast.warning("Select a category!");
      return;
    }
    handleStartGame(questionCount, selectedCategory);
    onRequestClose();
  };

  const handleCategoryChange = (category) => {
    if (category) {
      setSelectedCategory(category.value);
    } else {
      setSelectedCategory("");
    }
  };

  const modalStyles = {
    content: {
      width: "40%",
      height: "55%",
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
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
              onChange={(category) => handleCategoryChange(category)}
            />
          </div>
        </div>
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

        <button onClick={handleSubmit}>START GAME</button>
      </div>
    </Modal>
  );
};

export default GameSettingsModal;
