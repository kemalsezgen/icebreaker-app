import React from "react";

const QuestionCard = ({ question, selectedAnswer, onSelectAnswer }) => {
  return (
    <div className="question-card-container">
      <h2>{question.questionText}</h2>
      <div className="question-card-answer-buttons">
        <button
          onClick={() => onSelectAnswer(question.id, "A")}
          className={selectedAnswer === "A" ? "selected" : ""}
        >
          {question.optionA}
        </button>
        <button
          onClick={() => onSelectAnswer(question.id, "B")}
          className={selectedAnswer === "B" ? "selected" : ""}
        >
          {question.optionB}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
