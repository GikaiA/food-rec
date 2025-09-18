import React from "react";
import "./Questions.css";

function Questions() {
  return (
    <div className="questions">
      <div className="questions-container">
        <h1 className="question">What you feeling today? (Select all that apply) </h1>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Breakfast</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Lunch</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Dinner</label>
        </div>
        <div className="arrow-buttons">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
