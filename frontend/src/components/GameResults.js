import React from "react";

const GameResults = ({ results }) => {
  return (
    <div className="results-container">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h3>
            Question {index + 1} - {result.questionText}
          </h3>
          <p>
            Option A choosers ({result.optionAChoosers.length}) -{" "}
            {result.optionAChoosers.join(", ")}
          </p>
          <p>
            Option B choosers ({result.optionBChoosers.length}) -{" "}
            {result.optionBChoosers.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GameResults;
