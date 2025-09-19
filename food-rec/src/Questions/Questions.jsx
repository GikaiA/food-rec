import React, { useState } from "react";
import "./Questions.css";

const Questions = () => {
  const questions = [
    {
      id: 1,
      text: "What are you feeling today?(Select all that apply)",
      options: ["Breakfast", "Lunch", "Dinner"],
    },
    {
      id: 2,
      text: "Do you have any dietary restrictions?",
      options: [
        "No restrictions",
        "Vegetarian",
        "Vegan",
        "Gluten-free",
        "Nut allergy",
        "Shellfish allergy",
      ],
    },
    {
      id: 3,
      text: "What is your address?",
      type: "input",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleCheckboxChange = (questionId, option) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(option)) {
        // remove if already selected
        return {
          ...prev,
          [questionId]: currentAnswers.filter((a) => a !== option),
        };
      } else {
        // add new option
        return {
          ...prev,
          [questionId]: [...currentAnswers, option],
        };
      }
    });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="questions">
      <div className="questions-container">
        {/* first question */}
        <h1 className="question">{currentQuestion.text}</h1>
        <div className="checkbox-section">
          {currentQuestion.type === "input" ? (
            <input
              type="text"
              className="home-address-field"
              placeholder="Enter your home address"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleInputChange(currentQuestion.id, e.target.value)
              }
            />
          ) : (
            currentQuestion.options?.map((option, idx) => (
              <label key={idx} className="option">
                <input
                  type="checkbox"
                  checked={
                    answers[currentQuestion.id]?.includes(option) || false
                  }
                  onChange={() =>
                    handleCheckboxChange(currentQuestion.id, option)
                  }
                />
                {option}
              </label>
            ))
          )}
        </div>
        <div className="arrow-buttons">
          <button onClick={prevQuestion} disabled={currentIndex === 0} className="arrow-button">
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
        {/* <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Lunch</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Dinner</label>
        </div> */}

        {/* second question */}
        {/* <div className="questions-container">
        <h1>Are there any dietary restrictions or allergies </h1>
        <div className="checkbox-section">
          <input type="checkbox" id="second" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">No restrictions</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Vegetarian</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Vegan</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Gluten-free</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Dairy-free</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Nut allergy</label>
        </div>
        <div className="checkbox-section">
          <input type="checkbox" id="breakfast" name="Breakfast" className="checkbox" />
          <label className="checkbox-label">Shellfish allergy</label>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Questions;
