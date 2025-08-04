import React from "react";
import "./Questions.css";

function Questions() {
  return (
    <div className="questions">
      <div className="questions-container">
        <p>What you feeling today</p>
      <select name="dropdown" className="dropdown">
        {" "}
        <option value="">Select an answer</option>{" "}
        <option value="value1">label 1</option>{" "}
        <option value="value2">label 2</option>{" "}
      </select>
        <p>What you feeling today</p>
      <select name="dropdown" className="dropdown">
        {" "}
        <option value="">Select an answer</option>{" "}
        <option value="value1">label 1</option>{" "}
        <option value="value2">label 2</option>{" "}
      </select>
        <p>What you feeling today</p>
      <select name="dropdown" className="dropdown">
        {" "}
        <option value="">Select an answer</option>{" "}
        <option value="value1">label 1</option>{" "}
        <option value="value2">label 2</option>{" "}
      </select>
        <p>What you feeling today</p>
      <select name="dropdown" className="dropdown">
        {" "}
        <option value="">Select an answer</option>{" "}
        <option value="value1">label 1</option>{" "}
        <option value="value2">label 2</option>{" "}
      </select>
      <div className="question-submit-button">
        <button>Submit Answers</button>
      </div>
      </div>
    </div>
  );
}

export default Questions;
